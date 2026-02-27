import { file } from "../util/basicFunctions";

export default class AudioElement implements TAudio {
  static canPlay = false;
  private audio: HTMLAudioElement;

  constructor({ path }: AudioProps) {
    this.audio = file(path);
  }

  play() {
    if (!AudioElement.canPlay) return;

    this.audio.currentTime = 0;
    this.audio.play();
  }

  stop() {
    this.audio.pause();
  }
}
