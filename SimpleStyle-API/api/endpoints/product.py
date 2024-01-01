# api/endpoints/product.py
from fastapi import APIRouter, HTTPException, Query
from models.product import Product
from firebase.firebase_utils import db_ref

router = APIRouter()

@router.get("/products", response_model=list[Product])
async def read_products(category: str = Query(None, description="Filter products by category")):
    products = db_ref.child("products").get()
    if products is not None:
        if category:
            products = {product_id: product_data for product_id, product_data in products.items() if product_data.get("category") == category}
        else:
            return [Product(**product_data) for product_id, product_data in products.items()]

    raise HTTPException(status_code=404, detail="No products found")

@router.post("/products", response_model=Product)
async def create_product(product: Product):
    product_data = product.dict()
    
    if product_data["id"] is None:
        raise HTTPException(status_code=400, detail="Product ID cannot be None")

    db_ref.child("products").child(product_data["id"]).set(product_data)
    
    return product

@router.get("/products/{product_id}", response_model=Product)
async def read_product(product_id: str):
    product_data = db_ref.child("products").child(product_id).get()
    
    if product_data:
        product_dict = product_data
        product_dict['id'] = product_id  # Add 'id' to the dictionary
        product = Product(**product_dict)
        return product

    raise HTTPException(status_code=404, detail="Product not found")



@router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, updated_product: Product):
    db_ref.child("products").child(product_id).update(updated_product.dict())
    return updated_product

@router.delete("/products/{product_id}", response_model=dict)
async def delete_product(product_id: str):
    product_data = db_ref.child("products").child(product_id).get()
    if product_data is not None:
        db_ref.child("products").child(product_id).delete()
        return {"message": "Product deleted successfully", "product": product_data}
    raise HTTPException(status_code=404, detail="Product not found")
