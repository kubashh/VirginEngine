import { useEffect } from "react";
import { signal } from "wdwh/signal";
import { dragData } from "../lib/consts";

const mouse = signal<{ left: number; top: number } | undefined>(undefined);

function handleMouseMove({ clientX, clientY, buttons }: MouseEvent) {
  if (buttons !== 1) return;
  console.log(`Render`);
  mouse.value = { left: clientX + 3, top: clientY + 3 };
}

function handleMouseUp() {
  dragData.value = null;
  mouse.value = undefined;
}

export default function DragData() {
  dragData.bind();
  mouse.bind();

  useEffect(() => {
    if (!dragData.value) return;

    window.addEventListener(`mousemove`, handleMouseMove);
    window.addEventListener(`mouseup`, handleMouseUp);

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove);
      window.removeEventListener(`mouseup`, handleMouseUp);
    };
  });

  return mouse.value ? (
    <div className="absolute z-1 bg-[#000a]" style={mouse.value}>
      {dragData.value?.name}
    </div>
  ) : null;
}
