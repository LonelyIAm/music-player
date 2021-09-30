from typing import Dict, TypedDict
from youtube_dl import YoutubeDL

ydl = YoutubeDL({"quiet": True})


def get_audio(url_list):
    audios = list()
    for input in url_list:
        try:
            # Get video info and formats
            formats = ydl.extract_info(input["url"], download=False).get("formats")

            # Extract audio url from formats
            format = [format for format in formats if format.get("vcodec") == "none" and format.get("acodec") != "none"]

            # Return audio url through the proxy
            if format:
                audios.append({input["id"]: {"audio": format[0].get("url")}})
            else:
                audios.append({"audio": None})
        except Exception as e:
            audios.append({"error": str(e)})
    return {"audios": audios}
