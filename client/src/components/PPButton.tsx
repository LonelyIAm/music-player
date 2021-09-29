import { FC } from "react";
import { MdPause, MdPlayArrow, MdReplay } from "react-icons/md";

interface PPButtonProps {
  playing: "playing" | "paused" | "done";
  play: React.MouseEventHandler<HTMLButtonElement>;
  pause: React.MouseEventHandler<HTMLButtonElement>;
  replay: React.MouseEventHandler<HTMLButtonElement>;
}

const PPButton: FC<PPButtonProps> = ({ playing, pause, play, replay }) => {
  switch (playing) {
    case "playing":
      return (
        <button onClick={pause}>
          <MdPause />
        </button>
      );
    case "paused":
      return (
        <button onClick={play}>
          <MdPlayArrow />
        </button>
      );
    case "done":
      return (
        <button onClick={replay}>
          <MdReplay />
        </button>
      );
  }
};

export default PPButton;
