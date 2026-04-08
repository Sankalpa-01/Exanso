# 1. Start with a blank computer that has Python 3.11 pre-installed
FROM python:3.11

# 2. Create a folder inside this new computer called /app
WORKDIR /app

# 3. Copy your requirements file into the container
COPY ./requirements.txt /app/requirements.txt

# 4. Install all your heavy ML packages (scikit-learn, fastapi, etc.)
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# 5. Copy ALL your code AND your massive .pkl file into the container
COPY . /app

# 6. Turn on the FastAPI server (Hugging Face specifically listens on port 7860)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]