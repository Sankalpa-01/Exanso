import joblib
import os

# 1. Build the absolute path to your .pkl file safely
# This ensures it works no matter where you run the server from
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "trained_models", "random_forest.pkl")  # <-- Change this to your exact file name!

# 2. Load the model ONCE when the FastAPI server boots up
try:
    heat_exchanger_model = joblib.load(MODEL_PATH)
    print("✅ ML Model loaded successfully!")
except Exception as e:
    print(f"❌ Failed to load ML model: {e}")
    heat_exchanger_model = None

def predict_ml_th_out(th_in: float, tc_in: float, m_h: float, m_c: float) -> float:
    """
    Feeds the 4 inputs into the trained .pkl model and returns the prediction.
    """
    # Safety check in case the file is missing
    if heat_exchanger_model is None:
        raise ValueError("Machine Learning model is not loaded.")

    # 3. Format the inputs exactly how the model expects them
    # WARNING: The order of these variables MUST perfectly match 
    # the column order of the dataframe you used to train the model!
    input_features = [[th_in, tc_in, m_h, m_c]]
    
    # 4. Make the prediction
    # .predict() returns an array like [45.2], so we grab the first item [0]
    prediction = heat_exchanger_model.predict(input_features)[0]
    
    return round(float(prediction), 2)