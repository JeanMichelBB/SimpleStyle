# models/cart.py
from pydantic import BaseModel
from typing import List

class Cart(BaseModel):
    cartId: str
    userId: str
    products: List[dict]
    total: float
    status: str