const wait = async (time) => await new Promise((r) => setTimeout(r, time))
const wait0 = async () => new Promise((r) => setTimeout(r))

const now = () => window.performance.now()

const isFirstUpperCase = ([letter]) =>
  `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(letter)

const deepCopy = (data) => JSON.parse(JSON.stringify(data))

const loadScene = (scene) => {
  currentScene = new GameObject(deepCopy(scene))
}
