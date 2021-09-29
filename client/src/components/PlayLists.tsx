import React, { FC, useState } from "react";
import { useMusic } from "../context/MusicContext";
import { usePlaylist, usePlaylistMutater } from "../context/PlaylistContext";

const PlayLists: FC = () => {
  const { music } = useMusic()!;
  const { playlists } = usePlaylist()!;
  const { addPlaylist } = usePlaylistMutater();

  const [creating, setCreating] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  const enableCreate = () => setCreating(true);
  const handleMusicSelectChange = (id: number) =>
    setChecked((Ids) => {
      if (Ids.includes(id)) return Ids.filter((Id) => Id !== id);
      else return [...Ids, id];
    });
  const createPlaylist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPlaylist(title, checked);
    setTitle("");
    setCreating(false);
    setChecked([]);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
        }}
      >
        <div>
          <h3>Play Lists</h3>
          {creating ? (
            <form onSubmit={createPlaylist}>
              <legend>Create Playlist</legend>
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
              <button type="submit">Create</button>
            </form>
          ) : (
            <>
              <ul>
                {playlists.map(({ id, title }) => (
                  <li key={id}>Title: {title}</li>
                ))}
              </ul>
              <button onClick={enableCreate}>Create</button>
            </>
          )}
        </div>
        {creating && (
          <div>
            <h3>Music</h3>
            <ul>
              {music.map(({ id, title }) => (
                <li key={id}>
                  <input
                    type="checkbox"
                    checked={checked.includes(id)}
                    onChange={() => handleMusicSelectChange(id)}
                  />
                  Title: {title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default PlayLists;
