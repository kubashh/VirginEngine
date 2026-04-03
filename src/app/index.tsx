import type { Metadata } from "wdwh";
import App from "./App";

export const metadata: Metadata = {
  title: `Virgin Engine`,
  iconPath: `./icon.png`,
  description: `Virgin Engine - simple 2D TS game engine`,
};

export default function Page() {
  return (
    <body className="overflow-hidden select-none bg-black text-white">
      <App />
    </body>
  );
}
