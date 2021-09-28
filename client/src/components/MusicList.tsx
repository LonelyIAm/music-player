import { MusicItem } from ".";
import { useMusic } from "../context/MusicContext";

const MusicList = () => {
  const { music } = useMusic()!;
  return (
    <ul>
      {music.map((item) => (
        <MusicItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default MusicList;
