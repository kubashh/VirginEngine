import { file } from "../util/basicFunctions";

export class AudioVE implements TAudioVE {
  static canPlay = false;
  private audio: HTMLAudioElement;

  constructor({ path }: AudioProps) {
    this.audio = file(path);
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

type TAudioVE = {
  play: () => void;
  stop: () => void;
};
