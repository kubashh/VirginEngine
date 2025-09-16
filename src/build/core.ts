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
}
get position() {
return this.p;
}
set position({ x, y }) {
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
for (const child of this.gameObject.childs) {
child.scale.x = child.scale.x / this.scale.x * x;
child.scale.y = child.scale.y / this.scale.y * y;
}
this.s.x = x;
this.s.y = y;
this.gameObject.sprite?.reload();
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
var textBaseline = { "-1": \`top\`, "0": \`middle\`, "1": \`bottom\` };
var textAlign = { "-1": \`left\`, "0": \`center\`, "1": \`right\` };
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
ctx.textAlign = textAlign[align.x];
ctx.textAlign = textBaseline[align.y];
}
x += Camera.xOffset;
y += Camera.yOffset;
if (rect.x === -1)
x -= Camera.xOffset;
if (rect.x === 1)
x += Camera.xOffset;
if (rect.y === -1)
y -= Camera.yOffset;
if (rect.y === 1)
y += Camera.yOffset;
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
for (const obj of gameObjects) {
obj.sprite?.resize();
}
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
class Sprite extends Image {
gameObject;
path;
staticDrawProps = { x: 0, y: 0 };
constructor({ path }, gameObject) {
super();
this.gameObject = gameObject;
this.src = file(path);
this.path = path;
this.onload = this.reload;
this.resize();
}
reload() {
resizeImage(this, this.gameObject.scale);
this.onload = () => {};
}
resize() {
this.staticDrawProps = {
x: Camera.xOffset - this.width * 0.5,
y: Camera.yOffset - this.height * 0.5
};
}
render() {
ctx.drawImage(this, this.gameObject.position.x + this.staticDrawProps.x, this.gameObject.position.y + this.staticDrawProps.y);
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
if (x === 1 && y === 1)
return;
const newWidth = image.width * x;
const newHeight = image.height * y;
resizeImage.ctx.canvas.width = newWidth;
resizeImage.ctx.canvas.height = newHeight;
resizeImage.ctx.drawImage(image, 0, 0, newWidth, newHeight);
image.src = resizeImage.ctx.canvas.toDataURL();
}
class Text {
gameObject;
value;
color;
align = { x: 0, y: 0 };
constructor({ value, color }, gameObject) {
this.gameObject = gameObject;
this.value = value;
this.color = color;
}
render() {
drawText({
text: this.value,
x: this.gameObject.position.x,
y: this.gameObject.position.y,
h: this.gameObject.scale.y,
color: this.color,
rect: this.gameObject.rect,
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
gameObject;
constructor(props, gameObject) {
this.gameObject = gameObject;
}
}
class Physics {
gameObject;
velocity;
constructor({ velocity }, gameObject) {
this.velocity = velocity || 0;
this.gameObject = gameObject;
}
update() {}
}
var keywords = [\`toUpdate\`, \`toRender\`, \`parent\`, \`position\`, \`rotation\`, \`scale\`];
class GameObject {
name;
parent;
transform;
position = {};
rotation = 0;
scale = {};
rect;
text;
sprite;
physics;
collider;
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
start,
update,
render,
...rest
}, name) {
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
if (physics)
this.physics = new Physics(physics, this);
if (collider)
this.collider = new Collider(collider, this);
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
class Scene extends GameObject {
camera = { x: 0, y: 0 };
constructor(scene2, name) {
super(scene2, name);
}
load(newScene, name) {
this.close();
newScene = new Scene(newScene, name);
for (const key in newScene) {
this[key] = newScene[key];
}
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
class Timer {
timers;
allFormatted = [];
static timers = [];
constructor(labels) {
this.timers = labels.reduce((prev, str) => ({ ...prev, [str]: 0 }), {});
this.reset();
Timer.timers.push(this);
}
measure(...arr) {
const timer = this.timers;
for (const [name, f] of arr) {
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
static reset() {
for (const timer of this.timers) {
timer.reset();
}
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
var Camera = {
xOffset: 0,
yOffset: 0
};
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
Timer.reset();
}
await wait();
}
}
function update() {
UpdateTimer.measure([\`Physics\`, updatePhysics], [\`Objects\`, updateObjects]);
clearEvents();
}
function updatePhysics() {
for (const obj of gameObjects)
obj.physics?.update();
}
function updateObjects() {
for (const obj of gameObjects)
obj.update?.();
}
function clearEvents() {
for (const key in events)
delete events[key];
}
function render() {
clearCtx();
RenderTimer.measure([\`Sprite\`, renderSprite], [\`Text\`, renderText]);
drawText({
text: \`\${gameObjects.length}go, \${Log.updates}ups, \${Log.frames}fps\`,
x: -6,
y: 6,
h: 18,
rect: { x: 1, y: -1 },
color: \`white\`,
textAlign: \`right\`,
textBaseline: \`top\`
});
const props = {
x: 6,
h: 18,
rect: { x: -1, y: -1 },
color: \`white\`,
textAlign: \`left\`,
textBaseline: \`top\`
};
let y = 6;
for (const text of [...RenderTimer.allFormatted, ...UpdateTimer.allFormatted]) {
drawText({ text, y, ...props });
y += 18;
}
Log.framesTemp++;
requestAnimationFrame(render);
}
function clearCtx() {
ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function renderSprite() {
for (const obj of gameObjects)
obj.sprite?.render();
}
function renderText() {
for (const obj of gameObjects)
obj.text?.render();
}
var RenderTimer = new Timer([\`Sprite\`, \`Text\`]);
var UpdateTimer = new Timer([\`Physics\`, \`Objects\`]);
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