# api/endpoints/user.py
from fastapi import APIRouter, HTTPException, Query
from models.user import User
from firebase.firebase_utils import db_ref
from fastapi.security import OAuth2PasswordBearer
from firebase.firebase_utils import auth
from firebase_admin import auth as firebase_auth


router = APIRouter()

# save information in the firebase database
@router.post("/users", response_model=User)
async def create_user(user: User):
    user_data = user.dict()
    
    if user_data["userId"] is None:
        raise HTTPException(status_code=400, detail="User ID cannot be None")
    db_ref.child("users").child(user_data["userId"]).set(user_data)
    
    return user

@router.get("/users/{userId}", response_model=User)
async def read_user(userId: str):
    user_data = db_ref.child("users").child(userId).get()
    
    # if user is missing felids, show them empty
    
    if user_data:
        user_dict = user_data
        user_dict['id'] = userId
        user = User(**user_dict)
        return user
    
    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{userId}", response_model=User)
async def update_user(userId: str, updated_user: User):
    db_ref.child("users").child(userId).update(updated_user.dict())
    return updated_user


@router.delete("/users/{userId}", response_model=dict)
async def delete_user(userId: str):
    user_data = db_ref.child("users").child(userId).get()
    if user_data is not None:
        db_ref.child("users").child(userId).delete()
        return {"message": "User deleted successfully", "user": user_data}
    raise HTTPException(status_code=404, detail="User not found")


