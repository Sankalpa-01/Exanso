from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# 1. Import Database and Models 
# (This ensures SQLAlchemy knows about your tables when it creates the database)
from database import engine, Base
from models import user, experiment

# 2. Import all your Routers
from api.routers import auth_router, users_router, heat_exchanger
from fastapi.staticfiles import StaticFiles

# 3. Auto-Create the Database Tables
# The moment you start the server, this checks if exanso.db exists.
# If not, it creates it and builds the users and experiments tables instantly.
Base.metadata.create_all(bind=engine)

# 4. Initialize the FastAPI Application
app = FastAPI(
    title="Exanso AI Backend",
    description="Sim-to-Real Virtual Laboratory API",
    version="1.0.0"
)

# 2. CREATE THE FOLDER IF IT DOESN'T EXIST
os.makedirs("static/profiles", exist_ok=True)

# 3. THIS IS THE MAGIC LINE THAT FIXES YOUR BROKEN IMAGE:
app.mount("/static", StaticFiles(directory="static"), name="static")

# 5. Configure CORS (Cross-Origin Resource Sharing)
# This is crucial! It gives your React frontend (port 5173) explicit permission 
# to send data and tokens to this backend (port 8000).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], # Your React frontend URL
    allow_credentials=True,
    allow_methods=["*"], # Allows POST, GET, OPTIONS, etc.
    allow_headers=["*"],
)

# 6. Register your API Routes
# This maps the clean URL paths to the logic inside your router files.
app.include_router(auth_router.router, prefix="/auth")
app.include_router(users_router.router, prefix="/users")
app.include_router(heat_exchanger.router, prefix="/predict/heat-exchanger")

# 7. Root Health Check Route
@app.get("/", tags=["System"])
def health_check():
    """A simple ping to verify the server is running."""
    return {
        "status": "eXanso Core Systems Online",
        "database": "Connected",
        "version": "1.0.0"
    }