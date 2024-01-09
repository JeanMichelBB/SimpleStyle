# api/endpoints/authentication.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer
from jose import JWTError, jwt, ExpiredSignatureError
from firebase.firebase_utils import auth
from firebase_admin import auth as firebase_auth
from models.user import User
from firebase.firebase_utils import db_ref
from passlib.context import CryptContext
import logging

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = "secret"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login", response_model=dict)
async def login(user_data: User):
    """
    Authenticate a user and retrieve an access token.
    """
    try:
        user = firebase_auth.get_user_by_email(user_data.email)
        user_id = user.uid

        user_data_dict = db_ref.child("users").child(user_id).get()

        if not pwd_context.verify(user_data.hashed_password, user_data_dict["hashed_password"]):
            raise HTTPException(status_code=400, detail="Invalid credentials")

        token_data = {"sub": user_id}
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

        return {"access_token": token, "token_type": "bearer", "user_id": user_id}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"User login failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging in user: {str(e)}")

@router.post("/signup", response_model=dict)
async def signup(user_data: User):
    """
    Create a new user account.
    """
    try:
        hashed_password = pwd_context.hash(user_data.hashed_password)

        user_auth = auth.create_user(email=user_data.email, password=user_data.hashed_password)
        user_id = user_auth.uid

        user_data_dict = {
            "email": user_data.email,
            "name": user_data.name,
            "last_name": user_data.last_name,
            "userId": user_id,
            "hashed_password": hashed_password,
        }
        db_ref.child("users").child(user_id).set(user_data_dict)

        token_data = {"sub": user_id}
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

        return {"access_token": token, "token_type": "bearer", "user_id": user_id}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"User creation failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")


@router.get("/users/me", response_model=User)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Get the current user.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        user_data = db_ref.child("users").child(user_id).get()
        if user_data is not None:
            return User(**user_data, id=user_id)
        raise HTTPException(status_code=404, detail="user not found")
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token has expired")
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/users/me/password", response_model=dict)
async def change_password(user_data: User, token: str = Depends(oauth2_scheme)):
    """
    Change the user's password.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        user_data_dict = db_ref.child("users").child(user_id).get()
        if user_data_dict is not None:
            # Verify the password
            if not pwd_context.verify(user_data.hashed_password, user_data_dict["hashed_password"]):
                raise HTTPException(status_code=400, detail="Invalid credentials")

            new_hashed_password = pwd_context.hash(user_data.new_password)

            auth.update_user(user_id, password=user_data.new_password)

            db_ref.child("users").child(user_id).update({"hashed_password": new_hashed_password})

            logging.info(f"Password updated successfully for user {user_id}")

            return {"message": "Password updated successfully"}
        raise HTTPException(status_code=404, detail="user not found")
    except ExpiredSignatureError:
        logging.error("Token has expired")
        raise HTTPException(status_code=401, detail="token has expired")
    except JWTError:
        logging.error("Could not validate credentials")
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    except Exception as e:
        # Log the exception
        logging.exception("An error occurred while changing the password")

        raise HTTPException(status_code=500, detail=str(e))
    
@router.put("/users/me/email", response_model=dict)
async def change_email(user_data: User, token: str = Depends(oauth2_scheme)):
    """
    Change the user's email.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        user_data_dict = db_ref.child("users").child(user_id).get()
        if user_data_dict is not None:

            if not pwd_context.verify(user_data.hashed_password, user_data_dict["hashed_password"]):
                raise HTTPException(status_code=400, detail="Invalid credentials")

            auth.update_user(user_id, email=user_data.new_email)

            db_ref.child("users").child(user_id).update({"email": user_data.new_email})

            logging.info(f"Email updated successfully for user {user_id}")

            return {"message": "Email updated successfully"}
        raise HTTPException(status_code=404, detail="user not found")
    except ExpiredSignatureError:
        logging.error("Token has expired")
        raise HTTPException(status_code=401, detail="token has expired")
    except JWTError:
        logging.error("Could not validate credentials")
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    except Exception as e:
        logging.exception("An error occurred while changing the email")

        raise HTTPException(status_code=500, detail=str(e))
    
    