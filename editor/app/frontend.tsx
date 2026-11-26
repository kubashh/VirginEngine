import { createRoot } from "react-dom/client";
import { App } from "./App";

// set global events
window.addEventListener(`contextmenu`, (e) => {
  e.preventDefault();
});

createRoot(document.getElementsByTagName(`body`)[0]).render(<App />);
