import { Camera, ctx } from "../values/consts";
import { file } from "../util/basicFunctions";

export default class Sprite implements TSprite {
  private node;
  private staticDrawProps = { x: 0, y: 0 } as XY;
  img: HTMLImageElement;

  path;
  w = 0;
  h = 0;

  constructor({ path }: SpriteProps, node: TNode) {
    this.node = node;
    this.img = file(path);
    this.path = path;
    this.reload();
  }

  reload() {
    if (this.node.scale.x !== 1 && this.node.scale.y !== 1) {
      this.img = this.img.cloneNode() as any;
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

  get props() {
    return {
      path: this.path,
    };
  }
}

resizeImage.ctx = document.createElement(`canvas`).getContext(`2d`)!;
resizeImage.ctx.canvas.style.display = `none`;
function resizeImage(image: HTMLImageElement, { x, y }: XY) {
  const newWidth = image.width * x;
  const newHeight = image.height * y;

  resizeImage.ctx.canvas.width = newWidth;
  resizeImage.ctx.canvas.height = newHeight;

  resizeImage.ctx.drawImage(image, 0, 0, newWidth, newHeight);
  image.src = resizeImage.ctx.canvas.toDataURL();
}
