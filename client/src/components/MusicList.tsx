import { useMusic } from "../context/MusicContext";
import MusicItem from "./MusicItem";

const MusicList = () => {
  const { music } = useMusic()!;
  return (
    <ul>
      {music.map((item) => (
        <MusicItem {...item} />
      ))}
    </ul>
  );
};

export default MusicList;
