# api/endpoints/order.py
from fastapi import APIRouter, Depends, HTTPException
from models.order import Order
from firebase.firebase_utils import db_ref
import uuid

router = APIRouter()

@router.get("/orders/{user_id}", response_model=Order)
async def read_orders(user_id: str):
    order_data = db_ref.child("orders").child(user_id).get()
    if order_data is not None:
        return Order(**order_data, id=user_id)
    raise HTTPException(status_code=404, detail="Order not found")


def generate_unique_order_id():
    return str(uuid.uuid4())

@router.post("/orders/{user_id}", response_model=Order)
async def create_order(user_id: str, order: Order):
    order_id = generate_unique_order_id()

    order.orderId = order_id
    order.userId = user_id

    db_ref.child("orders").child(user_id).set(order.dict())

    return order

@router.put("/orders/{user_id}", response_model=Order)
async def update_order(user_id: str, order: Order):
    db_ref.child("orders").child(user_id).update(order.dict())
    return Order(**order.dict(), id=user_id)

@router.delete("/orders/{user_id}", response_model=dict)
async def delete_order(user_id: str):
    db_ref.child("orders").child(user_id).delete()
    return {"message": "Order deleted successfully"}
