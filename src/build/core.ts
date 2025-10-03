export const core = `class Sprite {
node;
staticDrawProps = { x: 0, y: 0 };
img;
path;
w = 0;
h = 0;
constructor({ path }, node) {
this.node = node;
this.img = file(path);
this.path = path;
this.reload();
}
reload() {
if (this.node.scale.x !== 1 && this.node.scale.y !== 1) {
this.img = this.img.cloneNode();
resizeImage(this.img, this.node.scale);
this.img.onload = () => this.resize();
} else
this.resize();
}
resize() {
this.staticDrawProps = {
x: Camera.xOffset - this.img.width * 0.5,
y: Camera.yOffset - this.img.height * 0.5
};
this.w = this.img.width * this.node.scale.x;
this.h = this.img.height * this.node.scale.x;
}
render() {
const x = this.staticDrawProps.x - this.node.position.x;
const y = this.staticDrawProps.y - this.node.position.y;
if (0 < x + this.w && x - this.w < 2 * Camera.xOffset && 0 < y + this.h && y - this.h < 2 * Camera.yOffset)
ctx.drawImage(this.img, x, y);
}
get props() {
return {
path: this.path
};
}
}
resizeImage.ctx = document.createElement(\`canvas\`).getContext(\`2d\`);
resizeImage.ctx.canvas.style.display = \`none\`;
function resizeImage(image, { x, y }) {
const newWidth = image.width * x;
const newHeight = image.height * y;
resizeImage.ctx.canvas.width = newWidth;
resizeImage.ctx.canvas.height = newHeight;
resizeImage.ctx.drawImage(image, 0, 0, newWidth, newHeight);
image.src = resizeImage.ctx.canvas.toDataURL();
}
class Text {
node;
value;
color;
align = { x: 0, y: 0 };
constructor({ value, color }, node) {
this.node = node;
this.value = value;
this.color = color;
}
render() {
drawText({
text: this.value,
x: this.node.position.x,
y: this.node.position.y,
h: this.node.scale.y,
color: this.color,
rect: this.node.rect,
align: this.align
});
}
get props() {
return {
value: this.value,
color: this.color
};
}
}
class Collider {
node;
constructor(props, node) {
this.node = node;
}
}
class Physics {
static gravitySpeed = 0.6;
node;
velocity = 0;
target = {};
gravity;
constructor({ gravity }, node) {
this.gravity = gravity;
this.node = node;
setTimeout(() => this.target = {
x: node.position.x,
y: node.position.y
});
}
update() {
if (this.gravity) {
this.velocity -= Physics.gravitySpeed;
this.target.y += this.velocity;
}
this.node.position = lerp(this.node.position, this.target, 0.5);
}
addForce({ x, y }) {
this.target.x += x;
this.target.y += y;
}
}
class Animation {
node;
currentFrame = 0;
frames;
constructor(props, node) {
this.node = node;
this.frames = props.frames;
}
update() {}
start() {
this.currentFrame = 0;
}
stop() {}
}
var keywords = [\`parent\`, \`position\`, \`rotation\`, \`scale\`];
class Node {
name;
parent;
transform = {
p: {},
rz: 0,
s: {}
};
rect;
text;
sprite;
physics;
collider;
animation;
audio;
start;
update;
render;
constructor({
parent,
transform,
rect,
text,
sprite,
collider,
physics,
animation,
audio,
start,
update,
render,
...rest
}, name) {
nodes.push(this);
this.name = name;
this.parent = parent || {};
if (parent)
this.parent[this.name] = this;
this.transform.p = new GSXY(transform?.position);
if (transform?.rotation)
this.rotation = transform.rotation;
this.transform.s = new GSXY(transform?.scale || { x: 1, y: 1 });
if (rect)
this.rect = rect;
if (text)
this.text = new Text(text, this);
if (sprite)
this.sprite = new Sprite(sprite, this);
if (physics)
this.physics = new Physics(physics, this);
if (collider)
this.collider = new Collider(collider, this);
if (animation)
this.animation = new Animation(animation, this);
if (audio)
this.audio = new AudioElement(audio);
for (const key in rest) {
this[key] = isChildKey(key) ? new Node({ ...rest[key], parent: this }, key) : typeof rest[key] === \`function\` ? rest[key].bind(this) : rest[key];
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
transform: {
position: {
x: this.position.x,
y: this.position.y
},
rotation: this.rotation,
scale: {
x: this.scale.x,
y: this.scale.y
}
},
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
get position() {
return this.transform.p;
}
set position({ x, y }) {
for (const child of this.childs) {
child.position.x += -this.position.x + x;
child.position.y += -this.position.y + y;
}
this.transform.p.x = x;
this.transform.p.y = y;
}
get rotation() {
return this.transform.rz;
}
set rotation(z) {
z %= 360;
if (z < 0)
z += 360;
for (const child of this.childs) {
child.rotation = child.rotation - this.rotation + z;
}
this.transform.rz = z;
}
get scale() {
return this.transform.s;
}
set scale({ x, y }) {
for (const child of this.childs) {
child.scale.x = child.scale.x / this.scale.x * x;
child.scale.y = child.scale.y / this.scale.y * y;
}
this.transform.s.x = x;
this.transform.s.y = y;
this.sprite?.reload();
}
clone(parent = this.parent) {
let name = this.name;
while (parent[name]) {
name = \`\${name.slice(0, -5)}\${randStr(5)}\`;
}
const newNode = new Node({ ...this.props, parent }, name);
newNode.start?.bind(newNode)();
}
destroy() {
for (const child of this.childs)
child.destroy();
const { parent, name } = this;
for (const key in this)
delete this[key];
nodes.splice(nodes.indexOf(this), 1);
delete parent[name];
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
class Scene extends Node {
camera = { x: 0, y: 0 };
ms = 1;
vtime = 1;
lastTime = 0;
constructor({ name, ...scene }) {
super(scene, name);
this.time = 1;
}
load(newScene) {
onresize();
this.close();
newScene = new Scene(deepCopy(newScene));
for (const key in newScene) {
this[key] = newScene[key];
}
for (const node of nodes)
node.start?.();
nodes.shift();
}
close() {
super.destroy();
nodes.length = 0;
events.clear();
eventsHover.clear();
for (const key in this)
delete this[key];
}
get time() {
return this.vtime;
}
set time(newTime) {
this.vtime = newTime;
this.ms = 1000 / (60 * this.vtime);
this.lastTime = performance.now();
}
}
class Timer {
static timers = [];
static reset() {
for (const timer of this.timers)
timer.reset();
}
timers;
allFormatted = [];
constructor(...labels) {
this.timers = labels.reduce((prev, str) => ({ ...prev, [str]: 0 }), {});
this.reset();
Timer.timers.push(this);
}
measure(obj) {
const timer = this.timers;
for (const [name, f] of Object.entries(obj)) {
const start = performance.now();
f();
const end = performance.now() - start;
if (!this.timers[name])
this.timers[name] = 0;
timer[name] += end;
}
}
reset() {
const obj = Object.entries(this.timers).reduce((prev, [key, v]) => ({ ...prev, [key]: (prev[key] || 0) + v }), {});
const all = Object.values(obj).reduce((prev, v) => prev + v, 0);
this.allFormatted = Object.entries(obj).map(([key, value]) => \`\${key}: \${(value * 100 / all || 0).toFixed(2)}%\`);
this.timers = {};
}
}
class Obj {
constructor(obj) {
Object.assign(this, obj);
}
clear() {
for (const key in this)
delete this[key];
}
}
var ctx = document.body.children[0].getContext(\`2d\`);
var files = "REPLACE_FILES";
var alphabet = \`ABCDEFGHIJKLMNOPRQSTUWXYZ\`;
var numbers = \`0123456789\`;
var allowedNameChars = \`\${alphabet}\${numbers}_\`;
var events = new Obj;
var eventsHover = new Obj;
var nodes = [];
var Log = { updates: 0, frames: 0, framesTemp: 0 };
var Camera = {
xOffset: 0,
yOffset: 0
};
var scene = new Scene({ name: \`\` });
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
if ([\`parent\`, \`toUpdate\`, \`toRender\`, \`node\`].includes(key))
continue;
newObj[key] = deepCopy(data[key]);
}
return newObj;
}
return data;
}
var textAlign = new Map([
[-1, \`left\`],
[0, \`center\`],
[1, \`right\`]
]);
var textBaseline = new Map([
[-1, \`top\`],
[0, \`middle\`],
[1, \`bottom\`]
]);
function drawText({
text,
color,
x,
y,
w,
h,
rect = { x: 0, y: 0 },
font = \`serif\`,
align,
...rest
}) {
ctx.save();
ctx.fillStyle = color;
if (align) {
ctx.textAlign = textAlign.get(align.x);
ctx.textBaseline = textBaseline.get(align.y);
}
x += (rect.x + 1) * Camera.xOffset;
y += (rect.y + 1) * Camera.yOffset;
for (const key in rest) {
ctx[key] = rest[key];
}
ctx.font = \`\${h}px \${font}\`;
ctx.fillText(text, x, y, w);
ctx.restore();
}
function file(path) {
return path.split(\`.\`).slice(1).reduce((prev, key) => prev[key], files);
}
function onresize() {
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
Camera.xOffset = window.innerWidth * 0.5;
Camera.yOffset = window.innerHeight * 0.5;
for (const node of nodes)
node.sprite?.resize();
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
function lerp(a, b, t) {
return {
x: a.x + (b.x - a.x) * t,
y: a.y + (b.y - a.y) * t
};
}
class AudioElement {
static canPlay = false;
audio;
constructor({ path }) {
this.audio = file(path);
}
play() {
if (!AudioElement.canPlay)
return;
this.audio.currentTime = 0;
this.audio.play();
}
stop() {
this.audio.pause();
}
}
async function run() {
await loadAssets();
scene.load("REPLACE_PATH_TO_MAIN_SCENE");
requestAnimationFrame(render);
let timer = performance.now();
let updates = 0;
let delta = 0;
while (true) {
const now = performance.now();
delta += (now - scene.lastTime) / scene.ms;
if (delta > 60)
delta = 60;
scene.lastTime = now;
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
Timer.reset();
}
await wait();
}
}
async function loadAssets() {
await Promise.allSettled(assetsToLoad(files));
}
function assetsToLoad(obj) {
const toLoad = [];
for (const [key, value] of Object.entries(obj)) {
if (typeof value === \`object\`)
toLoad.push(...assetsToLoad(value));
else if (typeof value === \`string\`) {
if (value.startsWith(\`data:image/\`)) {
toLoad.push(new Promise((resolve) => {
const img = new Image;
img.src = value;
img.onload = () => {
img.onload = null;
obj[key] = img;
resolve();
};
}));
} else if (value.startsWith(\`data:audio/\`)) {
obj[key] = new Audio(value);
obj[key].onload = null;
}
}
}
return toLoad;
}
function update() {
updateTimer.measure({ Physics: updatePhysics, Nodes: updateNodes });
events.clear();
}
function updatePhysics() {
for (const node of nodes)
node.physics?.update();
}
function updateNodes() {
for (const node of nodes)
node.update?.();
}
function render() {
clearCtx();
renderTimer.measure({ Sprite: renderSprite, Text: renderText });
drawPerformanceInfo();
Log.framesTemp++;
requestAnimationFrame(render);
}
function clearCtx() {
ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function renderSprite() {
for (const node of nodes)
node.sprite?.render();
}
function renderText() {
for (const node of nodes)
node.text?.render();
}
function drawPerformanceInfo() {
const props = {
x: 6,
y: 6,
h: 18,
rect: { x: -1, y: -1 },
color: \`white\`,
textAlign: \`left\`,
textBaseline: \`top\`
};
drawText({
...props,
text: \`\${nodes.length}obj, \${Log.updates}ups, \${Log.frames}fps\`,
x: -6,
rect: { x: 1, y: -1 },
textAlign: \`right\`
});
for (const text of [...renderTimer.allFormatted, ...updateTimer.allFormatted]) {
drawText({ text, ...props });
props.y += 18;
}
}
var renderTimer = new Timer(\`Sprite\`, \`Text\`);
var updateTimer = new Timer(\`Physics\`, \`Nodes\`);
window.addEventListener(\`mousedown\`, () => eventsHover.click = true);
window.addEventListener(\`mouseup\`, () => delete eventsHover.click);
window.addEventListener(\`click\`, () => events.click = true);
function setAudioElement() {
AudioElement.canPlay = true;
window.removeEventListener(\`click\`, setAudioElement);
}
window.addEventListener(\`click\`, setAudioElement);
window.addEventListener(\`keydown\`, ({ key }) => events[key] = eventsHover[key] = true);
window.addEventListener(\`keyup\`, ({ key }) => delete eventsHover[key]);
window.addEventListener(\`contextmenu\`, (e) => {
e.preventDefault();
!document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen();
});
window.addEventListener(\`resize\`, onresize);
onresize();
run();`