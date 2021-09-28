import { FC } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

interface PPButtonProps {
  playing: boolean;
  play: React.MouseEventHandler<HTMLButtonElement>;
  pause: React.MouseEventHandler<HTMLButtonElement>;
}

const PPButton: FC<PPButtonProps> = ({ playing, pause, play }) => {
  return (
    <>
      {playing ? (
        <button onClick={pause}>
          <MdPause />
        </button>
      ) : (
        <button onClick={play}>
          <MdPlayArrow />
        </button>
      )}
    </>
  );
};

export default PPButton;
