import AudioElement from "./components/AudioElement";
import { events, eventsHover, files } from "./values/consts";
import { onresize, randColor } from "./util/basicFunctions";
import { run } from "./util/runUpdateRender";

// EventListener

window.addEventListener(`mousedown`, () => (eventsHover.click = true));
window.addEventListener(`mouseup`, () => delete eventsHover.click);

window.addEventListener(`click`, () => (events.click = true));
function setAudioElement() {
  AudioElement.canPlay = true;
  window.removeEventListener(`click`, setAudioElement);
}
window.addEventListener(`click`, setAudioElement);

window.addEventListener(`keydown`, ({ key }) => (events[key] = eventsHover[key] = true));
window.addEventListener(`keyup`, ({ key }) => delete eventsHover[key]);

window.addEventListener(`contextmenu`, (e) => {
  e.preventDefault();

  !document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen();
});

window.addEventListener(`resize`, onresize);
onresize();

// Run

console.log(`Engine: ${files || randColor}`);

run();
