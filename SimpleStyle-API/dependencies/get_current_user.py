from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from firebase.firebase_utils import auth

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        decoded_token = auth.verify_id_token(token)
        user = auth.get_user(decoded_token['uid'])
        return user
    except Exception as e:
        raise credentials_exception from e
