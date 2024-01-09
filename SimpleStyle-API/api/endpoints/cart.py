# api/endpoints/cart.py
from fastapi import APIRouter, Depends, HTTPException
from models.product import Product
from firebase.firebase_utils import db_ref


router = APIRouter()

@router.put("/cart/{user_id}")
async def update_cart(user_id: str, product_id: str, quantity: int):
    try:
        user_data_dict = db_ref.child("users").child(user_id).get()

        if user_data_dict is not None:
            if "cart" not in user_data_dict:
                user_data_dict["cart"] = []

            product_data = db_ref.child("products").child(product_id).get()

            if product_data is not None and "quantity" in product_data:
                if quantity > product_data["quantity"]:
                    raise HTTPException(status_code=400, detail="Selected quantity exceeds available quantity")

            for item in user_data_dict["cart"]:
                if item["product_id"] == product_id:
                    # Product already in the cart, update the quantity
                    item["quantity"] += quantity
                    break
            else:
                user_data_dict["cart"].append({"product_id": product_id, "quantity": quantity})

            db_ref.child("users").child(user_id).update(user_data_dict)

            return {"message": "Product added to cart successfully"}

        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.delete("/cart/{user_id}/remove")
async def remove_from_cart(user_id: str, product_id: str):
    try:
        user_data_dict = db_ref.child("users").child(user_id).get()

        if user_data_dict is not None:
            if "cart" not in user_data_dict:
                user_data_dict["cart"] = []

            for item in user_data_dict["cart"]:
                if item.get("product_id") == product_id:
                    user_data_dict["cart"].remove(item)

            db_ref.child("users").child(user_id).update(user_data_dict)

            return {"message": "Product removed from cart successfully"}

        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/cart/change_quantity/{user_id}")
async def change_cart_quantity(user_id: str, product_id: str, new_quantity: int):
    try:
        user_data_dict = db_ref.child("users").child(user_id).get()

        if user_data_dict is not None:
            if "cart" not in user_data_dict:
                user_data_dict["cart"] = []

            for item in user_data_dict["cart"]:
                if item["product_id"] == product_id:
                    # Product already in the cart, update the quantity
                    item["quantity"] = new_quantity
                    break
            else:
                user_data_dict["cart"].append({"product_id": product_id, "quantity": new_quantity})

            db_ref.child("users").child(user_id).update(user_data_dict)

            return {"message": "Product quantity changed in cart successfully"}

        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.delete("/cart/{user_id}/clear")
async def clear_cart(user_id: str):
    try:
        user_data_dict = db_ref.child("users").child(user_id).get()

        if user_data_dict is not None:
            if "cart" not in user_data_dict:
                user_data_dict["cart"] = []

            user_data_dict["cart"] = []

            db_ref.child("users").child(user_id).update(user_data_dict)

            return {"message": "Cart cleared successfully"}

        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))