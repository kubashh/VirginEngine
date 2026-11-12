import { audio, performanceInfo } from "../values/consts";

let canPlayAudio: boolean = false;
const playAudioQueue: [AudioVE, number][] = [];

function onMouseDown() {
  canPlayAudio = true;
  for (const [audio, currentTime] of playAudioQueue) {
    audio.play(currentTime);
  }
  playAudioQueue.length = 0;

  window.removeEventListener(`mousedown`, onMouseDown);
}
window.addEventListener(`mousedown`, onMouseDown);

export class AudioVE {
  private audio: HTMLAudioElement;

  constructor(props: AudioProps) {
    this.audio = new Audio(audio[props.path]);
    if (props.loop) this.audio.loop = props.loop;
  }

  play(currentTime: number) {
    // in development peoples may use play without passing currentTime value
    if (performanceInfo && typeof currentTime !== `number`)
      throw new Error(`To play audio pass number as first argument! In 90% cases 0`);

    if (!canPlayAudio) {
      playAudioQueue.push([this, currentTime]);
      return;
    }

    this.audio.currentTime = currentTime;
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  set loop(loop: boolean) {
    this.audio.loop = loop;
  }

  get currentTime() {
    return this.audio.currentTime;
  }
}

export type AudioProps = { path: string; loop?: boolean };
