from pydantic import BaseModel
from typing import List, Optional, Dict

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

# ---------------------------------------------------------
# Standardized Output
# ---------------------------------------------------------
class PredictionResult(BaseModel):
    """The finalized format sent back to populate your React data tables."""
    input: Dict[str, float]
    ml_out: Dict[str, float]
    analytical_out: Dict[str, float]
    error: float

# ---------------------------------------------------------
# Future Experiments (Example)
# ---------------------------------------------------------
# class BernoulliInput(BaseModel):
#     pressure: float
#     density: float
#     height: float
#
# class BernoulliBatchRequest(BaseModel):
#     data: List[BernoulliInput]