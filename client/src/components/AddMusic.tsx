import { useState } from "react";
import { useMusicMutater } from "../context/MusicContext";

const AddMusic = () => {
  const { status, addMusic } = useMusicMutater();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  // Handle controlled inputs
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  // Handle form submit
  const handleAddMusic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMusic(title, url);
    setUrl("");
    setTitle("");
  };

  return (
    <form onSubmit={handleAddMusic}>
      {status === "error" && "Error"}
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
      <button type="submit">
        {status !== "loading" ? "Add" : "loading..."}
      </button>
    </form>
  );
};

export default AddMusic;
