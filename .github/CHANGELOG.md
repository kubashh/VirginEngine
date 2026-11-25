# Change Log

Tags using in this changelog:

- **breaking** - breaking change
- **compatibility** - compatibility change
- **fixed** - fixed bug/error
- **add** - add feature
- **optimize** - add optimization
- **improve** - improve existing feature without breaking
- **codespace** - codespace changes

## TODO

### Core

<!-- - WebGL, WebGL2 for render (https://wikis.khronos.org/webgl/Getting_a_WebGL_Implementation, https://registry.khronos.org/webgl/specs/latest/2.0/) -->
<!-- - audio making at comptime src => f(src) -->
<!-- - build: add static + server export build-in -->
<!-- - add multiplayer -->

- if Sprite.color draw box on canvas
- Sprite is Box (color) or image
- Animation: start(), stop(), frames = []
- Collider.collide() // polygon or external
- Node: implement events: onClick, onHover, onMouseExit...
- Node subscribe update, render or even physics update, sprite render
- render via special unit same cross-platform (not pixels like now)
- Node: make children array
- use number (id) as identifier, not string name, complitly strip string names.
  so compile sth.parent.name to id or reference or sth[parent_id][name_id]
- make scenes, sprites and audio independent values instead 3 collections. like `const sprite_1 = "src"`

### Editor (src)

<!-- - jsCode.Image.quality: number (0-1) -->
<!-- - jsCode.Audio.quality: number (0-1) -->
<!-- - pack/unpack js object <==> files. it means drag folder to open the project or file -->
<!-- - css minification minify variables names -->

- Drag Nodes to files, files to Nodes (clonning or prefab-like)
- src.Node.rect can contains only Node.rect
- add to every file and object or create id record specific id for reference reasons
- Sprite: use sprite or color (good for prototyping)
- Editor: mobile layout full support
- Img/Audio tests
- add block of code like Scratch as option
- add build notification with build size and html, js and assets size
- add auto changing paths for assets when renamed and warning for deletion when used
- fix test canvas when width / ratio > height \* ratio
- add testing js (direct hydration) or html
- add config.lockAspectRatio for consistency
- add project compressing
- braking: change src.components Script to be `{ code: "MY_CODE" }` insteadof `MY_CODE`

<br />

## 0.26.1-dev (in development)

- **fixed** change editor version errors of components missing property & remove legacy properties
- **add** Audio.loop
- **add** Text.fontSize
- **fixed** `Enum<string>` when building
- **add** Text.textAlign and Text.textBaseline

## 0.26.0 (22 Nov 2022) (https://github.com/kubashh/VirginEngine/commit/df3a7065c303929959f42d3d5afe271b3a8574a3, compiled 813.444 kB, 812.891 kB (0.439 kB (html) 16.269 kB (css) 760.667 kB (js) 35.516 kB (media)))

- **optimize** add css minification (inline some vars and exec most calc). bundle size -0.9kB
- **fixed** test canvas height on chromium based browsers
- **optimize** css minification (inline more vars)
- **fixed** chromium play sound error `NotSupportedError: The element has no supported sources.`
- **fixed** throw Error when restarting testing project (~30%, just igmore it - in this case is good solution)
- **add** add config option to emit js only with canvas hydration
- **breaking** `performanceInfo` (Enum) to `devPerformanceInfo` (boolean)
- **codespace** add tailwind classes formatting
- **optimize** remove custom `clsx` function
- **codespace** **fixed** printed size info when building whole engine
- **optimize** add css minification remove unused variables (-1.804 kB), make sure that variable is defined once
- **optimize** core.AudioVE uses ES2025 `Uint8Array.fromBase64` so we have less code and faster
- **fixed** docs colors after line comment `//`
- **optimize** remove info prop from build whole engine
- **improve** better info log when building project
- **optimize** buildValidCore uses ES2024 `Array.fromAsync`
- **fixed** build project crash on enum (eg. Text element)
- **improvements** Docs improvements
- **codespace** remove `virginEngineVerion` from build project function
- **codespace** **optimize** move `template.html` directly to `build.js`
- **codespace** move docs to lib
- **optimize** remove classes from build project (-0.9 kB)
- **optimize** add css minification transpiling colors oklch => hex (-0.3 kB), remove empty theme layer (-0.02 kB)
- **fixed** **optimize** fixed css minification tralling zeros in math like `1.000rem` or `0.5rem` (correct `1rem` and `.0rem`) (-0.1 kB)
- **optimize** use terser building whole app (-24.5 kB)
- **optimize** build add remove stupid \_\_REACT_DEVTOOLS_GLOBAL_HOOK\_\_ (-1.2 kB)
- **optimize** add css minification simplify var(--tw-leading,1.333) like & remove --tw-border-style
- **optimize** use cudtom `preflight.css` (-1 kB)

## 0.25.0 (13 Nov 2026) (https://github.com/kubashh/VirginEngine/commit/781c016298558b2d864cb604b833918aa0a7e36a, compiled 840.293 kB, 839.789 kB (0.439 kB (html) 20.775 kB (css) 816.656 kB (js) 1.919 kB (media)))

- **fixed** builded html new line before `</style>`
- **codespace** **add** printing size info when building whole engine, I made this to optimize css and js in the future
- **optimize** core optimize VirginEngine.loadAssets - no recursion
- **codespace** core move types from `types.d.ts`
- **codespace** simplifies core build api
- **optimize** add build preprocessing optimization (remove unused assets)
- **optimize** make other core.build code improvements and optimizations (like renaming, grouping)
- **optimize** add optimization extract scenes, images and audio from files to seperate objects (quicker access to elements)
- **optimize** remove files object from runtime
- **fixed** Audio works correctly
- **add** core Audio.loop and Audio.currentTime
- **fixed** Audio.play before user click
- **improve** add asset InpactSound
- **improve** improve docs
- **fixed** fixed scale for new Node (1 not 0)
- **fixed** fixed loading project files
- **codespace** **optimize** remove `safeidb` package and instead of it use simple indexedDB wrapper
- **codespace** `README.md` core standarts updates
- **optimize** remove Button component
- **codespace** make `src/lib` `components` `TypeInput` independent
- **codespace** importing changes

## 0.24.0 (10 Nov 2026) (https://github.com/kubashh/VirginEngine/commit/e4c0d2a5d71dd14c3a78ef484c949e49c15ae1d0, compiled 807.061 kB, 806.557 kB (0.445 kB (html) 20.753 kB (css) 783.44 kB (js) 1.919 kB (media)))

- **optimize** remove `localforage` and use `safeidb` (kubashh lib) (compiled -28kB)
- **fixed** fixed build --compile file name (remove string quotes)
- **codespace** core and src passed bun ckeck
- **codespace** **fixed** fixed dev script: editing files in core do not trigger reload
- **optimize** build preprocessing optimization (simplify media access, remove empty folders)
- **codespace** types expicitness

## 0.23.1 (27 Oct 2026) (https://github.com/kubashh/VirginEngine/tree/e92eb547584547278fd39d8231b70c49e597ec53, compiled 833.9 kB)

- **add** **improve** Docs update styles and add styles to scripts
- **codespace** more explicit types
- **codespace** move all signals to functions as API
- **add** add project engineVersion validaton before open project (load project safely)
- **fixed** new project starting data is new
- **fixed** fixed editor.create scene
- **optimize** core optimalizations
- **optimmize** page bundle css into html
- **codespace** refresh localhost when `core` directory changed
- **optimize** core less js sugar magic
- **optimize** core loadData less object allocations
- **optimize** code bundle Time to VirginEngine
- **fixed** fixed Notifications keys
- **fixed** fixed default parent script
- **optimize** bundle scripts to two file
- **codespace** scripts hide changes in `index.html`, so git don't have trash commits
- **fixed** fixed NameInput empty string, so string can be empty, but don't call callback functions
- **optimize** remove LoadData localStorage cache and bundle TDLProject to class

## 0.23.0 (26 Sep 2026) (https://github.com/kubashh/VirginEngine/commit/ab89386298ac070c7ae658b0dbb69e333d18071c)

- **optimize** set title in comptime
- **improve** core make engine static class instead of functions collection
- **codespace** remove all export default, more clarity
- **add** add docs basic styles
- **codespace** core extract classes to classes directory
- **improve** core move static methods to VirginEngine static class (like loadScene)
- **improve** core loadScene via name (not reference)
- **optimize** LoadData projects info set in localStorage; projects in localforage
- **add** add Notifications
- **fixed** fixed StringInput again
- **fixed** fixed building without performance info
- **improve** project structure pack metadata to one containter
- **breaking** change scripting type from declarative to class-based

## 0.22.2 (15 Sep 2026) (https://github.com/kubashh/VirginEngine/commit/863278be4897e5028cd8122ab8e30a556046384f)

- **improve** remove `"` `"` from string in StringInput
- **codespace** move Docs to UI
- **add** fill Docs with content
- **improve** LoadData modernized & minify design
- **codespace** minified `any` type and `!` usage; remove Any<T> & F<T> types
- **add** update document title to current project
- **add** add support for dropping project into LoadData
- **codespace** bundle wdwh into src (editor)

## 0.22.1 (11 Aug 2026) (https://github.com/kubashh/VirginEngine/commit/2c62260a5d7b228478c9aa0e59759bcb049dc94f)

- **improve** **optimize** LoadData update modified date dynamicly, performance benefits, modern design
- **improve** Editor requiers width >722px (before >920px) (editor) >300px (before >700px) (LoadData),
  height >400px (technically any height)
- **add** LoadData sort projects by last modified date
- **improve** implement Window header nested options (dropdown menu)
- **improve** LoadData change projects names works only via LoadData (not with config like before)
- **improve** Editor change scrollbar look
- **fixed** fixed Grab image when run error: `Uncaught SyntaxError: expected expression, got '}'`
- **codespace** better core api design
- **codespace** remove compiled core from git
- **fixed** fixed build error (crash when performanceInfo was set to false)
- **fixed** fixed clicking LoadData vertically doesn’t hide the loaded data
- **fixed** fixed files ContextMenu copy file path into clipboard
- **improve** update ContextMenu style
- **fixed** fixed loading project from local files
- **add** add loading project to projects list
- **codespace** code expicit any usage in editor

## 0.22.0 (30 Apr 2026) (https://github.com/kubashh/VirginEngine/commit/b28bd4592ff6b042999b6475da241a0140bd1ce5)

- **codespace** more strict typescript rules
- **improve** create VE icon (instead of old DE (Death Engine - previous project name))
- **add** Physics.addForce() works
- **add** add core.lerp()
- **improve** wait to load assets before run scene
- **optimize** Image optymalizations
- **improve** src.Node.rect.{x,y} as Enum<number>
- **improve** typed Enum<`string` | `number`>
- **improve** update `wdwh@1.8.x` => `wdwh@1.12.x` and implement `wdwh/signal`and `wdwh` `clsx` instead of looked clsx
- **optimize** DragData avoid double refresh of component
- **codespace** implemented useCreateSignal (removed deprecated_useSignal)
- **fixed** fixed unnecessary showing of editor.DragData when click
- **add** Loading/Saving projects in InexedDB works (no files needed)
- **improve** Modernized LoadData, add project modified date
- **add** display engine version

## 0.21.0 (3 Oct 2025) (https://github.com/kubashh/VirginEngine/commit/b123e9f1fc0647a5d22ba8442063a8a6426d702f#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519)

- **codespace** move projects from kubashh/virginengine to `VirginEngine/VirginEngine`
  (kubashh is initiator for VirginEngine project)
- **codespace** implement @virgin-engine/wdwh (add 1 file (`src/app/index.tsx`), remove 4 files)

## 0.20.2 (27 Sep 2025)

- **codespace** move TODO to CHANGELOG
- **improve** update Docs
- **codespace** core type improvements
- **improve** move GameTime to scene (to change game speed set scene.time to number)
- **improve** remove loadScene, now use scene.load
- **optimize** src.build remove files types (~1.5% less bundle size)
- **add** add config.performanceInfo Enum(`yes`, `dev`, `no`)
- **add** create EnumInput

## 0.20.1 (x x 2025)

- **optimize** src.build optymalize img
- **optimize** build bundle size -10%
- **codespace** src.Test useSignal instead of signal

## 0.20.0 (x x 2025)

- **add** add Audio (create `AudioGrabber`, InputGrabber(FileGrabber))
- **improve** update ImageGraber

## 0.19.2 (x x 2025)

- **add** add Physics.gravity
- **improve** update core.build

## 0.19.1 (x x 2025)

- **improve** rename GameObject to Node
- **improve** update events

## 0.19.0 (x x 2025)

- **improve** update build
- **optimize** build bundle css to html (less bytes to download)
- **codespace** shorter css vars names
- **improve** remove css hover class

## 0.18.1 (x x 2025)

- **improve** update build
- **optimize** minify build html

## 0.18.0 (x x 2025)

- **add** implement get/set for Transform position/scale
- **add** add core fn: rand
- **improve** update core.Text
- **add** create `ImageGrabber`
- **fixed** fixed loadFile symbol error
- **fixed** fixed config.fullScreen (if false)
- **codespace** add License (MIT)
- **optimize** update core.build ~15% faster (rewrite function)
- **breaking** core.Sprite use only path to image
- **optimize** core.Sprite optimizations
- **optimize** optimize images in build (image is src string insead of object)
- **improve** better time measurement (Timer class)
- **improve** scene as new Scene
- **add** image resize function
- **optimize** optimize loadImage (~30% faster)
- **codespace** remove bun.lock from git
- **fixed** fixed core types

## 0.17.0 (x x 2025)

- **codespace** move from nextjs to `bun` (bun.serve, bun.build)
- **codespace** remove core.bun.lock
- **codespace** remove core.package.json
- **codespace** convert core.build to function
- **improve** create many core types
- **improve** update signals
- **codespace** add `README.md`
- **codespace** remove git.sh
- **codespace** remove nextjs elements (useClient, "use client")
- **add** add core fns `randInt` `randStr` `randColor`
- **add** add `terser minify_sync` for output optymalization

## 0.16.0 (27 Aug 2025)

- **optimize** GameObject.name is string instead of getter (100-1000x faster create GameObject)
- **optimize** delete core.Rect
- **codespace** core.build replase `fs` functions with Bun.file
- **codespace** do contributing test with `@Dabdaw0`
- **codespace** delete `.version` file
- **codespace** update nextjs from 15.3.5 to 15.5.2

## 0.15.0 (23 Jul 2025)

- **improve** core window events improvements
- **codespace** export default core components
- **add** core.GameObject fns `clone()` `get childs()` `get name()` `get props()` `destroy()`

## 0.14.0 (17 Jul 2025)

- **codespace** move `core` to `typescript` (add types.d.ts)
- **codespace** use `Bun.build` for building `core`
- **codespace** build.htmlCode improve readability
- **fixed** fixed Test.reload

## 0.13.0 (14 Jul 2025)

- **codespace** move to `nextjs`
- **codespace** `tailwindcss` update to `v4`
- **improve** update many components

## 0.12.0 (7 Jul 2025)

- **codespace** move to `typescript` (except core)
- **codespace** add types
- **codespace** add `clsx`
- **codespace** **improve** in css create tailwind v4 classes that not supported in v3
- **codespace** gitignore `bun.lock` `core/node_modules` `core/bun.lock`
- **improve** create, update, use `signal` `useSignal` (state menagement)
- **improve** DISABLE_ESLINT_PLUGIN
- **codespace** remove some css
- **codespace** moving to tailwindcss pt. 2
- **add** add GameObject.name

## 0.11.0 (1 Jul 2025)

- **codespace** seperate `core` from `src` (frontend app)
- **add** bundle core to 1 file
- **improve** export core as string
- **improve** core improvements
- **improve** use `body` as project root instead of main

## 0.10.0 (1 Jul 2025)

- **codespace** update React `18.3.1` => `React 19.1.0`
- **codespace** use `bun` runtime (fast, so good)
- **codespace** move project to `bun create react-app`
- **codespace** use export default for React components (2)
- **codespace** move many components

## 0.9.0 (28 Jun 2025)

- **codespace** use classical fn instead of arrow fn
- **codespace** use export default for React components
- **codespace** use tailwind styles

## 0.8.0 (24 Mar 2025)

- **add** create typeInput's
- **add** create Docs (skielet)
- **codespace** use `gh actions` for deploying engine
- **codespace** add `tailwindcss v3`

## 0.7.0 (24 Mar 2025)

- **improve** more accurate html tags
- **improve** update css
- **add** create Test (testing project)
- **codespace** **breaking** rename project from DeathEngine to `VirginEngine` (virginity under death)

## 0.6.0 (21 Mar 2025)

- **improve** update build
- **improve** update many editor components
- **improve** update every file in lib
- **improve** update css

## 0.5.0 (6 Mar 2025)

- **improve** simplify project
- **improve** update literaly all components
- **codespace** finally remove node_modules from git

## 0.4.0 (14 Jan 2025)

- **add** create staticFiles (grab core to 1 file)
- **add** create hooks
- **add** create consts
- **add** create core (build.js.components) with components `Animation (empty)` `Collider (empty)` `GameObject` `Physics (empty)` `Sprite` `Transform`

## 0.3.0 (28 Dec 2024)

- **improve** update build
- **add** crate many fns/utils

## 0.2.0 (27 Dec 2024)

- **add** create build fn (project)
- **codespace** remove node_modules (.gitignore)

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

- Init Project with `create-react-app` (`js` & `jsx`) and `gh-pages`
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
