import { useEffect } from "react";
import { dragDataSignal, EMPTY_FILE } from "../lib/consts";

export default function DragData() {
  return (
    <div id="drag-data" className="absolute z-1 bg-[#000a]">
      <DragDataValue />
    </div>
  );
}

function DragDataValue() {
  const dragData = dragDataSignal.use();

  useEffect(() => {
    if (!dragData.name) return;

    window.addEventListener(`mousemove`, handleMouseMove);
    window.addEventListener(`mousedown`, handleMouseMove);
    window.addEventListener(`mouseup`, handleMouseUp);

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove);
      window.removeEventListener(`mousedown`, handleMouseMove);
      window.removeEventListener(`mouseup`, handleMouseUp);
    };
  });

  return dragData.name;
}

function handleMouseMove({ clientX, clientY, buttons }: MouseEvent) {
  if (buttons !== 1) return;

  const follower = document.getElementById(`drag-data`);
  if (!follower) return;

  follower.style.left = clientX + 3 + `px`;
  follower.style.top = clientY + 3 + `px`;
}

function handleMouseUp() {
  dragDataSignal.set({ name: ``, from: ``, file: EMPTY_FILE, old: {} });
}
