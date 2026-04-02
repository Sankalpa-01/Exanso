from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from models.user import User
from schemas.user_schema import UserResponse
from api.dependencies import get_current_user

router = APIRouter(tags=["Users"])

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    """
    Fetches the profile of the currently logged-in user.
    The 'get_current_user' dependency automatically checks their JWT token!
    """
    return current_user