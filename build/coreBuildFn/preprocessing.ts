import { type BuildObject } from "./coreBuild";

let assetsPathsI: number;
let build!: BuildObject;
let files: TObj<any>;
let mediaPaths: AssetPathOut[];

export function preprocessing(buildObject: BuildObject) {
  build = buildObject;
  assetsPathsI = 0;
  files = build.files;
  mediaPaths = [];

  optimizeAssets();

  moveScenes();

  deleteEmptyFolders(files, `files`, files);

  if (Object.keys(files).length > 1) {
    console.warn(`Files should be empty! files:`, files);
  }
}

function optimizeAssets() {
  setAssetsPaths(files, `files`);

  // replace node used assets with optimized paths
  for (const key in files.Scenes) {
    optimizeNode(files.Scenes[key]);
  }

  moveUsedAssets(files, `files`);
}

function setAssetsPaths(file: TObj<any>, path: string) {
  if (file.type === `img` || file.type === `audio`) {
    mediaPaths.push({
      prevPath: path,
      newI: assetsPathsI,
      newPath: `${assetsPathsI}`,
      file: file,
      isUsed: false,
    });
    assetsPathsI++;
  } else {
    for (const key in file) {
      if (typeof file[key] === `object`) {
        setAssetsPaths(file[key], `${path}.${key}`);
      }
    }
  }
}

function optimizeNode(node: TObj<any>) {
  if (node.type === `node`) {
    if (node.sprite?.path) {
      const inp = mediaPaths.find((inp) => inp.prevPath === node.sprite.path);
      if (!inp) throw new Error(`BuildError: can't find path when optiming nodes!`);
      node.sprite.path = inp.newPath;
      inp.isUsed = true;
    } else if (node.audio?.path) {
      const inp = mediaPaths.find((inp) => inp.prevPath === node.audio.path);
      if (!inp) throw new Error(`BuildError: can't find path when optiming nodes!`);
      node.audio.path = inp.newPath;
      inp.isUsed = true;
    }
  }

  for (const key in node) {
    if (node[key].type === `node`) {
      optimizeNode(node[key]);
    }
  }
}

function moveUsedAssets(file: TObj<any>, path: string) {
  if (file.type === `img` || file.type === `audio`) {
    // move asset if is used
    const mp = mediaPaths.find((mp) => mp.prevPath === path);
    if (!mp) throw new Error(`BuildError: can't find path when optiming nodes!`);
    if (mp.isUsed) {
      if (file.type === `img`) {
        build.images[mp.newI] = mp.file;
      } else {
        build.audio[mp.newI] = mp.file;
      }
    }

    // find parrent & delete current asset, because used or not
    let parent = files;
    for (const sub of path.split(`.`).slice(1, -1)) {
      parent = parent[sub];
    }
    delete parent[path.split(`.`).at(-1)!];
  } else {
    for (const key in file) {
      if (typeof file[key] === `object` && file.type !== `scene`) {
        moveUsedAssets(file[key], `${path}.${key}`);
      }
    }
  }
}

function moveScenes() {
  const scenes = files.Scenes;
  delete scenes.type;
  build.scenes = scenes;
  delete files.Scenes;
}

function deleteEmptyFolders(parent: TObj<any>, key: string, file: TObj<any>) {
  for (const key in file) {
    if (typeof file[key] === `object` && file[key].type === `folder`) {
      if (Object.keys(file[key]).length <= 1) {
        delete file[key];
      } else {
        deleteEmptyFolders(file, key, file[key]);
      }
    }
  }

  // this make sure that file will be deleted if is empty after moving media
  if (Object.keys(file).length <= 1) {
    delete parent[key];
  }
}

type AssetPathOut = { prevPath: string; newI: number; newPath: string; file: any; isUsed: boolean };
