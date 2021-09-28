import { createContext, FC, useContext, useEffect, useState } from "react";
import { fetchUrl } from "../api/music";

export type MusicItem = {
  id: number;
  url: string;
  title: string;
};

type MusicProviderValues = {
  music: MusicItem[];
  setMusic: React.Dispatch<React.SetStateAction<MusicItem[]>>;
  getMusic: (id: number) => MusicItem | undefined;
};

const MusicContext = createContext<MusicProviderValues | null>(null);

export const useMusic = () => useContext(MusicContext);

export const MusicProvider: FC = ({ children }) => {
  // Set music state
  const [music, setMusic] = useState<MusicItem[]>(
    JSON.parse(localStorage.getItem("music") || "[]")
  );

  // Update localStorage from music each time music changes
  useEffect(() => {
    localStorage.setItem("music", JSON.stringify(music));
  }, [music]);

  const getMusic = (id: number) =>
    music.filter(({ id: Id }) => id === Id).pop();

  return (
    <MusicContext.Provider value={{ music, setMusic, getMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicMutater = () => {
  const { setMusic } = useMusic()!;
  const [status, setStatus] = useState<"loading" | "done" | "error" | null>(
    null
  );

  const addMusic = async (title: string, url: string) => {
    setStatus("loading");
    const result = await fetchUrl(url);
    if (!result.audio) {
      setStatus("error");
    } else {
      setMusic((m) => [
        ...m,
        {
          title,
          url: result.audio,
          id: m.length ? m[m.length - 1].id + 1 : 0,
        },
      ]);
      setStatus("done");
    }
  };

  const removeMusic = (id: number) =>
    setMusic((music) => music.filter(({ id: Id }) => Id !== id));

  return { status, addMusic, removeMusic };
};
