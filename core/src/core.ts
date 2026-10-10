import { AudioVE } from "./components/AudioVE";
import { events, eventsHover, files } from "./values/consts";
import { onresize, randomInt } from "./util/basicFunctions";
import { VirginEngine } from "./classes/VirginEngine";

// window events

window.addEventListener(`mousedown`, () => (eventsHover.click = true));
window.addEventListener(`mouseup`, () => delete eventsHover.click);

window.addEventListener(`click`, () => (events.click = true));
function setAudioElement() {
  AudioVE.canPlay = true;
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

window.addEventListener(`close`, VirginEngine.quit);

// run

console.log(`Engine: ${files || randomInt}`);

VirginEngine.run();
