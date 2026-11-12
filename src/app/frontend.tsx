import { createRoot } from "react-dom/client";
import { App } from "./App";
import { config } from "../lib/independent/consts";
import { saveProject } from "../lib/util";

// set global events
window.addEventListener(`contextmenu`, (e) => {
  e.preventDefault();
});

window.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey && e.key === `s`) {
    e.preventDefault();
    if (config.gameName !== ``) saveProject();
  }
});

createRoot(document.getElementsByTagName(`body`)[0]).render(<App />);
