from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from urllib.parse import unquote
from pydantic import BaseModel
import requests
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

class Item(BaseModel):
    src: str


@app.post("/")
def audio(videos: Item):
    return get_audio(videos.src)


@app.get("/proxy/{url}")
def media_proxy(url):
    # Parse url
    url = unquote(url).decode("ascii")
    print(url)

    # Check if link redirects
    head = requests.head(url, allow_redirects=False)
    if head.status_code == 302:
        url = head.headers["location"]

    # Get data
    resp = requests.get(url, stream=True)
    headers = [(name, value) for (name, value) in resp.raw.headers.items()]

    # Return response
    response = StreamingResponse(
        resp.iter_content(chunk_size=1024), media_type=[header for header in headers if header[0] == "Content-Type"][0][1])
    return response