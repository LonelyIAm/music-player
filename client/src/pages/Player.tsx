import { createRef, useState } from "react";
import { MdArrowBack, MdMusicVideo } from "react-icons/md";
import { useHistory, useParams } from "react-router";
import { PPButton } from "../components";
import { useMusic } from "../context/MusicContext";

function Player() {
  const history = useHistory();
  const { getMusic } = useMusic()!;
  const { id }: { id: string } = useParams();
  const { title, url } = getMusic(parseInt(id))!;

  const [status, setStatus] = useState<"playing" | "paused" | "done">("paused");
  const [progress, setProgress] = useState(0);
  const audio = createRef<HTMLAudioElement>();

  const updateTime = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setProgress(e.currentTarget.currentTime / e.currentTarget.duration);
  };
  const resetPlayer = () => {
    setStatus("done");
  };
  const playAudio = () => {
    console.log("computing");
    audio.current!.play();
    setStatus("playing");
    console.log("playing");
  };
  const pauseAudio = () => {
    audio.current!.pause();
    setStatus("paused");
  };
  const replayAudio = async () => {
    audio.current!.currentTime = 0;
    setProgress(0);
    playAudio();
  };
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress_ = parseInt(e.target.value) / 100;
    setProgress(progress_);
    audio.current!.currentTime = progress_ * audio.current!.duration;
  };
  const handleProgressChangeRefinementUp = async () => {
    audio.current!.muted = false;
    playAudio();
  };
  const handleProgressChangeRefinementDown = () => {
    audio.current!.muted = true;
    pauseAudio();
  };

  return (
    <main>
      <button onClick={history.goBack}>
        <MdArrowBack />
      </button>
      <MdMusicVideo size="40%" />
      <h1>{title}</h1>
      <PPButton
        playing={status}
        pause={pauseAudio}
        play={playAudio}
        replay={replayAudio}
      />
      <audio
        src={url}
        ref={audio}
        onTimeUpdate={updateTime}
        onEnded={resetPlayer}
      ></audio>
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
