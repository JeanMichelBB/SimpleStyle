# models/product.py
from pydantic import BaseModel

class Product(BaseModel):
    name: str
    brand: str
    description: str
    price: float
    category: str
    color: str
    size: str = None
    quantity: int = None