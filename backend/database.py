from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

# Import the database URL we just defined in config.py
from config import SQLALCHEMY_DATABASE_URL

# 1. Create the Database Engine
# NOTE: connect_args={"check_same_thread": False} is a special requirement 
# ONLY for SQLite in FastAPI. It prevents errors when multiple users hit the API at once.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 2. Create the SessionLocal class
# A "Session" is basically a single conversation with the database.
# When a user registers, we open a session, save them, and close it.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3. Create the Base class
# All of our database models (User, ExperimentResult) will inherit from this class
# so SQLAlchemy knows they are meant to be turned into actual database tables.
Base = declarative_base()