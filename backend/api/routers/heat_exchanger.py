# from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
# from sqlalchemy.orm import Session
# import pandas as pd
# import io

# from schemas.exp_schema import BatchRequest
# from engine.physics import calculate_analytical_th_out
# from engine.ml_models import predict_ml_th_out
# from api.dependencies import get_db

# router = APIRouter(tags=["Heat Exchanger"])

# def process_single_row(row_data: dict) -> dict:
#     """Helper function to run the math and ML models for a single row of data."""
#     th_in = float(row_data.get('th_in', 0))
#     tc_in = float(row_data.get('tc_in', 0))
#     m_h = float(row_data.get('m_h', 0))
#     m_c = float(row_data.get('m_c', 0))

#     physics_out = calculate_analytical_th_out(th_in, tc_in, m_h, m_c)
#     ai_out = predict_ml_th_out(th_in, tc_in, m_h, m_c)
    
#     error = abs((ai_out - physics_out) / physics_out) * 100 if physics_out != 0 else 0

#     return {
#         "input": {"th_in": th_in, "tc_in": tc_in, "m_h": m_h, "m_c": m_c},
#         "ml_out": {"th_out": ai_out},
#         "analytical_out": {"th_out": physics_out},
#         "error": round(error, 2)
#     }

# @router.post("/batch")
# async def run_batch_simulation(request: BatchRequest):
#     """Processes an array of manual data entries."""
#     results = []
#     for item in request.data:
#         row_dict = item.model_dump()
#         results.append(process_single_row(row_dict))
    
#     # Note: You can add database saving logic here later using db: Session = Depends(get_db)
#     return {"results": results}

# @router.post("/upload")
# async def run_file_simulation(file: UploadFile = File(...)):
#     """Processes bulk data from uploaded .csv or .xlsx files."""
#     if not file.filename.endswith(('.csv', '.xlsx')):
#         raise HTTPException(status_code=400, detail="Invalid file type. Use CSV or XLSX.")
    
#     try:
#         contents = await file.read()
#         if file.filename.endswith('.csv'):
#             df = pd.read_csv(io.BytesIO(contents))
#         else:
#             df = pd.read_excel(io.BytesIO(contents))
        
#         required_cols = ['th_in', 'tc_in', 'm_h', 'm_c']
#         if not all(col in df.columns for col in required_cols):
#             raise HTTPException(status_code=400, detail=f"File must contain columns: {required_cols}")

#         df = df.head(10000) # Safety limit
#         results = [process_single_row(row.to_dict()) for _, row in df.iterrows()]
            
#         return {"results": results}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
import pandas as pd
import io

from schemas.exp_schema import BatchRequest
from engine.physics import calculate_analytical_th_out
from engine.ml_models import predict_ml_th_out
from api.dependencies import get_db

router = APIRouter(tags=["Heat Exchanger"])

def process_single_row(row_data: dict) -> dict:
    """Helper function to run the math and ML models for a single row of data."""
    # Added fallback safety: If frontend sends missing data, default it to 0
    th_in = float(row_data.get('th_in') or 0)
    tc_in = float(row_data.get('tc_in') or 0)
    m_h = float(row_data.get('m_h') or 0)
    m_c = float(row_data.get('m_c') or 0)

    physics_out = calculate_analytical_th_out(th_in, tc_in, m_h, m_c)
    ai_out = predict_ml_th_out(th_in, tc_in, m_h, m_c)
    
    error = abs((ai_out - physics_out) / physics_out) * 100 if physics_out != 0 else 0

    return {
        "input": {"th_in": th_in, "tc_in": tc_in, "m_h": m_h, "m_c": m_c},
        "ml_out": {"th_out": ai_out},
        "analytical_out": {"th_out": physics_out},
        "error": round(error, 2)
    }

@router.post("/batch")
async def run_batch_simulation(request: BatchRequest):
    """Processes an array of manual data entries."""
    results = []
    for item in request.data:
        row_dict = item.model_dump()
        results.append(process_single_row(row_dict))
    
    return {"results": results}

@router.post("/upload")
async def run_file_simulation(file: UploadFile = File(...)):
    """Processes bulk data from uploaded .csv or .xlsx files."""
    if not file.filename.endswith(('.csv', '.xlsx')):
        raise HTTPException(status_code=400, detail="Invalid file type. Use CSV or XLSX.")
    
    try:
        contents = await file.read()
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(contents))
        else:
            df = pd.read_excel(io.BytesIO(contents))
        
        required_cols = ['th_in', 'tc_in', 'm_h', 'm_c']
        if not all(col in df.columns for col in required_cols):
            raise HTTPException(status_code=400, detail=f"File must contain columns: {required_cols}")

        # THE FIX: Replace any blank cells with 0 so the physics engine doesn't crash on float(NaN)
        df = df.fillna(0)
        df = df.head(10000) # Safety limit
        
        results = [process_single_row(row.to_dict()) for _, row in df.iterrows()]
            
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")