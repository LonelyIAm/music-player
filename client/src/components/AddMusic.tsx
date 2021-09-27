import { useState } from "react";
import { useMusic } from "../context/MusicContext";

const AddMusic = () => {
  const { addMusic } = useMusic()!;

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  // Handle controlled inputs
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  // Handle form submit
  const handleAddMusic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await addMusic(title, url);
    if (status !== "success") setError("an error occured");
    console.log(status);
  };

  return (
    <form onSubmit={handleAddMusic}>
      {error}
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <input
        type="text"
        placeholder="youtube url"
        value={url}
        onChange={handleUrlChange}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddMusic;
