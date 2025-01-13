const wait = async (time) => await new Promise(r => setTimeout(r, time))
const wait0 = async () => new Promise(r => setTimeout(r))

const now = () => window.performance.now()

const isFirstUpperCase = (text) => `ABCDEFGHIJKLMNOPRQSTUWXYZ`.includes(text[0])