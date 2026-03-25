import type { Metadata } from "wdwh";
import App from "./App";

export const metadata: Metadata = {
  title: `Example`,
  iconPath: `./icon.png`,
  description: `Example project created with wdwh framework`,
};

export default function Page() {
  return (
    <body className="overflow-hidden select-none bg-black text-white">
      <App />
    </body>
  );
}
