# api/endpoints/order.py
from fastapi import APIRouter, Depends, HTTPException
from models.order import Order
from firebase.firebase_utils import db_ref

router = APIRouter()

@router.post("/orders", response_model=Order)
async def create_order(order: Order):
    order_data = order.dict()
    new_order_ref = db_ref.child("orders").push(order_data)
    order.id = new_order_ref.key
    return order

@router.get("/orders/{order_id}", response_model=Order)
async def read_order(order_id: str):
    order_data = db_ref.child("orders").child(order_id).get()
    if order_data is not None:
        return Order(**order_data, id=order_id)
    raise HTTPException(status_code=404, detail="Order not found")

@router.put("/orders/{order_id}", response_model=Order)
async def update_order(order_id: str, updated_order: Order):
    db_ref.child("orders").child(order_id).update(updated_order.dict())
    return updated_order

@router.delete("/orders/{order_id}", response_model=dict)
async def delete_order(order_id: str):
    order_data = db_ref.child("orders").child(order_id).get()
    if order_data is not None:
        db_ref.child("orders").child(order_id).delete()
        return {"message": "Order deleted successfully", "order": order_data}
    raise HTTPException(status_code=404, detail="Order not found")


