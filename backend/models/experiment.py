from sqlalchemy import Column, Integer, String, Float, JSON, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class ExperimentResult(Base):
    __tablename__ = "experiment_results"

    id = Column(Integer, primary_key=True, index=True)
    
    # This links directly to the 'id' column in the users table
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # To identify which experiment this is (e.g., "heat_exchanger", "bernoulli")
    experiment_type = Column(String, index=True, nullable=False) 
    
    # We use JSON columns to easily store the flexible input/output dictionaries
    input_data = Column(JSON)
    ml_prediction = Column(JSON)
    analytical_prediction = Column(JSON)
    
    # The overall error margin for the batch
    error_margin = Column(Float)

    # Link back to the User model so they can talk to each other
    owner = relationship("User", back_populates="experiments")