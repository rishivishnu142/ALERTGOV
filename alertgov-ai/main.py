from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json

app = FastAPI(title="AlertGov AI Microservice", description="FastAPI Backend for Ollama AI Integration")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8081", "http://localhost:8082"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ollama's default local API endpoint
OLLAMA_URL = "http://localhost:11434/api/generate"
# Default Model (the user needs to pull this via 'ollama run llama3')
MODEL_NAME = "llama3"

class AIRequest(BaseModel):
    prompt: str
    model: str = MODEL_NAME
    language: str = "en"

class AIResponse(BaseModel):
    response: str
    data: dict = None

@app.get("/")
def health_check():
    return {"status": "ok", "service": "AlertGov AI Microservice"}

@app.post("/ai/predict-risk", response_model=AIResponse)
def predict_risk(request: AIRequest):
    """
    Analyzes disaster data and predicts risk levels using Ollama.
    """
    lang_instruction = "IMPORTANT: You MUST write 'concise_description' and 'recommendation' entirely in English."
    if request.language == "ta":
        lang_instruction = "IMPORTANT: You MUST write 'concise_description' and 'recommendation' entirely in Tamil (தமிழ்) script."

    system_prompt = f"""You are an expert AI risk analyst for a disaster management system. 
Analyze the situation and return a JSON object strictly following this structure:
{{
  "severity": "Low" | "Medium" | "High" | "Severe" | "Extremely Severe",
  "duplicate_check": false,
  "spam_check": false,
  "concise_description": "A single, brief, formal paragraph (max 2 sentences) summarizing the incident for official logs. NO bullet points.",
  "recommendation": "A single brief sentence of actionable advice for the response team."
}}
If you suspect the input is spam or a test, set spam_check to true.
{lang_instruction}"""
    full_prompt = f"{system_prompt}\n\nIncident Description to analyze:\n{request.prompt}"
    
    return _call_ollama_json(full_prompt, request.model)


@app.post("/ai/generate-insights", response_model=AIResponse)
def generate_insights(request: AIRequest):
    """
    Generates executive insights based on incident reports.
    """
    system_prompt = "You are an executive advisor for a District Collector. Summarize the following disaster reports into bulleted actionable insights."
    full_prompt = f"{system_prompt}\\n\\n{request.prompt}"
    
    return _call_ollama(full_prompt, request.model)


def _call_ollama(prompt: str, model: str):
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
        "keep_alive": -1,
        "options": {
            "num_predict": 250,
            "temperature": 0.2
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        return AIResponse(response=data.get("response", "No response from AI."))
    except requests.exceptions.ConnectionError:
        raise HTTPException(
            status_code=503, 
            detail="Could not connect to Ollama. Make sure the Ollama app is running on your machine."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def _call_ollama_json(prompt: str, model: str):
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
        "format": "json",
        "keep_alive": -1,
        "options": {
            "num_predict": 150,
            "temperature": 0.1
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        
        raw_text = data.get("response", "{}")
        parsed_json = {}
        try:
            parsed_json = json.loads(raw_text)
        except json.JSONDecodeError:
            pass
            
        return AIResponse(response=raw_text, data=parsed_json)
    except requests.exceptions.ConnectionError:
        raise HTTPException(
            status_code=503, 
            detail="Could not connect to Ollama. Make sure the Ollama app is running on your machine."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Start the server on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
