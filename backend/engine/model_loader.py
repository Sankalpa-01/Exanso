import joblib
import os
import warnings

# Suppress sklearn warnings about feature names to keep the terminal clean
warnings.filterwarnings("ignore", category=UserWarning)

# This dictionary is our RAM Cache. It starts empty.
_model_cache = {}

def get_model(experiment_folder: str, file_name: str):
    """
    Lazy-loads a .pkl file. 
    If it's already in RAM, it returns it instantly.
    If not, it reads the hard drive, saves it to RAM, and then returns it.
    """
    # Create a unique ID for this file (e.g., "heat_exchanger_thermal_model.pkl")
    cache_key = f"{experiment_folder}_{file_name}"
    
    # 1. Is it already in RAM? If yes, return it instantly!
    if cache_key in _model_cache:
        return _model_cache[cache_key]
        
    # 2. If not, build the exact absolute path to find it on the hard drive
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(BASE_DIR, "trained_models", experiment_folder, file_name)
    
    # 3. Load it, save it to the cache, and return it
    try:
        loaded_file = joblib.load(file_path)
        _model_cache[cache_key] = loaded_file
        print(f"✅ Loaded {cache_key} into memory for the first time.")
        return loaded_file
    except FileNotFoundError:
        print(f"❌ File not found: {file_path}")
        return None
    except Exception as e:
        print(f"❌ Error loading {file_path}: {e}")
        return None