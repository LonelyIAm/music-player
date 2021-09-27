import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MusicProvider } from "./context/MusicContext";

ReactDOM.render(
  <MusicProvider>
    <App />
  </MusicProvider>,
  document.getElementById("root")
);
