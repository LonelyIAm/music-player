import React from "react";
import { MusicItem as MusicItemProps } from "../context/MusicContext";

const MusicItem = ({ id, title, url }: MusicItemProps) => {
  const doSmtg = (e: any) => console.log(e.nativeEvent.target.currentTime);
  return (
    <li key={id}>
      Title: {title} <audio src={url} controls onTimeUpdate={doSmtg}></audio>
    </li>
  );
};

export default MusicItem;
