# Change Log

## 0.18.x

- implement get/set for Transform position/scale
- add core fn: rand
- update core.Text
- create ImageGrabber

TODO:
https://github.com/kubashh/virginengine/commits/main/?after=e8e248083e8707d61f0aea03d519c1f53c8d2a7e+34
remove unnessesary window if statments; move saveProject to utils; move window events to consts

## 0.17.x

- move from nextjs to `bun` (bun.serve, bun.build)
- remove core.bun.lock
- remove core.package.json
- convert core.build to function
- create many core types
- update signals
- add `README.md`
- remove git.sh
- remove nextjs elements (useClient, "use client")
- add core fns: randInt, randStr, randHex, randColor
- add terser minify_sync for output optymalization

## 0.16.x

- GameObject.name is string instead of fn (100-1000x faster create GameObject)
- delete core.Rect
- core.build replase `fs` functions with Bun.file
- do contributing test
- delete `.version` file
- update nextjs from 15.3.5 to 15.5.2

## 0.15.x

- core window events improvements
- export default core components
- core.GameObject fns:
  - clone()
  - get childs()
  - get name()
  - get props()
  - destroy()

## 0.14.x

- use `Bun.build` for building `core`
- move `core` to `typescript` (add types.d.ts)
- build.htmlCode improve readability
- fix Test.reload

## 0.13.x

- move to `nextjs`
- `tailwindcss` update to `v4`
- update many components

## 0.12.x

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

## 0.11.x

- seperate core from `src` (frontend app)
- bundle core to 1 file
- export core as string
- core improvements
- use `body` as project root instead of main

## 0.10.x

- move form React 18.3.1 to `React 19.1.0`
- use `bun` runtime
- move project to `bun create react-app`
- use export default for React components (2)
- move meny components

## 0.9.x

- use classical fn instead of arrow fn
- use export default for React components
- use tailwind styles

## 0.8.x

- create typeInput's
- create Docs (skielet)
- use `gh actions` for deploying engine
- add `tailwindcss v3`

## 0.7.x

- more accurate html tags
- update css
- create Test (testing project)
- rename project from DeathEngine to VirginEngine (virginity under death)

## 0.6.x

- update ubuild
- update many editor components
- update evrything in lib
- update css

## 0.5.x

- simplify project
- update literaly all components
- finally remove node_modules from git

## 0.4.x

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

## 0.3.x

- update build
- crate:

  - many fns
  - utils

## 0.2.x

- create build fn (project)
- remove node_modules (.gitignore)

## 0.1.x

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

## 0.0.x

- Init Project with CreateReactApp (js & jsx) and gh-pages
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
