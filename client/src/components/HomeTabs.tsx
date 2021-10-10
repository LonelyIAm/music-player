import { FC, useState } from "react";
import { MusicList, PlayLists } from ".";
import { useMusicDB } from "../api/musicDB";

type Tabs = "music" | "playlists";

const HomeTabs: FC = () => {
  const [tab, setTab] = useState<Tabs>("music");
  const songs = useMusicDB();

  const RenderTab = () => {
    switch (tab) {
      case "music":
        return <MusicList />;
      case "playlists":
        return <PlayLists />;
    }
  };

  return (
    <>
      <ul>
        <li
          onClick={() => setTab("music")}
          style={{ color: tab === "music" ? "green" : "black" }}
        >
          Music
        </li>
        <li
          onClick={() => setTab("playlists")}
          style={{ color: tab === "playlists" ? "green" : "black" }}
        >
          Playlists
        </li>
      </ul>
      {songs && JSON.stringify(songs)}
      <RenderTab />
    </>
  );
};

export default HomeTabs;
