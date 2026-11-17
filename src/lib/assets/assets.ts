import audioIconSrc from "./AudioIcon.png";
import { virginEngineVersion } from "../core";
import { boxSprite, happyBoxSprite, inpactSound } from "./rawSrc";
import { type TFile, type TProject } from "../consts";
import { Enum } from "../typeInput/EnumInput";

export { audioIconSrc };

export const defaultAssets = {
  boxImg: {
    type: `img`,
    src: boxSprite,
    quality: 1,
  } as TFile,
  happyBoxImg: {
    type: `img`,
    src: happyBoxSprite,
    quality: 1,
  } as TFile,
  audio: {
    type: `audio`,
    src: ``,
    quality: 1,
    audoplay: false,
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
    this.node.position = { x: random(-Camera.xOffset, Camera.xOffset), y: random(-Camera.yOffset, Camera.yOffset) };
  }

  update() {
    const x = this.node.position.x - random(0, 2);
    const y = this.node.position.y - random(0, 0.3);
    this.node.position = { x: x < -Camera.xOffset ? Camera.xOffset : x, y: y < -Camera.yOffset ? Camera.yOffset : y };
  }
}
`,
          },
          AudioController: {
            type: `node`,
            transform: {
              position: { x: 0, y: 0 },
              rotation: 0,
              scale: { x: 1, y: 1 },
            },
            audio: { path: `files.Assets.Audio.InpactSound`, autoplay: false },
            script: `class AudioController {
  start() {
    this.node.audio.play(0);
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
          BoxImage: defaultAssets.boxImg,
          HappyBoxImage: defaultAssets.happyBoxImg,
        },
        Audio: {
          type: `folder`,
          InpactSound: {
            type: `audio`,
            src: inpactSound,
            quality: 1,
          },
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
      hydrateCanvasId: ``,
      performanceInfo: Enum<`yes` | `dev` | `no`>(`dev`, `yes`, `dev`, `no`), // TODO save as string or number, in editor display as Enum
    },
    metadata: {
      editorVersion: virginEngineVersion,
      modifiedDate: Date.now(),
    },
  };
}
