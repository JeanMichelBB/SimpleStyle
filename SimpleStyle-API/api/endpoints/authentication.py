# api/endpoints/authentication.py
from fastapi import APIRouter, Depends, HTTPException, Form
from firebase.firebase_utils import auth
import firebase_admin
from firebase_admin import auth

router = APIRouter()

@router.post("/signup")
async def signup(email: str = Form(...), password: str = Form(...)):
    """
    Create a new user account.
    """
    try:
        user = auth.create_user(email=email, password=password)
        user_id = user.uid  # Extract the user ID from the authentication response
        return {"message": "User created successfully", "user_id": user_id}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"User creation failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")

@router.post("/login")
async def login(email: str = Form(...), password: str = Form(...)):
    """
    Log in to an existing user account.
    """
    try:
        user = auth.get_user_by_email(email)
        user_id = user.uid  # Extract the user ID from the authentication response
        return {"message": "User logged in successfully", "user_id": user_id}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Login failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging in: {str(e)}")
