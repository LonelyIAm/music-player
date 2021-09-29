import { FC } from "react";
import { MusicItem } from ".";
import { useMusic } from "../context/MusicContext";

const MusicList: FC = () => {
  const { music } = useMusic()!;

  return (
    <>
      <h1>Music</h1>
      <ul>
        {music.map((item) => (
          <MusicItem key={item.id} {...item} />
        ))}
      </ul>
    </>
  );
};

export default MusicList;
