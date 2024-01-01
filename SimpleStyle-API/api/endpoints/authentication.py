# api/endpoints/authentication.py
from fastapi import APIRouter, Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordBearer
from firebase.firebase_utils import auth
import firebase_admin
from firebase_admin import auth
from pydantic import BaseModel
from dependencies.get_current_user import get_current_user

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/user", response_model=dict)
async def get_user_info(current_user: dict = Depends(get_current_user)):
    """
    Retrieve information about the currently authenticated user.
    """
    return current_user

class UserCreate(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup(user_data: UserCreate):
    """
    Create a new user account.
    """
    try:
        user = auth.create_user(email=user_data.email, password=user_data.password)
        user_id = user.uid  
        return {"message": "User created successfully", "user_id": user_id}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"User creation failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")
    
class UserLogin(BaseModel):
    email: str
    password: str
    
@router.post("/login")
async def login(user_data: UserLogin):
    """
    Authenticate a user and retrieve an access token.
    """
    try:
        user = auth.get_user_by_email(user_data.email)
        user_id = user.uid
        token = auth.create_custom_token(user_id)
        return {"message": "User logged in successfully", "token": token}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"User login failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging in user: {str(e)}")
