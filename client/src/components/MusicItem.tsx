import React, { FC } from "react";
import { MdMoreVert, MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  MusicItem as MusicItemProps,
  useMusicMutater,
} from "../context/MusicContext";

const MusicItem: FC<MusicItemProps> = ({ id, title, url }) => {
  const { removeMusic } = useMusicMutater();

  return (
    <li>
      <Link to={`/music/${id}`}>
        <MdPlayArrow />
      </Link>
      {title}{" "}
      <button onClick={() => {}}>
        <MdMoreVert />
      </button>
    </li>
  );
};

export default MusicItem;
