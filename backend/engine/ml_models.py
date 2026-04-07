# import joblib
# import os
# import warnings

# # Suppress sklearn warnings about feature names if they pop up
# warnings.filterwarnings("ignore", category=UserWarning)

# # 1. Build the absolute paths to both files
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(BASE_DIR, "trained_models", "thermal_model.pkl")
# SCALER_PATH = os.path.join(BASE_DIR, "trained_models", "thermal_scaler.pkl")

# # 2. Load both the Model and the Scaler ONCE when FastAPI boots up
# try:
#     heat_exchanger_model = joblib.load(MODEL_PATH)
#     heat_exchanger_scaler = joblib.load(SCALER_PATH)
#     print("✅ ML Model and Scaler loaded successfully!")
# except Exception as e:
#     print(f"❌ Failed to load ML files: {e}")
#     heat_exchanger_model = None
#     heat_exchanger_scaler = None

# def predict_ml_th_out(th_in: float, tc_in: float, m_h: float, m_c: float) -> float:
#     """
#     Scales the 4 inputs using the trained scaler, feeds them into the .pkl model, 
#     and returns the prediction.
#     """
#     # Safety check
#     if heat_exchanger_model is None or heat_exchanger_scaler is None:
#         raise ValueError("Machine Learning model or scaler is not loaded.")

#     # 3. Format the raw inputs into a 2D array
#     # WARNING: The order here MUST exactly match the column order you used during training!
#     raw_features = [[th_in, tc_in, m_h, m_c]]
    
#     # 4. Transform the raw inputs using your scaler
#     scaled_features = heat_exchanger_scaler.transform(raw_features)
    
#     # 5. Make the prediction using the scaled features
#     prediction = heat_exchanger_model.predict(scaled_features)[0]
    
#     return round(float(prediction), 2)

import warnings
from engine.model_loader import get_model

warnings.filterwarnings("ignore", category=UserWarning)

def predict_ml_th_out(th_in: float, tc_in: float, m_h: float, m_c: float) -> float:
    """
    Scales the 4 inputs using the trained scaler, feeds them into the .pkl model, 
    and returns the prediction. Uses lazy-loading to save server RAM.
    """
    
    # 1. Ask the model_loader for your specific files
    # It will look inside: engine/trained_models/heat_exchanger/
    model = get_model("heat_exchanger", "thermal_model.pkl")
    scaler = get_model("heat_exchanger", "thermal_scaler.pkl")
    
    # Safety check
    if model is None or scaler is None:
        raise ValueError("Machine Learning model or scaler is missing. Check your trained_models folder.")

    # 2. Format the raw inputs exactly how the model expects them
    raw_features = [[th_in, tc_in, m_h, m_c]]
    
    # 3. Transform the raw inputs using your scaler
    scaled_features = scaler.transform(raw_features)
    
    # 4. Make the prediction using the scaled features
    prediction = model.predict(scaled_features)[0]
    
    return round(float(prediction), 2)