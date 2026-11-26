# VirginEngine

Simple JS game engine for fast 2D web games

## Engine

### Components

- `Node` (GameObject, works)
- `Animation` (1% done)
- `AudioVE` (Audio, works)
- `Collider` (1% done)
- `Physics` (20% done)
- `Sprite` (works)
- `Text` (50% done)

## [Documentation](https://github.com/kubashh/VirginEngine/blob/main/editor/lib/assets/docs.md)

## Scripting stardants

### Basic standarts

- no `export default`
- no `import type { X }` (use `import { type X }`)
- classes | ReactComponents - PascalCase
- variables | functions | objects - camelCase

### Project structure

- /build - build core, build engine, custom plugins
- /core - engine core
- /editor - editor

### `editor` import order

1. external libs like `react`
2. enbeded files like `img.png` `package.json`
3. code from `editor/lib/assets/`
4. code from `editor/lib/` - `core` `idb` `signal` `consts` `util` `hooks`
5. code from `editor/lib/typeInput/`
6. code from `editor/lib/components/`
7. code from `editor/lib/docs/`
8. code from `editor/hierarchy/`
9. code from `editor/files/`
10. code from `editor/inspector/`
11. code from `editor/ui/`

### Only html tags used in project (because of styles oprimization and code consistency)

- `div` `html` `head` `body` `iframe` `a` `meta` `title` `link` `script` `header` `main` `h1` `h2` `h3` `button` `input` `textarea` `img` `label` `section` `select` `option` `span` `code` `pre` `canvas` `audio`
