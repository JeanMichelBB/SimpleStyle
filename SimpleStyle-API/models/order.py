# models/order.py
from pydantic import BaseModel
from typing import List

class Order(BaseModel):
    orderId: str
    userId: str
    products: List[dict]
    total: float
    status: str
    