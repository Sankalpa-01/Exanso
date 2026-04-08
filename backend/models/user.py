from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    profile_pic = Column(String, nullable=True) # <-- ADD THIS LINE

    # Establish a two-way relationship with the experiments table.
    # cascade="all, delete-orphan" means if a user deletes their account, 
    # all their saved experiments are automatically deleted too!
    experiments = relationship("ExperimentResult", back_populates="owner", cascade="all, delete-orphan")