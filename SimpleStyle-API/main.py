# main.py
from fastapi import FastAPI, Depends, HTTPException
from api import product as product_router
from api import category as category_router
from api import order as order_router
from api.endpoints import authentication
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router.router, prefix="/api/v1")

app.include_router(category_router.router, prefix="/api/v1")

app.include_router(order_router.router, prefix="/api/v1")

app.include_router(authentication.router, prefix="/api/auth")
