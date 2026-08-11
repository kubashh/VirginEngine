import audioIconSrc from "./AudioIcon.png";

export const boxSprite = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAdnJLH8AAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAA9JREFUCB0BBAD7/wD///8F/gL+A30ZxgAAAABJRU5ErkJggg==`;

export const happyBoxSprite = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAAXNSR0IB2cksfwAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+oEBBIdGhxFQasAAAC2SURBVBjThY8xCoNAFET/xiBqYa0L3sXWK3gowSt4A89gJQjWgttY/F3LhY+N4KRIE5Mir5liijejANCd4ziIKEkSInqe59k0TVEUdV1ba51zYRgOw+CcK8vyMY5j3/fTNBFRnudZlolImqbXdXnviZmNMcyMO8YYAOrX/cnjHSIiIl/dPM9PIuq6blkWAN57Zg6CQGu973scxwqAtbZt223b1nUFoLVWSlVVFUXRzf35+M2faS94cHkj8YCVlgAAAABJRU5ErkJggg==`;

export { audioIconSrc };

export function defaultNode({ position, rotation, scale, ...rest }: TObj<any> = {}) {
  return Object.keys(rest).reduce((prev, key) => ({ [key]: rest[key], ...prev }), {
    type: `node`,
    transform: {
      position: position || { x: 0, y: 0 },
      rotation: rotation || 0,
      scale: scale || { x: 1, y: 1 },
    },
  });
}
