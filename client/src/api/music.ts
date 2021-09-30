type Response = {
  audio?: string;
  id?: number;
  error?: boolean;
};

type Responses = {
  audios?: { [key: number]: string }[];
  error?: boolean;
};

export async function fetchUrl(url: string): Promise<Response | undefined> {
  try {
    const response = await fetch("http://127.0.0.1:8000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        srcs: [{ id: 0, url }],
      }),
    });
    if (response.ok) return (await response.json()).audios.pop()[0];
  } catch (error: unknown) {
    console.log(error);
    return { error: true };
  }
}

export async function fetchMusic(
  urls: { id: number; url: string }[]
): Promise<Responses | undefined> {
  try {
    const response = await fetch("http://127.0.0.1:8000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        srcs: urls,
      }),
    });
    if (response.ok) return await response.json();
  } catch (error: any) {
    return { error: true };
  }
}

export async function validateUrls(urls: { url: string; id: number }[]) {
  return [0];
}
