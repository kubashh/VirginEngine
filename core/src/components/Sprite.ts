import { Camera, ctx } from "../values/consts";
import { file } from "../util/basicFunctions";
import type { Node } from "./Node";

export class Sprite {
  private node: Node;
  private staticDrawProps = { x: 0, y: 0 };
  img: HTMLImageElement;

  path: string;
  w: number = 0;
  h: number = 0;

  constructor({ path }: SpriteProps, node: Node) {
    this.node = node;
    this.img = file(path);
    this.path = path;
    this.reload();
  }

  reload() {
    if (this.node.scale.x !== 1 && this.node.scale.y !== 1) {
      this.img = this.img.cloneNode() as HTMLImageElement;
      resizeImage(this.img, this.node.scale);
      this.img.onload = () => this.resize();
    } else this.resize();
  }

  resize() {
    this.staticDrawProps = {
      x: Camera.xOffset - this.img.width * 0.5,
      y: Camera.yOffset - this.img.height * 0.5,
    };

    this.w = this.img.width * this.node.scale.x;
    this.h = this.img.height * this.node.scale.x;
  }

  render() {
    const x = this.staticDrawProps.x - this.node.position.x;
    const y = this.staticDrawProps.y - this.node.position.y;
    if (
      0 < x + this.w &&
      x - this.w < 2 * Camera.xOffset &&
      0 < y + this.h &&
      y - this.h < 2 * Camera.yOffset
    )
      ctx.drawImage(this.img, x, y);
  }

  getProps() {
    return {
      path: this.path,
    };
  }
}

let resizeImageCtx = document.createElement(`canvas`).getContext(`2d`)!;
resizeImageCtx.canvas.style.display = `none`;
function resizeImage(image: HTMLImageElement, { x, y }: { x: number; y: number }) {
  const newWidth = image.width * x;
  const newHeight = image.height * y;

  resizeImageCtx.canvas.width = newWidth;
  resizeImageCtx.canvas.height = newHeight;

  resizeImageCtx.drawImage(image, 0, 0, newWidth, newHeight);
  image.src = resizeImageCtx.canvas.toDataURL();
}
