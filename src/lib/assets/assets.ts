import audioIconSrc from "./AudioIcon.png";
import { virginEngineVersion } from "../core";
import type { TFile, TProject } from "../consts";
import { Enum } from "../../inspector/typeInput/EnumInput";

export const boxSprite = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAdnJLH8AAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAA9JREFUCB0BBAD7/wD///8F/gL+A30ZxgAAAABJRU5ErkJggg==`;

export const happyBoxSprite = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAAXNSR0IB2cksfwAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+oEBBIdGhxFQasAAAC2SURBVBjThY8xCoNAFET/xiBqYa0L3sXWK3gowSt4A89gJQjWgttY/F3LhY+N4KRIE5Mir5liijejANCd4ziIKEkSInqe59k0TVEUdV1ba51zYRgOw+CcK8vyMY5j3/fTNBFRnudZlolImqbXdXnviZmNMcyMO8YYAOrX/cnjHSIiIl/dPM9PIuq6blkWAN57Zg6CQGu973scxwqAtbZt223b1nUFoLVWSlVVFUXRzf35+M2faS94cHkj8YCVlgAAAABJRU5ErkJggg==`;

export { audioIconSrc };

export const defaultAssets = {
  img: {
    type: `img`,
    src: boxSprite,
    quality: 1,
  } as TFile,
  img2: {
    type: `img`,
    src: happyBoxSprite,
    quality: 1,
  } as TFile,
  audio: {
    type: `audio`,
    src: ``,
    quality: 1,
  } as TFile,
};

export function emptyProject(): TProject {
  return {
    files: {
      type: `folder`,
      Scenes: {
        type: `folder`,

        MenuScene: { type: `scene`, name: `MenuScene` },

        MainScene: {
          name: `MainScene`,
          type: `scene`,
          // camera: { scale: 1, aspectRatio: 1, x: 0, y: 0 },
          Parent: {
            type: `node`,
            transform: {
              position: { x: 0, y: 0 },
              rotation: 0,
              scale: { x: 1, y: 1 },
            },
            script: `class ParentController {
  start() {
    for(let i = 0; i < 20; i++)
      this.node.parent.Child.clone();
  }
}
`,
          },
          Child: {
            type: `node`,
            transform: {
              position: { x: 0, y: 0 },
              rotation: 0,
              scale: { x: 20, y: 20 },
            },
            sprite: { color: ``, path: `files.Assets.Images.BoxImage` },
            script: `class ChildScript {
  start() {
    this.node.position = { x: rand(-Camera.xOffset, Camera.xOffset), y: rand(-Camera.yOffset, Camera.yOffset) };
  }

  update() {
    const x = this.node.position.x - rand(2);
    const y = this.node.position.y - rand(0.3);
    this.node.position = { x: x < -Camera.xOffset ? Camera.xOffset : x, y: y < -Camera.yOffset ? Camera.yOffset : y };
  }
}
`,
          },
        },
      },

      Assets: {
        type: `folder`,
        Images: {
          type: `folder`,
          BoxImage: defaultAssets.img,
          HappyBoxImage: defaultAssets.img2,
        },
        Audio: {
          type: `folder`,
          DAudio: defaultAssets.audio,
        },
      },
    },
    config: {
      gameName: ``,
      version: `0.0.1`,
      author: `YourNick`,
      description: `Description`,
      fullScreen: true,
      startingSceneName: `MainScene`,
      performanceInfo: Enum<`yes` | `dev` | `no`>(`dev`, `yes`, `dev`, `no`), // TODO save as string or number, in editor display as Enum
    },
    metadata: {
      editorVersion: virginEngineVersion,
      modifiedDate: Date.now(),
    },
  };
}
