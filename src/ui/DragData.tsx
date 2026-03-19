import { useEffect } from "react";
import { dragDataSignal } from "../lib/consts";

export default function DragData() {
  const dragData = dragDataSignal.use();

  useEffect(() => {
    if (!dragData.name) return;

    window.addEventListener(`mousemove`, handleMouseMove);
    window.addEventListener(`mouseup`, handleMouseUp);

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove);
      window.removeEventListener(`mouseup`, handleMouseUp);
    };
  });

  return dragData.name ? (
    <div id="drag-data" className="absolute z-1 bg-[#000a]">
      {dragData.name}
    </div>
  ) : null;
}

function handleMouseMove({ clientX, clientY, buttons }: MouseEvent) {
  if (buttons !== 1) return;

  const follower = document.getElementById(`drag-data`);
  if (!follower) return;

  follower.style.left = clientX + 3 + `px`;
  follower.style.top = clientY + 3 + `px`;
}

function handleMouseUp() {
  dragDataSignal.set({ name: ``, from: ``, file: {}, old: {} });
}
