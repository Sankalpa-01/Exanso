from typing import List, Optional, Dict
from pydantic import BaseModel

# ---------------------------------------------------------
# Experiment 1: Heat Exchanger
# ---------------------------------------------------------
class HeatExchangerInput(BaseModel):
    """The exact columns expected from the React frontend or Excel upload."""
    id: Optional[str] = None
    th_in: float
    tc_in: float
    m_h: float
    m_c: float

class BatchRequest(BaseModel):
    """The structure for an array of manual data entries sent from the UI."""
    data: List[HeatExchangerInput]

class MLOutput(BaseModel):
    """Explicitly defines the ML output structure."""
    th_out: float
    tc_out: float 

class PredictionResult(BaseModel):
    """The finalized format sent back to populate your React data tables."""
    input: Dict[str, float]
    ml_out: MLOutput
    analytical_out: Dict[str, float]
    error: float

# ---------------------------------------------------------
# Experiment 2: Pressure Drop
# ---------------------------------------------------------

class PressureDropInput(BaseModel):
    """The exact columns expected from the React frontend or Excel upload."""
    id: Optional[str] = None
    Temperature_C: float
    Hydraulic_Diameter_m: float
    Velocity_m_s: float
    Reynolds_Number: float

class PressureDropBatchRequest(BaseModel):
    data: List[PressureDropInput]

class PressureDropMLOutput(BaseModel):
    """Explicitly defines the ML output structure for Pressure Drop."""
    pressure_drop: float