import { audio, performanceInfo } from "../values/consts";

const isFirefox = navigator.userAgent.includes(`Firefox`);

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
    this.audio = new Audio(isFirefox ? audio[props.path] : getChromiumSrc(audio[props.path]));
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

function getChromiumSrc(src: string): string {
  const base64PCM = src.split(`base64,`)[1];

  const pcmBytes = Uint8Array.fromBase64(base64PCM);
  const wavBlob = createWAVBlob(pcmBytes.buffer);

  return URL.createObjectURL(wavBlob); // audio url
}

function createWAVBlob(pcmData: ArrayBuffer): Blob {
  const wavHeader = createWAVHeader(pcmData.byteLength);

  const wavBuffer = new Uint8Array(wavHeader.byteLength + pcmData.byteLength);
  wavBuffer.set(new Uint8Array(wavHeader), 0);
  wavBuffer.set(new Uint8Array(pcmData), wavHeader.byteLength);

  return new Blob([wavBuffer], { type: `audio/wav` });
}

function createWAVHeader(dataLength: number): ArrayBuffer {
  const sampleRate = 32000;
  const numChannels = 2;
  const bitsPerSample = 16;

  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);

  writeString(view, 0, `RIFF`);
  view.setUint32(4, 36 + dataLength, true);
  writeString(view, 8, `WAVE`);
  writeString(view, 12, `fmt `);
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, `data`);
  view.setUint32(40, dataLength, true);

  return buffer;
}

function writeString(view: DataView, offset: number, text: string) {
  for (let i = 0; i < text.length; i++) {
    view.setUint8(offset + i, text.charCodeAt(i));
  }
}

export type AudioProps = { path: string; loop?: boolean };
