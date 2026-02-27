import { signal } from "wdwh/signal";
import { Enum } from "../inspector/typeInput/EnumInput";
import { deepCopy, defaultNode, saveProject } from "./util";

export const alphabet = `abcdefghijklmnoprqstuwxyz`;
export const numbers = `0123456789`;
export const allowedNameChars = `${alphabet}${numbers}_`;

export const keywords = [
  `type`,
  `transform`,
  `position`,
  `rotation`,
  `scale`,
  `text`,
  `rect`,
  `sprite`,
  `physics`,
  `audio`,
];

export const config = {
  gameName: `NameOfGame`,
  version: `0.0.0`,
  author: `YourNick`,
  description: `Description`,
  fullScreen: true,
  pathToMainScene: `files.Scenes.DefaultScene`,
  performanceInfo: Enum(`dev`, `yes`, `dev`, `no`),
};

export const def = {
  img: {
    type: `img`,
    src: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAdnJLH8AAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAA9JREFUCB0BBAD7/wD///8F/gL+A30ZxgAAAABJRU5ErkJggg==`,
    quality: 1,
  },
  audio: {
    type: `audio`,
    src: ``,
    quality: 1,
  },
};

const filesTemplate: Any = {
  type: `folder`,
  Scenes: {
    type: `folder`,

    MenuScene: { type: `scene`, name: `MenuScene` },
    MainScene: { type: `scene`, name: `MainScene` },

    // Default Scene
    DefaultScene: {
      name: `DefaultScene`,
      type: `scene`,
      // camera: { scale: 1, aspectRatio: 1, x: 0, y: 0 },
      Parent: defaultNode({
        start: `function() {
  for(let i = 0; i < 10; i++)
    this.parent.Child.clone()
}`,
      }),
      Child: defaultNode({
        scale: { x: 20, y: 20 },
        sprite: { color: ``, path: `files.Assets.Images.BoxImage` },
        start: `function() {
  this.position = {x: rand(-Camera.xOffset, Camera.xOffset), y: rand(-Camera.yOffset, Camera.yOffset)}
}`,
        update: `function() {
  const x = this.position.x - rand(2)
  const y = this.position.y - rand(0.3)
  this.position = {x: x < -Camera.xOffset ? Camera.xOffset : x, y: y < -Camera.yOffset ? Camera.yOffset : y}
}`,
      }),
    },
  },

  // Assets
  Assets: {
    type: `folder`,
    Images: {
      type: `folder`,
      BoxImage: deepCopy(def.img),
    },
    Audio: {
      type: `folder`,
      DAudio: deepCopy(def.audio),
    },
  },
};

export const editor = {
  selectedElement: {
    type: ``,
    value: ``,
  },
};

export const currentScene = signal<Any>(filesTemplate.Scenes.MainScene);
export const inspector = signal<React.ReactNode>(null);
export const nameInput = signal<[((arg: string) => void)?, string?, boolean?]>([]);
export const dragData = signal<Any | null>(null);
export const testScene = signal(``);
export const files = signal<Any>(filesTemplate);
export const contextMenu = signal<[number?, number?, ...any]>([]);
export const setUp = signal(false);

// Set global events

function preventDefault(e: Event) {
  e.preventDefault();
}

window.addEventListener(`contextmenu`, preventDefault);

window.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey && e.key === `s`) {
    e.preventDefault();
    saveProject();
  }
});
