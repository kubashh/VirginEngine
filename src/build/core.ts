export const core = `var ctx = document.body.children[0].getContext(\`2d\`);
var files = \`REPLACE_FILES\`;
var events = {};
var eventsHover = {};
var gameObjects = [];
var Log = { updates: 0, frames: 0, framesTemp: 0 };
var GameTime = {
ms: 1,
value: 1,
lastTime: 0,
get() {
return this.value;
},
set(newTime) {
this.value = newTime;
this.ms = 1000 / (60 * this.value);
this.lastTime = performance.now();
}
};
var scene = {};
function setScene(newScene) {
scene = newScene;
}
class Sprite {
gameObject;
color;
constructor({ color }, gameObject) {
this.gameObject = gameObject;
this.color = color;
gameObject.toRender.push(this.render.bind(this));
}
render() {
draw({
x: this.gameObject.position.x,
y: this.gameObject.position.y,
w: this.gameObject.scale.x,
h: this.gameObject.scale.y,
color: this.color
});
}
}
class Text {
value;
rect;
transform;
textBaseline;
textAlign;
constructor(value, gameObject, rect) {
this.transform = gameObject.transform;
this.value = value;
this.textBaseline = Text.textBaseline[rect.x];
this.textAlign = Text.textAlign[rect.y];
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
static textBaseline = [\`top\`, \`middle\`, \`bottom\`];
static textAlign = [\`left\`, \`center\`, \`right\`];
}
class Transform {
gameObject;
px = 0;
py = 0;
rz = 0;
sx = 1;
sy = 1;
rect;
constructor(props, gameObject) {
if (props && gameObject) {
this.gameObject = gameObject;
const { position, rotation, scale, rect } = props;
this.position = position;
this.rotation = rotation;
this.scale = scale;
this.rect = rect;
gameObject.position = position;
gameObject.rotation = rotation;
gameObject.scale = scale;
} else {
this.readonly = true;
}
}
get position() {
return { x: this.px, y: this.py };
}
set position({ x, y }) {
if (this.readonly)
throw alert(\`PROGRAMMER, you can't chage "readOnly" position\`);
for (const child of this.gameObject.childs) {
child.transform.position = {
x: child.transform.px - this.px + x,
y: child.transform.py - this.py + y
};
}
this.px = x;
this.py = y;
}
get rotation() {
return { z: this.rz };
}
set rotation({ z }) {
if (this.readonly)
throw alert(\`PROGRAMMER, you can't chage "readOnly" rotation\`);
while (z < 0) {
z += 360;
}
while (z >= 360) {
z -= 360;
}
for (const child of this.gameObject.childs) {
let newRot = child.transform.rz - this.rz + z;
if (newRot < 0) {
newRot += 360;
} else if (newRot > 360) {
newRot -= 360;
}
child.transform.rotation = { z: newRot };
}
this.rz = z;
}
get scale() {
return { x: this.sx, y: this.sy };
}
set scale({ x, y }) {
if (this.readonly)
throw alert(\`PROGRAMMER, you can't chage "readOnly" scale\`);
for (const child of this.gameObject.childs) {
child.transform.scale = {
x: child.transform.sx / this.sx * x,
y: child.transform.sy / this.sy * y
};
}
this.sx = x;
this.sy = y;
}
}
var keywords = [\`toUpdate\`, \`toRender\`, \`parent\`, \`position\`, \`rotation\`, \`scale\`];
class GameObject {
toUpdate = [];
toRender = [];
parent;
start;
update;
transform;
position;
rotation;
scale;
text;
sprite;
constructor({ parent, transform, rect, text, sprite, start, update, render, ...rest }) {
this.parent = parent || new GameObject({ parent: {} });
this.transform = new Transform(transform, this);
if (text)
this.text = new Text(text.value, this, rect);
if (sprite)
this.sprite = new Sprite(sprite, this);
for (const key in rest) {
if (isChildKey(key)) {
this[key] = new GameObject({ ...rest[key], parent: this });
} else {
this[key] = typeof rest[key] === \`function\` ? rest[key].bind(this) : rest[key];
}
}
if (update) {
this.update = update;
this.toUpdate.push(() => this.update.bind(this)());
}
if (render)
this.toRender.push(() => render.bind(this)());
if (start) {
this.start = start;
this.start.bind(this)();
}
gameObjects.push(this);
}
get childs() {
const childs = [];
for (const key in this) {
if (isChildKey(key))
childs.push(this[key]);
}
return childs;
}
get name() {
for (const key in this.parent) {
if (this === this.parent[key])
return key;
}
throw Error(\`No name in Obj!\`);
}
get props() {
const newObj = {
start: this?.start,
update: this?.update,
transform: {
position: this.position,
rotation: this.rotation,
scale: this.scale,
rect: this.transform.rect
}
};
for (const key in this) {
if (!(key in newObj) && !keywords.includes(key))
newObj[key] = this[key];
}
return deepCopy(newObj);
}
clone(parent) {
const name = this.name;
let newName = name;
let i = 0;
while (parent[newName]) {
newName = \`\${name}\${i}\`;
i++;
}
parent[newName] = new GameObject({ ...this.props, parent });
}
destroy() {
for (const child of this.childs)
child.destroy();
const { parent } = this;
const parentKey = this.name;
for (const key in this)
delete this[key];
gameObjects.splice(gameObjects.indexOf(this));
delete parent[parentKey];
}
}
async function wait(time) {
await new Promise((r) => setTimeout(r, time));
}
function isChildKey(text) {
return \`ABCDEFGHIJKLMNOPRQSTUWXYZ\`.includes(text.at(0));
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
gameObjects.length = 0;
for (const key in events)
delete events[key];
for (const key in eventsHover)
delete eventsHover[key];
setScene(new GameObject(deepCopy(newScene)));
scene.name = name;
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
function onresize() {
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
}
async function run() {
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
const props = {
x: 8,
y: 8,
fillStyle: \`white\`,
font: \`22px serif\`,
textAlign: \`left\`,
textBaseline: \`top\`
};
draw({ text: \`Update \${Log.updates}\`, ...props });
draw({ text: \`Render \${Log.frames}\`, ...props, y: 38 });
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
console.log(\`Engine:\`, !!files);
onresize();
loadScene(\`REPLACE_PATH_TO_MAIN_SCENE\`);
run();`