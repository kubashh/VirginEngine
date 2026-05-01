import { useEffect } from "react";
import Button from "../components/Button";
import { popupMenuSignal } from "../lib/consts";

export default function PopupMenu() {
  const popupMenu = popupMenuSignal.use();

  useEffect(() => {
    if (!popupMenu.label) return;
    document.addEventListener(`mousedown`, onMouseDown);

    return () => {
      document.removeEventListener(`mousedown`, onMouseDown);
    };
  }, [popupMenu]);

  return popupMenu.label ? (
    <div className="w-screen h-screen flex justify-center bg-[#000a]">
      <div id="popup-menu" className="flex flex-col justify-center *:mx-auto">
        <div className="mb-8 text-4xl">{popupMenu.label}</div>
        <PopupMenuOptions options={popupMenu.options} />
      </div>
    </div>
  ) : null;
}

function PopupMenuOptions({ options }: { options?: TObj<Void> }) {
  return options
    ? Object.entries(options).map(([label, cb]) => (
        <Button
          label={label}
          key={label}
          className="border-4 border-zinc-600 px-6 py-2 text-3xl rounded-2xl hover:text-zinc-400"
          onClick={() => {
            cb();
            popupMenuSignal.set({ label: ``, options: {} });
          }}
        />
      ))
    : null;
}

function onMouseDown({ target }: MouseEvent) {
  const element = document.getElementById(`popup-menu`);
  if (element && !element.contains(target as Node)) {
    popupMenuSignal.set({ label: ``, options: {} });
  }
}
