# models/category.py
from pydantic import BaseModel

class Category(BaseModel):
    categoryId: str
    name: str