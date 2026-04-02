from passlib.context import CryptContext

# Set up the cryptography context using bcrypt (the industry standard)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Takes the plain-text password the user typed into the login form
    and securely compares it against the scrambled hash in the database.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Takes a plain-text password from the registration form
    and scrambles it into a secure hash before saving it to the database.
    """
    return pwd_context.hash(password)