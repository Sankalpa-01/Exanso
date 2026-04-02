from datetime import datetime, timedelta
from typing import Optional
from jose import jwt

# Import our secure settings from the environment configuration
from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Creates a secure JSON Web Token (JWT) that the React frontend will store.
    This token acts as a temporary VIP pass so the user doesn't have to log in 
    every time they click a button.
    """
    to_encode = data.copy()
    
    # Determine when the token should expire
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
    # Add the expiration timestamp ('exp') to the token data
    to_encode.update({"exp": expire})
    
    # Generate the final encrypted token string
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt