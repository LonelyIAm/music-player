from base64 import urlsafe_b64decode as b64decode

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import unquote

from .utils import get_audio

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/{video_url}")
def audio(video_url):
    print(video_url)
    return get_audio(unquote(video_url))


@app.get("/")
def home():
    return "audio -> /base64($video_url_id)"

