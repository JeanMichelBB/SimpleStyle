# main.py
from fastapi import FastAPI, Depends, HTTPException
from api import product as product_router
from api import category as category_router
from api import order as order_router
from api.endpoints import authentication
app = FastAPI()

app.include_router(product_router.router, prefix="/api/v1")

app.include_router(category_router.router, prefix="/api/v1")

app.include_router(order_router.router, prefix="/api/v1")

app.include_router(authentication.router, prefix="/api/auth")
