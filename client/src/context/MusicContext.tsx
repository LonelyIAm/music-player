import { createContext, FC, useContext, useEffect, useState } from "react";
import { fetchMusic, fetchUrl, validateUrls } from "../api/music";
import { usePlaylist } from "./PlaylistContext";

export type MusicItem = {
  id: number;
  url: string;
  parsedUrl: string;
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
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState<MusicItem[]>(
    JSON.parse(localStorage.getItem("music") || "[]")
  );

  // Validate and refetch urls
  useEffect(() => {
    const main = async () => {
      const invalid = await validateUrls(
        music.map(({ id, parsedUrl }) => ({ id, url: parsedUrl }))
      );
      if (invalid.length) {
        const validated = (await fetchMusic(
          music
            .filter(({ id }) => invalid.includes(id))
            .map(({ url, id }) => ({ url, id }))
        ))!;

        setMusic((ms) =>
          ms.map(({ id, title, url, parsedUrl }) => {
            const valid = validated
              .audios!.filter((a) => Object.keys(a).includes(id.toString()))
              .pop()!;

            if (valid)
              return {
                id,
                parsedUrl: valid[id],
                title,
                url,
              };

            return { id, title, url, parsedUrl };
          })
        );
      }
    };
    main();
  }, []);

  // Update localStorage from music each time music changes
  useEffect(() => {
    localStorage.setItem("music", JSON.stringify(music));
  }, [music]);

  const getMusic = (id: number) =>
    music.filter(({ id: Id }) => id === Id).pop();

  return (
    <MusicContext.Provider value={{ music, setMusic, getMusic }}>
      {!loading ? children : "help"}
    </MusicContext.Provider>
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
