import Dexie from "dexie";
import { useEffect, useState } from "react";
import { fetchUrl } from "./music";

export interface ISong {
  id?: number;
  title: string;
  url: string;
  file: Blob;
}

class MusicDatabase extends Dexie {
  songs: Dexie.Table<ISong>;

  constructor() {
    super("MusicDatabase");

    this.version(1).stores({
      songs: "++id, title, url, file",
    });

    this.songs = this.table("songs");
  }
}

const db = new MusicDatabase();

type IStatus = "loading" | "done" | "error" | null;

export const useMusicDB = () => {
  const [status, setStatus] = useState<IStatus>(null);
  const [songs, setSongs] = useState<ISong[] | null>(null);

  const addSong = () => {
    async (title: string, url: string) => {
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
  };

  useEffect(
    () =>
      // @ts-ignore
      (async () => {
        setSongs(await db.songs.toArray());
        setStatus("done");
      })(),
    []
  );

  return { songs, status };
};
