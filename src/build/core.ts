export const core = `class Transform {
gameObject;
p;
rz = 0;
s;
constructor(props, gameObject) {
this.gameObject = gameObject;
this.p = new GSXY(props?.position);
if (props?.rotation)
this.rotation = props?.rotation;
this.s = new GSXY(props?.scale || { x: 1, y: 1 });
if (!gameObject)
console.log(\`kjjlhfdjfs\`);
gameObject.position = this.position;
gameObject.rotation = this.rotation;
gameObject.scale = this.scale;
if (props && gameObject) {} else {
this.readonly = true;
}
}
get position() {
return this.p;
}
set position({ x, y }) {
if (this.readonly)
throw alert(\`PROGRAMMER, you can't chage "readOnly" position\`);
for (const child of this.gameObject.childs) {
child.transform.position = {
x: child.transform.p.x - this.p.x + x,
y: child.transform.p.y - this.p.y + y
};
}
this.p.x = x;
this.p.y = y;
}
get rotation() {
return this.rz;
}
set rotation(z) {
if (this.readonly)
throw alert(\`PROGRAMMER, you can't chage "readOnly" rotation\`);
z %= 360;
if (z < 0)
z += 360;
for (const child of this.gameObject.childs) {
child.transform.rotation.z = child.rotation.z - this.rz + z;
}
this.rz = z;
}
get scale() {
return this.s;
}
set scale({ x, y }) {
if (this.readonly)
throw alert(\`PROGRAMMER, you can't chage "readOnly" scale\`);
for (const child of this.gameObject.childs) {
child.transform.scale = {
x: child.transform.s.x / this.s.x * x,
y: child.transform.s.y / this.s.y * y
};
}
this.s.x = x;
this.s.y = y;
}
get props() {
return {
position: {
x: this.position.x,
y: this.position.y
},
rotation: this.rotation,
scale: {
x: this.scale.x,
y: this.scale.y
}
};
}
}
class GSXY {
vx;
vy;
constructor(props) {
this.vx = props?.x || 0;
this.vy = props?.y || 0;
}
get x() {
return this.vx;
}
set x(v) {
this.vx = v;
}
get y() {
return this.vy;
}
set y(v) {
this.vy = v;
}
}
async function wait(time) {
await new Promise((r) => setTimeout(r, time));
}
function isChildKey(text) {
return alphabet.includes(text.at(0));
}
function deepCopy(data) {
if (Array.isArray(data)) {
return data.reduce((prev, val) => [...prev, deepCopy(val)], []);
}
if (typeof data === \`object\`) {
const newObj = {};
for (const key in data) {
if ([\`parent\`, \`toUpdate\`, \`toRender\`, \`gameObject\`].includes(key))
continue;
newObj[key] = deepCopy(data[key]);
}
return newObj;
}
return data;
}
function loadScene({ name, ...newScene }) {
scene.load(deepCopy(newScene), name);
onresize();
}
function draw({ text, color, x, y, w, h, ...props }) {
ctx.save();
for (const key in props) {
ctx[key] = props[key];
}
if (text)
ctx.fillText(text, x, y);
if (color) {
ctx.fillStyle = color;
ctx.fillRect(x, y, w, h);
}
ctx.restore();
}
function drawBoxMiddle(x, y, w, h, color) {
draw({ x: x - w / 2, y: y - h / 2, w, h, color });
}
function onresize() {
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
}
function randInt(min, max) {
return Math.floor(max ? Math.random() * (max - min) + min : Math.random() * min);
}
function randStr(n = 1) {
let str = \`\`;
for (let i = 0;i < n; i++) {
str += allowedNameChars.at(randInt(allowedNameChars.length));
}
return str;
}
function randHex() {
const n = randInt(16);
return n < 10 ? String(n) : String.fromCharCode(45 + n);
}
function randColor() {
return \`#\${randHex()}\${randHex()}\${randHex()}\`;
}
function Sprite(props, gameObject) {
if (props.imagePath)
return new PathSprite(props, gameObject);
return new BoxSprite(props, gameObject);
}
class BoxSprite {
gameObject;
color;
constructor({ color }, gameObject) {
this.gameObject = gameObject;
this.color = color;
gameObject.toRender.push(this.render.bind(this));
}
render() {
drawBoxMiddle(this.gameObject.position.x, this.gameObject.position.y, this.gameObject.scale.x, this.gameObject.scale.y, this.color);
}
get props() {
return {
color: this.color
};
}
}
class PathSprite {
gameObject;
imagePath;
constructor({ imagePath }, gameObject) {
this.gameObject = gameObject;
this.imagePath = imagePath;
gameObject.toRender.push(this.render.bind(this));
throw Error(\`PathSprite, camming soon!\`);
}
render() {}
get props() {
return {
imagePath: this.imagePath
};
}
}
var textBaseline = [\`top\`, \`middle\`, \`bottom\`];
var textAlign = [\`left\`, \`center\`, \`right\`];
class Text {
value;
rect;
transform;
textBaseline;
textAlign;
constructor({ value }, gameObject) {
this.transform = gameObject.transform;
this.value = value;
if (gameObject.rect) {
this.rect = gameObject.rect;
this.textBaseline = textBaseline[this.rect.x];
this.textAlign = textAlign[this.rect.y];
}
gameObject.toRender.push(this.render.bind(this));
}
render() {
draw({
text: this.value,
...this.transform.position,
fillStyle: \`white\`,
font: \`\${this.transform.scale.y}px serif\`,
textBaseline: this.textBaseline,
textAlign: this.textAlign
});
}
get props() {
return {
value: this.value
};
}
}
function Collider() {
return new Coll;
}
class Coll {
constructor() {}
}
var keywords = [\`toUpdate\`, \`toRender\`, \`parent\`, \`position\`, \`rotation\`, \`scale\`];
class GameObject {
toUpdate = [];
toRender = [];
name;
parent;
start;
update;
render;
transform;
position;
rotation;
scale;
rect;
text;
sprite;
collider;
constructor({ parent, transform, rect, text, sprite, collider, start, update, render, ...rest }, name) {
this.name = name;
this.parent = parent || {};
if (parent)
this.parent[this.name] = this;
this.transform = new Transform(transform, this);
if (rect)
this.rect = rect;
if (text)
this.text = new Text(text, this);
if (sprite)
this.sprite = Sprite(sprite, this);
if (collider)
this.collider = Collider;
for (const key in rest) {
this[key] = isChildKey(key) ? new GameObject({ ...rest[key], parent: this }, key) : typeof rest[key] === \`function\` ? rest[key].bind(this) : rest[key];
}
if (start)
this.start = start;
if (update) {
this.update = update;
this.toUpdate.push(() => update.bind(this)());
}
if (render) {
this.render = render;
this.toRender.push(() => render.bind(this)());
}
gameObjects.push(this);
}
get childs() {
return Object.keys(this).reduce((prev, key) => isChildKey(key) ? [...prev, this[key]] : prev, []);
}
get props() {
const newObj = {
start: this?.start,
update: this?.update,
transform: this.transform.props,
rect: this.rect,
sprite: this.sprite?.props,
text: this.text?.props
};
for (const key in this) {
if (!(key in newObj) && !keywords.includes(key))
newObj[key] = this[key];
}
return deepCopy(newObj);
}
clone(parent = this.parent) {
const name = this.name;
let newName = name;
while (parent[newName]) {
newName = \`\${name}\${randStr(5)}\`;
}
const newGameObject = new GameObject({ ...this.props, parent }, newName);
newGameObject.start?.bind(newGameObject)();
}
destroy() {
for (const child of this.childs)
child.destroy();
const { parent, name } = this;
for (const key in this)
delete this[key];
gameObjects.splice(gameObjects.indexOf(this));
delete parent[name];
}
}
var ctx = document.body.children[0].getContext(\`2d\`);
var files = \`REPLACE_FILES\`;
var alphabet = \`ABCDEFGHIJKLMNOPRQSTUWXYZ\`;
var numbers = \`0123456789\`;
var allowedNameChars = \`\${alphabet}\${numbers}_\`;
var events = {};
var eventsHover = {};
var gameObjects = [];
var Log = { updates: 0, frames: 0, framesTemp: 0 };
var GameTime = {
ms: 1,
value: 1,
lastTime: 0,
set(newTime) {
this.value = newTime;
this.ms = 1000 / (60 * this.value);
this.lastTime = performance.now();
}
};
class Scene extends GameObject {
camera = { x: 0, y: 0 };
constructor(scene2, name) {
super(scene2, name);
}
load(newScene, name) {
this.close();
scene = new Scene(newScene, name);
for (const object of gameObjects) {
object.start?.();
}
}
close() {
super.destroy();
gameObjects.length = 0;
for (const key in events)
delete events[key];
for (const key in eventsHover)
delete eventsHover[key];
for (const key in this) {
if (![\`name\`, \`objects\`, \`load\`, \`close\`].includes(key))
delete this[key];
}
}
}
var scene = new Scene({}, \`\`);
async function run() {
loadScene(\`REPLACE_PATH_TO_MAIN_SCENE\`);
GameTime.set(1);
requestAnimationFrame(render);
let timer = performance.now();
let updates = 0;
let delta = 0;
while (true) {
const now = performance.now();
delta += (now - GameTime.lastTime) / GameTime.ms;
if (delta > 60)
delta = 60;
GameTime.lastTime = now;
while (delta >= 1) {
update();
updates++;
delta--;
}
if (now - timer > 1000) {
timer += 1000;
Log.updates = updates;
Log.frames = Log.framesTemp;
updates = 0;
Log.framesTemp = 0;
}
await wait();
}
}
function update() {
for (const obj of gameObjects) {
for (const f of obj.toUpdate)
f();
}
for (const key in events)
delete events[key];
}
function render() {
ctx.fillStyle = \`black\`;
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
for (const obj of gameObjects) {
for (const f of obj.toRender)
f();
}
draw({
text: \`\${gameObjects.length}go, \${Log.updates}ups, \${Log.frames}fps\`,
x: window.innerWidth - 6,
y: 6,
fillStyle: \`white\`,
font: \`18px serif\`,
textAlign: \`right\`,
textBaseline: \`top\`
});
Log.framesTemp++;
requestAnimationFrame(render);
}
window.addEventListener(\`mousedown\`, () => eventsHover.click = true);
window.addEventListener(\`mouseup\`, () => delete eventsHover.click);
window.addEventListener(\`click\`, () => events.click = true);
window.addEventListener(\`keydown\`, ({ key }) => events[key] = eventsHover[key] = true);
window.addEventListener(\`keyup\`, ({ key }) => delete eventsHover[key]);
window.addEventListener(\`contextmenu\`, (e) => {
e.preventDefault();
!document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen();
});
window.addEventListener(\`resize\`, onresize);
onresize();
run();`