import os
from dotenv import load_dotenv

# This physically loads the variables from the .env file into the system
load_dotenv()

# ---------------------------------------------------------
# Security Settings (JWT Authentication)
# ---------------------------------------------------------
# We use os.getenv() to grab the secure values. 
# The second argument (e.g., "HS256") is a fallback just in case the .env file is missing.
SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key-for-local-dev-only")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

# ---------------------------------------------------------
# Database Settings
# ---------------------------------------------------------
# We point to a local SQLite file named exanso.db inside the backend folder.
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./exanso.db")