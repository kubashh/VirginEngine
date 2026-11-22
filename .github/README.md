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

## [Documentation](https://github.com/kubashh/VirginEngine/blob/main/src/lib/docs/docs.md)

## Scripting stardants

### Basic standarts

- no `export default`
- no `import type` (use `import { type X }`)
- classes | ReactComponents - PascalCase
- variables | functions | objects - camelCase

### Project structure

- /core - engine core, contains build function
- /src - editor

### Src import order

1. external libs like `react`
2. enbeded files like `img.png` `package.json`
3. code from `src/lib/assets/`
4. code from `src/lib/` - `core` `idb` `signal` `consts` `util` `hooks`
5. code from `src/lib/typeInput/`
6. code from `src/lib/components/`
7. code from `src/lib/docs/`
8. code from `src/hierarchy/`
9. code from `src/files/`
10. code from `src/inspector/`
11. code from `src/ui/`
