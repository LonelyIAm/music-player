from typing import Dict, TypedDict
from youtube_dl import YoutubeDL

ydl = YoutubeDL({"quiet": True})

def parse_url(url): 
    return None

def get_audio(url):
    try:
        # Get video info and formats
        formats = ydl.extract_info(input["url"], download=False).get("formats")

        # Extract audio url from formats
        format = [format for format in formats if format.get("vcodec") == "none" and format.get("acodec") != "none"]

        # Return audio url through the proxy
        if format:
            return {"audio": format[0].get("url")}
        else:
            return {"audio": None}
    except Exception as e:
        return {"error": str(e)}
