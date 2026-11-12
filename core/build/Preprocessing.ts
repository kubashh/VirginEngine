import { type BuildObject } from "./build";

export class Preprocessing {
  private static assetsPathsI: number;
  private static build: BuildObject;
  private static files: TObj<any>;
  private static mediaPaths: AssetPathOut[];

  static preprocessing(build: BuildObject) {
    this.build = build;
    this.assetsPathsI = 0;
    this.files = build.files;
    this.mediaPaths = [];

    this.optimizeAssets();

    this.moveScenes();

    this.deleteEmptyFolders(this.files, `files`, this.files);

    if (Object.keys(this.files).length > 1) {
      console.warn(`Files should be empty! files:`, this.files);
    }
  }

  private static optimizeAssets() {
    this.setAssetsPaths(this.files, `files`);

    // replace node used assets with optimized paths
    for (const key in this.files.Scenes) {
      this.optimizeNode(this.files.Scenes[key]);
    }

    this.moveUsedAssets(this.files, `files`);
  }

  private static setAssetsPaths(file: TObj<any>, path: string) {
    if (file.type === `img` || file.type === `audio`) {
      this.mediaPaths.push({
        prevPath: path,
        newI: this.assetsPathsI,
        newPath: `${this.assetsPathsI}`,
        file: file,
        isUsed: false,
      });
      this.assetsPathsI++;
    } else {
      for (const key in file) {
        if (typeof file[key] === `object`) {
          this.setAssetsPaths(file[key], `${path}.${key}`);
        }
      }
    }
  }

  private static optimizeNode(node: TObj<any>) {
    if (node.type === `node`) {
      if (node.sprite?.path) {
        const inp = this.mediaPaths.find((inp) => inp.prevPath === node.sprite.path);
        if (!inp) throw new Error(`BuildError: can't find path when optiming nodes!`);
        node.sprite.path = inp.newPath;
        inp.isUsed = true;
      } else if (node.audio?.path) {
        const inp = this.mediaPaths.find((inp) => inp.prevPath === node.audio.path);
        if (!inp) throw new Error(`BuildError: can't find path when optiming nodes!`);
        node.audio.path = inp.newPath;
        inp.isUsed = true;
      }
    }

    for (const key in node) {
      if (node[key].type === `node`) {
        this.optimizeNode(node[key]);
      }
    }
  }

  private static moveUsedAssets(file: TObj<any>, path: string) {
    if (file.type === `img` || file.type === `audio`) {
      // move asset if is used
      const mp = this.mediaPaths.find((mp) => mp.prevPath === path);
      if (!mp) throw new Error(`BuildError: can't find path when optiming nodes!`);
      if (mp.isUsed) {
        if (file.type === `img`) {
          this.build.images[mp.newI] = mp.file;
        } else {
          this.build.audio[mp.newI] = mp.file;
        }
      }

      // find parrent & delete current asset, because used or not
      let parent = this.files;
      for (const sub of path.split(`.`).slice(1, -1)) {
        parent = parent[sub];
      }
      delete parent[path.split(`.`).at(-1)!];
    } else {
      for (const key in file) {
        if (typeof file[key] === `object` && file.type !== `scene`) {
          this.moveUsedAssets(file[key], `${path}.${key}`);
        }
      }
    }
  }

  private static moveScenes() {
    const scenes = this.files.Scenes;
    delete scenes.type;
    this.build.scenes = scenes;
    delete this.files.Scenes;
  }

  private static deleteEmptyFolders(parent: TObj<any>, key: string, file: TObj<any>) {
    for (const key in file) {
      if (typeof file[key] === `object` && file[key].type === `folder`) {
        if (Object.keys(file[key]).length <= 1) {
          delete file[key];
        } else {
          this.deleteEmptyFolders(file, key, file[key]);
        }
      }
    }

    // this make sure that file will be deleted if is empty after moving media
    if (Object.keys(file).length <= 1) {
      delete parent[key];
    }
  }
}

type AssetPathOut = { prevPath: string; newI: number; newPath: string; file: any; isUsed: boolean };
