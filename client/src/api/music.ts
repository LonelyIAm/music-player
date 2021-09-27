export async function fetchUrl(url: string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/${encodeURIComponent(encodeURIComponent(url))}`
    );
    if (response.ok) return await response.json();
  } catch (error: any) {
    return { error: error.message };
  }
}
