from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io

from schemas.exp_schema import PressureDropBatchRequest
from engine.physics import calculate_analytical_pressure_drop
from engine.ml_models import predict_ml_pressure_drop

router = APIRouter(tags=["Pressure Drop"])

def process_single_row(row_data: dict) -> dict:
    t_c = float(row_data.get('Temperature_C', 0))
    d_h = float(row_data.get('Hydraulic_Diameter_m', 0))
    v = float(row_data.get('Velocity_m_s', 0))
    re = float(row_data.get('Reynolds_Number', 0))

    # 1. Physics Engine
    phys_out = calculate_analytical_pressure_drop(t_c, d_h, v, re)

    # 2. ML Engine
    ai_out = predict_ml_pressure_drop(t_c, d_h, v, re)
    
    # 3. Calculate Error
    error = abs((ai_out - phys_out) / phys_out) * 100 if phys_out != 0 else 0

    return {
        "input": {"Temperature_C": t_c, "Hydraulic_Diameter_m": d_h, "Velocity_m_s": v, "Reynolds_Number": re},
        "ml_out": {"pressure_drop": ai_out},
        "analytical_out": {"pressure_drop": phys_out},
        "error": round(error, 2)
    }

@router.post("/batch")
async def run_batch_simulation(request: PressureDropBatchRequest):
    results = [process_single_row(item.model_dump()) for item in request.data]
    return {"results": results}

@router.post("/upload")
async def run_file_simulation(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents)) if file.filename.endswith('.csv') else pd.read_excel(io.BytesIO(contents))
    
    # Ensure NaN values don't crash the float conversions
    df = df.fillna(0)
    results = [process_single_row(row.to_dict()) for _, row in df.iterrows()]
    return {"results": results}