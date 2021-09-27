import { createContext, FC, useContext, useEffect, useState } from "react";
import { fetchUrl } from "../api/music";
import MusicItem from "../components/MusicItem";

export type MusicItem = {
  id: number;
  url: string;
  title: string;
};

export type MusicProviderValues = {
  music: MusicItem[];
  addMusic: (title: string, url: string) => Promise<string>;
  removeMusic: (id: number) => void;
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

  // Function to add music
  const addMusic = async (title: string, url: string) => {
    const result = await fetchUrl(url);
    console.log(result);
    if (!result.audio) {
      return result.error as string;
    } else {
      const tmp = music.filter(({ title: Title }) => Title === title);
      console.log(tmp);
      if (!tmp.length) {
        setMusic((m) => [
          ...m,
          {
            title,
            url: result.audio,
            id: m.length ? m[m.length - 1].id + 1 : 0,
          },
        ]);
        return "success";
      } else {
        return `item with title "${title}" already exists`;
      }
    }
  };

  // Function to remove music
  const removeMusic = (id: number) =>
    setMusic((m) => m.filter(({ id: Id }) => Id !== id));

  return (
    <MusicContext.Provider value={{ music, addMusic, removeMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
