import React from "react";
import { MdPlayForWork } from "react-icons/md";
import {
  MusicItem as MusicItemProps,
  useMusicMutater,
} from "../context/MusicContext";

const MusicItem = ({ id, title, url }: MusicItemProps) => {
  const { removeMusic } = useMusicMutater();

  return (
    <li>
      <button>
        <MdPlayForWork />
        {title} <button onClick={() => removeMusic(id)}>X</button>
      </button>
    </li>
  );
};

export default MusicItem;
