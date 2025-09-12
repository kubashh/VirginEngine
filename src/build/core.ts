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
gameObject.position = this.position;
gameObject.rotation = this.rotation;
gameObject.scale = this.scale;
if (!props)
this.readonly = true;
}
get position() {
return this.p;
}
set position({ x, y }) {
if (this.readonly)
throw alert(\`PROGRAMMER, you can't chage "readOnly" position\`);
for (const child of this.gameObject.childs) {
child.position.x += -this.position.x + x;
child.position.y += -this.position.y + y;
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
child.rotation = child.rotation - this.rotation + z;
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
child.scale.x = child.scale.x / this.scale.x * x;
child.scale.y = child.scale.y / this.scale.y * y;
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
function draw({ text, color, x, y, w, h, font, ...props }) {
ctx.save();
for (const key in props) {
ctx[key] = props[key];
}
if (text) {
ctx.font = \`\${h}px \${font || \`serif\`}\`;
ctx.fillText(text, x, y);
}
if (color && w) {
ctx.fillStyle = color;
ctx.fillRect(x, y, w, h);
}
ctx.restore();
}
function drawImage(img, pos, rot, scl) {
ctx.save();
ctx.drawImage(img, pos.x, pos.y);
ctx.restore();
}
function file(path) {
return path.split(\`.\`).slice(1).reduce((prev, key) => prev[key], files);
}
function onresize() {
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
}
function randInt(min, max) {
return Math.floor(rand(min, max));
}
function rand(min = 1, max) {
return max ? Math.random() * (max - min) + min : Math.random() * min;
}
function randStr(n = 1) {
let str = \`\`;
for (let i = 0;i < n; i++) {
str += allowedNameChars.at(randInt(allowedNameChars.length));
}
return str;
}
function randColor() {
return \`#\${randHex()}\${randHex()}\${randHex()}\`;
}
function randHex() {
const n = randInt(16);
return n < 10 ? String(n) : String.fromCharCode(45 + n);
}
class Sprite {
gameObject;
src;
img;
constructor({ src }, gameObject) {
this.gameObject = gameObject;
this.src = src;
this.img = new Image;
this.img.onload = () => {};
this.img.src = file(src).src;
}
render() {
drawImage(this.img, this.gameObject.position, this.gameObject.rotation, this.gameObject.scale);
}
get props() {
return {
src: this.src
};
}
}
var textBaseline = [\`top\`, \`middle\`, \`bottom\`];
var textAlign = [\`left\`, \`center\`, \`right\`];
class Text {
gameObject;
value;
color;
textBaseline;
textAlign;
constructor({ value, color }, gameObject) {
this.gameObject = gameObject;
this.value = value;
this.color = color;
if (gameObject.rect) {
this.textBaseline = textBaseline[gameObject.rect.x];
this.textAlign = textAlign[gameObject.rect.y];
}
}
render() {
draw({
text: this.value,
x: this.gameObject.position.x,
y: this.gameObject.position.y,
h: this.gameObject.scale.y,
fillStyle: this.color,
textBaseline: this.textBaseline,
textAlign: this.textAlign
});
}
get props() {
return {
value: this.value,
color: this.color
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
name;
parent;
start;
update;
render;
transform;
position = {};
rotation = 0;
scale = {};
rect;
text;
sprite;
collider;
constructor({ parent, transform, rect, text, sprite, collider, start, update, render, ...rest }, name) {
gameObjects.push(this);
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
this.sprite = new Sprite(sprite, this);
if (collider)
this.collider = Collider();
for (const key in rest) {
this[key] = isChildKey(key) ? new GameObject({ ...rest[key], parent: this }, key) : typeof rest[key] === \`function\` ? rest[key].bind(this) : rest[key];
}
if (start)
this.start = start;
if (update)
this.update = update;
if (render)
this.render = render;
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
for (const obj of gameObjects)
obj.start?.();
gameObjects.shift();
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
obj.update?.();
}
for (const key in events)
delete events[key];
}
function render() {
ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
for (const obj of gameObjects)
obj.sprite?.render();
for (const obj of gameObjects)
obj.text?.render();
draw({
text: \`\${gameObjects.length}go, \${Log.updates}ups, \${Log.frames}fps\`,
x: window.innerWidth - 6,
y: 6,
h: 18,
fillStyle: \`white\`,
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