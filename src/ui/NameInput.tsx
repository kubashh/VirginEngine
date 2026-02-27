import { useEffect, useRef } from "react";
import { nameInput } from "../lib/consts";
import { capitalize, isValidName } from "../lib/util";

function useNameInput(ref: React.RefObject<HTMLInputElement | null>) {
  nameInput.bind();
  const [cb, text = ``, lowerCase = false] = nameInput.value;

  const ret = () => {
    if (cb && isValidName(text)) {
      cb(lowerCase ? `${text[0].toLowerCase()}${text.slice(1)}` : text);
    }
    nameInput.value = [];
  };

  useEffect(() => {
    if (!ref) return;

    function handler({ target }: MouseEvent) {
      if (ref.current && !ref.current.contains(target as Node)) ret();
    }

    document.addEventListener(`mousedown`, handler);

    return () => document.removeEventListener(`mousedown`, handler);
  });

  return cb
    ? {
        value: text,
        onChange: ({ target }: { target: { value: string } }) => {
          const value = capitalize(target.value);

          if (!isValidName(value)) return;

          nameInput.value = [cb, value, lowerCase];
        },
        onKeyDown: ({ key }: React.KeyboardEvent<HTMLInputElement>) => key === `Enter` && ret(),
      }
    : null;
}

export default function NameInput() {
  const ref = useRef<HTMLInputElement>(null);
  const props = useNameInput(ref);

  return (
    props && (
      <input
        ref={ref}
        type="text"
        className="absolute z-1 text-4xl translate-x-[calc(50vw-50%)] translate-y-[calc(50vh-50%)]"
        {...props}
        autoFocus
      />
    )
  );
}
