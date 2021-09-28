import { useEffect, useRef, useState } from "react";
import { MdMusicVideo } from "react-icons/md";
import { useParams } from "react-router";
import { PPButton } from "../components";
import { useMusic } from "../context/MusicContext";

function Player() {
  const { getMusic } = useMusic()!;
  const { id }: { id: string } = useParams();
  const { title, url } = getMusic(parseInt(id))!;

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audio = useRef(new Audio(url));

  useEffect(() => {
    const updateTime = (e: any) =>
      setProgress(e.currentTarget.currentTime / e.currentTarget.duration);
    audio.current.addEventListener("timeupdate", updateTime);

    return () => audio.current.removeEventListener("timeupdate", updateTime);
  }, []);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress_ = parseInt(e.target.value) / 100;
    setProgress(progress_);
    audio.current.currentTime = progress_ * audio.current.duration;
  };
  const playAudio = async () => {
    await audio.current.play();
    setPlaying(true);
  };
  const pauseAudio = () => {
    audio.current.pause();
    setPlaying(false);
  };
  const handleProgressChangeRefinementUp = async () => {
    audio.current.muted = false;
    await playAudio();
  };
  const handleProgressChangeRefinementDown = () => {
    audio.current.muted = true;
    pauseAudio();
  };

  return (
    <main>
      <MdMusicVideo size="40%" />
      <h1>{title}</h1>
      <PPButton playing={playing} pause={pauseAudio} play={playAudio} />
      <input
        type="range"
        value={progress * 100}
        onChange={handleProgressChange}
        onMouseUp={handleProgressChangeRefinementUp}
        onMouseDown={handleProgressChangeRefinementDown}
      />
    </main>
  );
}

export default Player;
