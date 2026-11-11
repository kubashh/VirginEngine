import { audio } from "../values/consts";

export class AudioVE {
  static canPlay: boolean = false;
  private audio: HTMLAudioElement;

  constructor({ path }: AudioProps) {
    this.audio = audio[path];
  }

  play() {
    if (!AudioVE.canPlay) return;

    this.audio.currentTime = 0;
    this.audio.play();
  }

  stop() {
    this.audio.pause();
  }
}

export type AudioProps = { path: string };
