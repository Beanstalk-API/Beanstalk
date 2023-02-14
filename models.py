from pydantic import BaseModel

class APIDetails(BaseModel):
    model_name: str
    language: str
    framework: str
    backend: str