from fastapi import FastAPI, Request
import json
from typing import Optional
from models import APIDetails
import openai
from fastapi.middleware.cors import CORSMiddleware
import markdown

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

openai.api_key = "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"


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/generate_api")
async def generate_api(api_details: APIDetails):
    prompt = f"For a {api_details.model_name} database model , generate {api_details.backend} db connection for {api_details.language}, {api_details.language} database model, {api_details.language} CRUD endpoints code.format the code neatly in html with appropriate styling."
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=2000
    ) 
    
    
    api_code = response["choices"][0]["text"]
    api_code = api_code.replace('\n','<br/>')
    api_code = api_code.replace('\t','')
    return api_code