# models/user.py
from pydantic import BaseModel
from typing import Optional, List

class User(BaseModel):
    userId: str
    email: Optional[str]
    hashed_password: Optional[str]
    name: Optional[str]
    last_name: Optional[str]
    address: Optional[str] = ''
    phone: Optional[str] = ''
    orders: List[dict] = [] 
    cart: List[dict] = [] 
    new_password: Optional[str] = ''
    new_email: Optional[str] = ''
