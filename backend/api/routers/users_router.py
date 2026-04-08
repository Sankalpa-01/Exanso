# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from models.user import User
# from schemas.user_schema import UserResponse
# from api.dependencies import get_current_user

# router = APIRouter(tags=["Users"])

# @router.get("/me", response_model=UserResponse)
# def read_users_me(current_user: User = Depends(get_current_user)):
#     """
#     Fetches the profile of the currently logged-in user.
#     The 'get_current_user' dependency automatically checks their JWT token!
#     """
#     return current_user

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import shutil
import os
import uuid

from models.user import User
from schemas.user_schema import UserResponse
from api.dependencies import get_current_user, get_db

router = APIRouter(tags=["Users"])

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    """
    Fetches the profile of the currently logged-in user.
    The 'get_current_user' dependency automatically checks their JWT token!
    """
    return current_user

@router.post("/upload-profile-pic")
async def upload_profile_pic(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user), # Automatically knows who is uploading!
    db: Session = Depends(get_db)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # 1. Create a unique filename
    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    
    # 2. Ensure directory exists and define path
    os.makedirs("static/profiles", exist_ok=True)
    file_location = f"static/profiles/{unique_filename}"
    
    # 3. Save physical file
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
        
    file_url = f"/{file_location}"

    # 4. Save to Database
    current_user.profile_pic = file_url
    db.commit()
    db.refresh(current_user)

    return {"url": file_url}