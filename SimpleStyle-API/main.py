# main.py
from fastapi import FastAPI
from api import product as product_router
from api import order as order_router
from api import user as user_router
from api import cart as cart_router
from api.endpoints import authentication
from fastapi.middleware.cors import CORSMiddleware
from firebase.firebase_utils import initialize_firebase_admin

initialize_firebase_admin()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router.router, prefix="/api/v1")
app.include_router(order_router.router, prefix="/api/v1")
app.include_router(authentication.router, prefix="/api/auth")
app.include_router(user_router.router, prefix="/api/v1")
app.include_router(cart_router.router, prefix="/api/v1")