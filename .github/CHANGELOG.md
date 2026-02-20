# Change Log

## TODO

### Core

- if Sprite.color draw box on canvas
- run() `delta += (now - scene.lastTime) / scene.ms` to `... * scene.sth` (performance)
- Animation.start()
- Animation.stop()
- Animation.frames = []
- Collider.collide() // polygon

### Editor (src)

- AudioGrabber.img (icon)
- jsCode.Image.quality: number (0-1)
- jsCode.Audio.quality: number (0-1)
- Drag Nodes to files, files to Nodes (clonning)
- scr.Node.rect can contains only Node.rect
- PathInput (for paths, better optymalization for not use file() while running)

### VirginEngine

- VirginEngine/docs (.md)
- VirginEngine/releases (.md)
- VirginEngine/wdwh add .md imports for creating html or static pages

<br />

## 0.22.0-dev (in development)

- more strict typescript rules
- create VE icon (instead of old DE (Death Engine))
- Physics.addForce() works
- add core.lerp()
- wait to load assets before run scene
- Image optymalizations
- src.Node.rect.{x,y} as Enum<number>
- typed Enum<`string` | `number`>
- implement `wdwh/signal` => less code in codespace
- update `wdwh@1.8.x` => `wdwh@1.10.x`

## 0.21.0 (3 Oct 2025)

- move projects from kubashh/virginengine to `VirginEngine/VirginEngine` (kubashh is initiator for VirginEngine project)
- implement @virgin-engine/wdwh (add 1 file (`src/app/index.tsx`), remove 4 files)

## 0.20.2 (27 Sep 2025)

- move TODO to CHANGELOG
- update Docs
- core type improvements
- move GameTime to scene (to change game speed set scene.time to number)
- remove loadScene, now use scene.load
- src.build remove files types (~1.5% less bundle size)
- add config.performanceInfo Enum(`yes`, `dev`, `no`)
- create EnumInput

## 0.20.1

- src.build optymalize img
- build bundle size -10%
- src.Test useSignal instead of signal

## 0.20.0

- add Audio (create `AudioGrabber`, InputGrabber(FileGrabber))
- update ImageGraber

## 0.19.2

- add `core.Physics.gravity`
- update core.build

## 0.19.1

- rename GameObject to Node
- update events

## 0.19.0

- update ./build
- ./build: bundle css to html (less bytes to download)
- shorter css vars names
- remove css hover class

## 0.18.1

- update ./build
- minify ./build html

## 0.18.0

- implement get/set for Transform position/scale
- add core fn: rand
- update core.Text
- create `ImageGrabber`
- fix loadFile symbol error
- fixed config.fullScreen (if false)
- add License (MIT)
- update core.build ~15% faster (rewrite function)
- core.Sprite use only path to image
- core.Sprite optymalizations
- optymalize images in build (image is src string insead of object)
- better time measurement (Timer class)
- scene as new Scene
- image resize function
- optymalize loadImage (~30% faster)
- remove bun.lock from git
- fix core types

## 0.17.0

- move from nextjs to `bun` (bun.serve, bun.build)
- remove core.bun.lock
- remove core.package.json
- convert core.build to function
- create many core types
- update signals
- add `README.md`
- remove git.sh
- remove nextjs elements (useClient, "use client")
- add core fns: `randInt` `randStr` `randColor`
- add `terser minify_sync` for output optymalization

## 0.16.0 (27 Aug 2025)

- GameObject.name is string instead of fn (100-1000x faster create GameObject)
- delete core.Rect
- core.build replase `fs` functions with Bun.file
- do contributing test
- delete `.version` file
- update nextjs from 15.3.5 to 15.5.2

## 0.15.0 (23 Jul 2025)

- core window events improvements
- export default core components
- core.GameObject fns:
  - clone()
  - get childs()
  - get name()
  - get props()
  - destroy()

## 0.14.0 (17 Jul 2025)

- move `core` to `typescript` (add types.d.ts)
- use `Bun.build` for building `core`
- build.htmlCode improve readability
- fix Test.reload

## 0.13.0 (14 Jul 2025)

- move to `nextjs`
- `tailwindcss` update to `v4`
- update many components

## 0.12.0 (7 Jul 2025)

- move to `typescript` (except core)
- add types
- add `clsx`
- in css create tailwind v4 classes that not supported in v3
- gitignore `bun.lock` `core/node_modules` `core/bun.lock`
- create,, update, use `signal` `useSignal` (state menagement)
- DISABLE_ESLINT_PLUGIN
- remove some css
- moving to tailwindcss (2)
- add GameObject.name

## 0.11.0 (1 Jul 2025)

- seperate `core` from `src` (frontend app)
- bundle core to 1 file
- export core as string
- core improvements
- use `body` as project root instead of main

## 0.10.0 (1 Jul 2025)

- move form React 18.3.1 to `React 19.1.0`
- use `bun` runtime
- move project to `bun create react-app`
- use export default for React components (2)
- move meny components

## 0.9.0 (28 Jun 2025)

- use classical fn instead of arrow fn
- use export default for React components
- use tailwind styles

## 0.8.0 (24 Mar 2025)

- create typeInput's
- create Docs (skielet)
- use `gh actions` for deploying engine
- add `tailwindcss v3`

## 0.7.0 (24 Mar 2025)

- more accurate html tags
- update css
- create Test (testing project)
- rename project from DeathEngine to `VirginEngine` (virginity under death)

## 0.6.0 (21 Mar 2025)

- update ubuild
- update many editor components
- update evrything in lib
- update css

## 0.5.0 (6 Mar 2025)

- simplify project
- update literaly all components
- finally remove node_modules from git

## 0.4.0 (14 Jan 2025)

- create:
  - staticFiles (grab core to 1 file)
  - hooks
  - consts
  - core (build.js.components) with components:
    - Animation (empty)
    - Collider (empty)
    - GameObject
    - Physics (empty)
    - Sprite
    - Transform

## 0.3.0 (28 Dec 2024)

- update build
- crate:
  - many fns
  - utils

## 0.2.0 (27 Dec 2024)

- create build fn (project)
- remove node_modules (.gitignore)

## 0.1.0 (17 Dec 2024)

- create:
  - Hierarchy:
    - GameObject

  - UI:
    - Drag
    - EditorOpctions
    - NameInput
    - Config

  - Components
    - Components
    - NumberInput
    - TextInput
    - Transform

  - EditorOptions

  - hooks

- update Files

## 0.0.1 (23 Nov 2024)

- Init Project with `CreateReactApp` (`js` & `jsx`) and `gh-pages`
- Create:
  - File
  - Files
  - Header
  - Hierarchy
  - Inspector
  - LoadData (loadProject)
  - UI (html position apsolute elements)
    - ContextMenu

  - save (project)
  - load (project)

- Use: `git.sh` script for git commits
