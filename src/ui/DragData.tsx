import { useEffect } from "react";
import { cursorPointerSignal, dragDataSignal, EMPTY_FILE } from "../lib/consts";

export default function DragData() {
  return (
    <div id="drag-data" className="font-bold bg-[#000a] cursor-pointer">
      <DragDataValue />
    </div>
  );
}

function DragDataValue() {
  const dragData = dragDataSignal.use();
  cursorPointerSignal.set(!!dragData.name);

  useEffect(() => {
    if (!dragData.name) return;

    window.addEventListener(`mousemove`, handleMouseMove);
    window.addEventListener(`mousedown`, onMouseDown);
    window.addEventListener(`mouseup`, handleMouseUp);

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove);
      window.removeEventListener(`mousedown`, onMouseDown);
      window.removeEventListener(`mouseup`, handleMouseUp);
    };
  });

  return dragData.name;
}

function handleMouseMove({ clientX, clientY, buttons }: MouseEvent) {
  if (buttons !== 1) return;

  const follower = document.getElementById(`drag-data`);
  if (!follower) return;

  follower.style.display = ``;
  follower.style.left = clientX + 3 + `px`;
  follower.style.top = clientY + 3 + `px`;
}

function onMouseDown() {
  const follower = document.getElementById(`drag-data`);
  if (!follower) return;

  follower.style.display = `none`; // disable unnecessary showing
}

function handleMouseUp() {
  dragDataSignal.set({ name: ``, from: ``, file: EMPTY_FILE, old: {} });
}
