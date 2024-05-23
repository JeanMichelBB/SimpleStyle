from fastapi import APIRouter, HTTPException
from models.user import User
from firebase.firebase_utils import db_ref
from firebase_admin import auth as firebase_auth
from firebase_admin._auth_utils import UserNotFoundError

router = APIRouter()

# Helper functions
async def count_users():
    users = db_ref.child("users").get()
    return len(users) if users else 0

async def read_first_user():
    users = db_ref.child("users").order_by_key().limit_to_first(1).get()
    if users:
        first_user_id = list(users.keys())[0]
        first_user_data = users[first_user_id]
        first_user_data["userId"] = first_user_id
        return User(**first_user_data)
    return None

async def delete_user(userId: str):
    try:
        firebase_auth.delete_user(userId)
    except UserNotFoundError:
        pass  # If the user is not found in Firebase Auth, we can still proceed to delete from the database

    user_data = db_ref.child("users").child(userId).get()
    if user_data:
        db_ref.child("users").child(userId).delete()
        return {"message": "User deleted successfully", "user": user_data}
    raise HTTPException(status_code=404, detail="User not found")

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

@router.get("/users", response_model=list[User])
async def read_users():
    users = db_ref.child("users").get()
    if users is not None:
        return [User(**user_data) for user_id, user_data in users.items()]
    
    raise HTTPException(status_code=404, detail="No users found")

@router.get("/count")
async def get_user_count():
    try:
        users = db_ref.child("users").get()
        return len(users) if users else 0
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve user count: {e}")

@router.get("/oldest")
async def read_first_user():
    users = db_ref.child("users").order_by_key().limit_to_first(1).get()
    if users:
        first_user_id = list(users.keys())[0]
        first_user_data = users[first_user_id]
        first_user_data["userId"] = first_user_id
        return User(**first_user_data)
    return None

@router.delete("/users/{userId}", response_model=dict)
async def delete_user(userId: str):
    try:
        firebase_auth.delete_user(userId)
    except UserNotFoundError:
        pass  # If the user is not found in Firebase Auth, we can still proceed to delete from the database

    user_data = db_ref.child("users").child(userId).get()
    if user_data is not None:
        db_ref.child("users").child(userId).delete()
        return {"message": "User deleted successfully", "user": user_data}
    raise HTTPException(status_code=404, detail="User not found")

#delete first user
@router.delete("/first")
async def delete_first_user():
    first_user = await read_first_user()
    if first_user:
        return await delete_user(first_user.userId)
    raise HTTPException(status_code=404, detail="No users found")