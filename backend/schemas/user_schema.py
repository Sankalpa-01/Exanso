from pydantic import BaseModel, EmailStr

# ---------------------------------------------------------
# User Registration
# ---------------------------------------------------------
class UserCreate(BaseModel):
    """Data required from the frontend when a user signs up."""
    email: EmailStr  # EmailStr automatically validates that it has an '@' and a domain
    password: str

# ---------------------------------------------------------
# User Profile Response
# ---------------------------------------------------------
class UserResponse(BaseModel):
    """The safe data sent back to the frontend (notice we NEVER send the password back)."""
    id: int
    email: EmailStr
    is_active: bool

    class Config:
        # This tells Pydantic to read the data even if it's an SQLAlchemy database object
        from_attributes = True

# ---------------------------------------------------------
# Authentication Token
# ---------------------------------------------------------
class Token(BaseModel):
    """The structure of the JWT response sent upon successful login."""
    access_token: str
    token_type: str