from fastapi import FastAPI, Request
import json
from typing import Optional
from models import APIDetails
import openai
from fastapi.middleware.cors import CORSMiddleware
import markdown
import uvicorn

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = ""


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/generate_api")
async def generate_api(api_details: APIDetails):
    prompt = f"For a {api_details.model_name} database model , generate {api_details.backend} db connection for {api_details.framework}, {api_details.framework} database model, {api_details.framework} CRUD endpoints code. Appropriately comment each section"
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=2000
    ) 
    
    
    api_code = response["choices"][0]["text"]
    api_code = api_code.replace('"', '')
    res_dict = {}

    lang = api_details.language

    res_dict['language'] = lang.lower()
    res_dict['code'] = api_code
    return res_dict

uvicorn.run(app, port=8080, host="0.0.0.0")