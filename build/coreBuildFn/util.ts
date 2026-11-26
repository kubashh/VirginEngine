export const keywords = [
  `type`,
  `transform`,
  `position`,
  `rotation`,
  `scale`,
  `text`,
  `rect`,
  `sprite`,
  `physics`,
  `audio`,
];

export function optymalizeImageSrc(src: string, quality: number) {
  const { resolve, promise } = Promise.withResolvers<string>();

  if (quality === 1) resolve(src);

  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement(`canvas`);
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext(`2d`)!;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const newSrc = canvas.toDataURL(`image/jpeg`, quality);

    console.log(src.length, newSrc.length);

    resolve(newSrc.length < src.length ? newSrc : src);
  };

  img.src = src;

  return promise;
}
