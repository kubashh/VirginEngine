export const core = `const ctx = document.body.children[0].getContext(\`2d\`)
function onresize() {
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight
}
window.addEventListener(\`resize\`, onresize)
onresize()
const files = \`REPLACE_FILES\`
let scene = {}
const events = {}
const eventsHover = {}
window.addEventListener(\`mousedown\`, () => (eventsHover.click = true))
window.addEventListener(\`mouseup\`, () => delete eventsHover.click)
window.addEventListener(\`click\`, () => (events.click = true))
window.addEventListener(\`keydown\`, ({ key }) => (events[key] = eventsHover[key] = true))
window.addEventListener(\`keyup\`, ({ key }) => delete eventsHover[key])
window.addEventListener(\`contextmenu\`, (e) => {
e.preventDefault()
!document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen()
})
const GameTime = {
ms: 1,
value: 1,
lastTime: 0,
get() {
return GameTime.value
},
set(newTime) {
GameTime.value = newTime
GameTime.ms = 1000 / (60 * GameTime.value)
GameTime.lastTime = performance.now()
},
}
const Log = { updates: 0, frames: 0, framesTemp: 0 }
const gameObjects = []
class GameObject {
toUpdate = []
toRender = []
constructor({ parent, transform, rect, text, sprite, start, update, render, ...rest }) {
if (parent) this.parent = parent
this.transform = new Transform(transform, this)
if (text) this.text = new Text(text, this, rect)
if (sprite) this.sprite = new Sprite(sprite, this)
for (const key in rest) {
if (isChildKey(key)) {
this[key] = new GameObject({ ...rest[key], parent: this })
} else {
this[key] = typeof rest[key] === \`function\` ? rest[key].bind(this) : rest[key]
}
}
if (update) this.toUpdate.push(update.bind(this))
if (render) this.toRender.push(render.bind(this))
if (start) {
this.start = start.bind(this)
this.start()
}
gameObjects.push(this)
}
get childs() {
const childs = []
for (const key in this) {
if (isChildKey(key)) childs.push(this[key])
}
return childs
}
get name() {
for (const key in this.parent) {
if (this === this.parent[key]) return key
}
}
get props() {
const newObj = {
start: this?.start,
update: this?.update,
transform: {
position: this.position,
rotation: this.rotation,
scale: this.scale,
},
}
return deepCopy(newObj)
}
static destroy(obj) {
for (const child of obj.childs) GameObject.destroy(child)
const { parent } = obj
let parentKey = \`\`
for (const key in obj.parent) {
if (obj.parent[key] === obj) {
parentKey = key
break
}
}
for (const key in obj) delete obj[key]
gameObjects.splice(gameObjects.indexOf(obj))
delete parent[parentKey]
}
}
class Transform {
gameObject = null
positionX = 0
positionY = 0
rotationZ = 0
scaleX = 1
scaleY = 1
constructor(props, gameObject) {
if (props) {
this.gameObject = gameObject
const { position, rotation, scale, rect } = props
if (rect) this.rect = rect
this.position = position
this.rotation = rotation
this.scale = scale
gameObject.position = position
gameObject.rotation = rotation
gameObject.scale = scale
} else {
this.readOnly = true
}
}
get position() {
return { x: this.positionX, y: this.positionY }
}
set position({ x, y }) {
if (this.readOnly) {
alert(\`PROGRAMMER, you can't chage "readOnly" position\`)
return
}
for (const child of this.gameObject.childs) {
child.transform.position = {
x: child.transform.positionX - this.positionX + x,
y: child.transform.positionY - this.positionY + y,
}
}
this.positionX = x
this.positionY = y
}
get rotation() {
return { z: this.rotationZ }
}
set rotation({ z }) {
if (this.readOnly) {
alert(\`PROGRAMMER, you can't chage "readOnly" rotation\`)
return
}
while (z < 0) {
z += 360
}
while (z > 360) {
z -= 360
}
for (const child of this.gameObject.childs) {
let newRot = child.transform.rotationZ - this.rotationZ + z
if (newRot < 0) {
newRot += 360
} else if (newRot > 360) {
newRot -= 360
}
child.transform.rotation = { z: newRot }
}
this.rotationZ = z
}
get scale() {
return { x: this.scaleX, y: this.scaleY }
}
set scale({ x, y }) {
if (this.readOnly) {
alert(\`PROGRAMMER, you can't chage "readOnly" scale\`)
return
}
for (const child of this.gameObject.childs) {
child.transform.scale = {
x: (child.transform.scaleX / this.scaleX) * x,
y: (child.transform.scaleY / this.scaleY) * y,
}
}
this.scaleX = x
this.scaleY = y
}
}
class Collider {
constructor() {}
}
class Physics {
constructor() {}
}
class Sprite {
constructor({ color }, gameObject) {
this.gameObject = gameObject
this.color = color
gameObject.toRender.push(this.render.bind(this))
}
render() {
draw({
x: this.gameObject.position.x,
y: this.gameObject.position.y,
w: this.gameObject.scale.x,
h: this.gameObject.scale.y,
color: this.color,
})
}
}
class Animation {
constructor() {}
}
class Text {
value = \`\`
rect = undefined
transform = undefined
constructor({ value }, gameObject, rect) {
this.transform = gameObject.transform
this.value = value
this.textBaseline = Text.textBaseline[rect.x]
this.textAlign = Text.textAlign[rect.y]
gameObject.toRender.push(this.render.bind(this))
}
render() {
draw({
text: this.value,
...this.transform.position,
fillStyle: \`white\`,
font: \`\${this.transform.scale.y}px serif\`,
textBaseline: this.textBaseline,
textAlign: this.textAlign,
})
}
static textBaseline = [\`top\`, \`middle\`, \`bottom\`]
static textAlign = [\`left\`, \`center\`, \`right\`]
}
async function wait(time) {
await new Promise((r) => setTimeout(r, time))
}
async function wait0() {
await new Promise((r) => setTimeout(r))
}
function isChildKey(text) {
return \`ABCDEFGHIJKLMNOPRQSTUWXYZ\`.includes(text[0])
}
function deepCopy(data) {
if (Array.isArray(data)) {
return data.reduce((prev, val) => [...prev, deepCopy(val)], [])
}
if (typeof data === \`object\`) {
const newObj = {}
for (const key in data) {
newObj[key] = deepCopy(data[key])
}
return newObj
}
return data
}
function clone(obj, parent) {
const name = obj.name
let newName = name
let i = 0
while (parent[newName]) {
newName = \`\${name}\${i}\`
i++
}
parent[newName] = new GameObject({ ...obj.props, parent })
}
function loadScene(newScene) {
gameObjects.length = 0
scene = new GameObject(deepCopy(newScene))
for (const key in events) delete events[key]
for (const key in eventsHover) delete eventsHover[key]
}
function draw({ text, color, x, y, w, h, ...props }) {
ctx.save()
for (const key in props) {
ctx[key] = props[key]
}
if (text) ctx.fillText(text, x, y)
if (color) {
ctx.fillStyle = color
ctx.fillRect(x, y, w, h)
}
ctx.restore()
}
function drawBoxMiddle(x, y, w, h, color) {
if (color) ctx.fillStyle = color
ctx.fillRect(x, y, w, h)
}
async function run() {
GameTime.set(1)
requestAnimationFrame(render)
let timer = performance.now()
let updates = 0
let delta = 0
while (true) {
const now = performance.now()
delta += (now - GameTime.lastTime) / GameTime.ms
if (delta > 60) delta = 60
GameTime.lastTime = now
while (delta >= 1) {
update()
updates++
delta--
}
if (now - timer > 1000) {
timer += 1000
Log.updates = updates
Log.frames = Log.framesTemp
updates = 0
Log.framesTemp = 0
}
await wait0()
}
}
function update() {
for (const obj of gameObjects) {
for (const f of obj.toUpdate) f()
}
for (const key in events) delete events[key]
}
function render() {
ctx.fillStyle = \`black\`
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
for (const obj of gameObjects) {
for (const f of obj.toRender) f()
}
const props = {
x: 8,
y: 8,
fillStyle: \`white\`,
font: \`22px serif\`,
textAlign: \`left\`,
textBaseline: \`top\`,
}
draw({ text: \`Update \${Log.updates}\`, ...props })
draw({ text: \`Render \${Log.frames}\`, ...props, y: 38 })
Log.framesTemp++
requestAnimationFrame(render)
}
loadScene(\`REPLACE_PATH_TO_MAIN_SCENE\`)
run()`