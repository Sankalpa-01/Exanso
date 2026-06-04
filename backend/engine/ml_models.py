# # import warnings
# # from engine.model_loader import get_model

# # warnings.filterwarnings("ignore", category=UserWarning)

# # def predict_ml_th_out(th_in: float, tc_in: float, m_h: float, m_c: float) -> float:
# #     """
# #     Scales the 4 inputs using the trained scaler, feeds them into the .pkl model, 
# #     and returns the prediction. Uses lazy-loading to save server RAM.
# #     """
    
# #     # 1. Ask the model_loader for your specific files
# #     # It will look inside: engine/trained_models/heat_exchanger/
# #     model = get_model("heat_exchanger", "thermal_model.pkl")
# #     scaler = get_model("heat_exchanger", "thermal_scaler.pkl")
    
# #     # Safety check
# #     if model is None or scaler is None:
# #         raise ValueError("Machine Learning model or scaler is missing. Check your trained_models folder.")

# #     # 2. Format the raw inputs exactly how the model expects them
# #     raw_features = [[th_in, tc_in, m_h, m_c]]
    
# #     # 3. Transform the raw inputs using your scaler
# #     scaled_features = scaler.transform(raw_features)
    
# #     # 4. Make the prediction using the scaled features
# #     prediction = model.predict(scaled_features)[0]
    
# #     return round(float(prediction), 2)

# import warnings
# from engine.model_loader import get_model

# warnings.filterwarnings("ignore", category=UserWarning)

# def predict_ml_th_out(th_in: float, tc_in: float, m_h: float, m_c: float) -> float:
#     """
#     Scales the 4 inputs using the trained scaler, feeds them into the .pkl model, 
#     and returns the prediction. Uses lazy-loading to save server RAM.
#     """
    
#     # 1. Ask the model_loader for your specific files
#     model = get_model("heat_exchanger", "thermal_model.pkl")
#     scaler = get_model("heat_exchanger", "thermal_scaler.pkl")
    
#     # Safety check
#     if model is None or scaler is None:
#         raise ValueError("Machine Learning model or scaler is missing. Check your trained_models folder.")

#     # 2. Format the raw inputs exactly how the model expects them
#     raw_features = [[th_in, tc_in, m_h, m_c]]
    
#     # 3. Transform the raw inputs using your scaler
#     scaled_features = scaler.transform(raw_features)
    
#     # 4. Make the prediction
#     prediction = model.predict(scaled_features)
    
#     # THE FIX: Safely extract the raw number whether the array is [45.6] or [[45.6]]
#     try:
#         final_val = prediction.item()
#     except ValueError:
#         # Fallback just in case your model predicts multiple outputs at once
#         final_val = prediction.flatten()[0]
    
#     return round(float(final_val), 2)

import warnings
from engine.model_loader import get_model
from typing import Dict

warnings.filterwarnings("ignore", category=UserWarning)

# Heat Exchanger Prediction
def predict_ml_heat_exchanger(th_in: float, tc_in: float, m_h: float, m_c: float) -> Dict[str, float]:
    """
    Scales inputs, predicts both Th_out and Tc_out, and returns them as a dictionary.
    """
    
    # 1. Load model and scaler
    model = get_model("heat_exchanger", "thermal_model.pkl")
    scaler = get_model("heat_exchanger", "thermal_scaler.pkl")
    
    if model is None or scaler is None:
        raise ValueError("Machine Learning model or scaler is missing.")

    # 2. Format inputs
    raw_features = [[th_in, tc_in, m_h, m_c]]
    
    # 3. Transform and Predict
    scaled_features = scaler.transform(raw_features)
    predictions = model.predict(scaled_features) # Returns: [[th_out, tc_out]]
    
    # 4. Extract values from the array
    # predictions[0][0] is Th_out, predictions[0][1] is Tc_out
    th_out = float(predictions[0][0])
    tc_out = float(predictions[0][1])
    
    return {
        "th_out": round(th_out, 2),
        "tc_out": round(tc_out, 2)
    }

# Pressure Drop Prediction
def predict_ml_pressure_drop(t_c: float, d_h: float, v: float, re: float) -> float:
    """
    Scales inputs, predicts Pressure Drop, and returns it.
    """
    # 1. Load model and scaler
    model = get_model("pressure_drop", "pressure_model.pkl")
    scaler = get_model("pressure_drop", "pressure_scaler.pkl")
    
    if model is None or scaler is None:
        raise ValueError("Pressure Drop ML model or scaler is missing.")

    # 2. Format inputs (MUST match the order used during training!)
    raw_features = [[t_c, d_h, v, re]]
    
    # 3. Transform and Predict
    scaled_features = scaler.transform(raw_features)
    prediction = model.predict(scaled_features) 
    
    # Extract the single predicted value
    try:
        final_val = prediction.item()
    except ValueError:
        final_val = prediction.flatten()[0]
        
    return round(float(final_val), 2)