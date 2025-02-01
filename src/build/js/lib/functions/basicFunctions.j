const wait = async (time) => await new Promise(r => setTimeout(r, time))
const wait0 = async () => new Promise(r => setTimeout(r))

const now = () => window.performance.now()

const isFirstUpperCase = (text) => `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(text[0])

const deepCopy = (data) => JSON.parse(JSON.stringify(data))

const loadScene = (scene) => currentScene = deepCopy(scene)