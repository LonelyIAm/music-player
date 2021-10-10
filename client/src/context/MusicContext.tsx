import { createContext, FC, useContext, useEffect, useState } from "react";
import { fetchMusic, fetchUrl, validateUrls } from "../api/music";
import { ISong, useMusicDB } from "../api/musicDB";
import { usePlaylist } from "./PlaylistContext";

type SongsProviderValues = {
  songs: ISong[] | null;
  getMusic: (id: number) => ISong | undefined;
};

const SongsContext = createContext<SongsProviderValues | null>(null);

export const useMusic = () => useContext(SongsContext);

export const MusicProvider: FC = ({ children }) => {
  // Set music state
  const { songs, status } = useMusicDB();

  const getMusic = (id: number) =>
    songs!.filter(({ id: Id }) => id === Id).pop();

  return (
    <SongsContext.Provider value={{ songs, getMusic }}>
      {status && status !== "loading" ? children : "help"}
    </SongsContext.Provider>
  );
};

export const useMusicMutater = () => {
  const { setMusic } = useMusic()!;
  const { setPlaylists } = usePlaylist()!;
  const [status, setStatus] = useState<"loading" | "done" | "error" | null>(
    null
  );

  const addMusic = async (title: string, url: string) => {
    setStatus("loading");
    const result = await fetchUrl(url)!;
    if (result?.error) {
      setStatus("error");
    } else {
      setMusic((m) => [
        ...m,
        {
          title,
          url,
          parsedUrl: result!.audio!,
          id: m.length ? m[m.length - 1].id + 1 : 0,
        },
      ]);
      setStatus("done");
    }
  };

  const removeMusic = (id: number) => {
    setMusic((music) => music.filter(({ id: Id }) => Id !== id));
    setPlaylists((playlists) =>
      playlists.map(({ id, title, music }) => ({
        id,
        title,
        music: music.filter((Id) => id !== Id),
      }))
    );
  };

  return { status, addMusic, removeMusic };
};
