import { createContext, FC, useContext, useEffect, useState } from "react";
import { useMusic } from "./MusicContext";

export type PlayListItem = {
  id: number;
  music: number[];
  title: string;
};

type PlayListProviderValues = {
  playlists: PlayListItem[];
  setPlaylists: React.Dispatch<React.SetStateAction<PlayListItem[]>>;
  getPlaylist: (id: number) => PlayListItem | undefined;
};

const PlayListContext = createContext<PlayListProviderValues | null>(null);

export const usePlaylist = () => useContext(PlayListContext);

export const PlayListProvider: FC = ({ children }) => {
  // Set playlists state
  const [playlists, setPlaylists] = useState<PlayListItem[]>(
    JSON.parse(localStorage.getItem("playlists") || "[]")
  );

  // Update localStorage from playlists each time playlists changes
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const getPlaylist = (id: number) =>
    playlists.filter(({ id: Id }) => id === Id).pop();

  return (
    <PlayListContext.Provider value={{ playlists, setPlaylists, getPlaylist }}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlaylistMutater = () => {
  const { setPlaylists } = usePlaylist()!;

  const addPlaylist = (title: string, music: number[]) =>
    setPlaylists((p) => [
      ...p,
      {
        id: p.length ? p[p.length - 1].id + 1 : 0,
        music,
        title,
      },
    ]);

  const removePlaylist = (id: number) =>
    setPlaylists((playlist) => playlist.filter(({ id: Id }) => Id !== id));

  return { addPlaylist, removePlaylist };
};
