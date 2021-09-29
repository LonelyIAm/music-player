import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MusicProvider } from "./context/MusicContext";
import { PlayListProvider } from "./context/PlaylistContext";

ReactDOM.render(
  <PlayListProvider>
    <MusicProvider>
      <App />
    </MusicProvider>
  </PlayListProvider>,
  document.getElementById("root")
);
