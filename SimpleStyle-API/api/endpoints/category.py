# api/endpoints/category.py
from fastapi import APIRouter, HTTPException
from models.category import Category
from firebase.firebase_utils import db_ref

router = APIRouter()

@router.post("/categories", response_model=Category)
async def create_category(category: Category):
    category_data = category.dict()
    new_category_ref = db_ref.child("categories").push(category_data)
    category.id = new_category_ref.key
    return category

@router.get("/categories/{category_id}", response_model=Category)
async def read_category(category_id: str):
    category_data = db_ref.child("categories").child(category_id).get()
    if category_data is not None:
        return Category(**category_data, id=category_id)
    raise HTTPException(status_code=404, detail="category not found")

@router.put("/categories/{category_id}", response_model=Category)
async def update_category(category_id: str, updated_category: Category):
    db_ref.child("categories").child(category_id).update(updated_category.dict())
    return updated_category

@router.delete("/categories/{category_id}", response_model=dict)
async def delete_category(category_id: str):
    category_data = db_ref.child("categories").child(category_id).get()
    if category_data is not None:
        db_ref.child("categories").child(category_id).delete()
        return {"message": "category deleted successfully", "category": category_data}
    raise HTTPException(status_code=404, detail="category not found")


