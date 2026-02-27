import { type Metadata } from "wdwh";
import App from "./App";

export const metadata: Metadata = {
  iconPath: `./icon.png`,
  title: `VirginEngine`,
  description: `VirginEngine simple game engine`,
};

export default function Page() {
  return (
    <html>
      <head></head>
      <body className="overflow-hidden select-none bg-black text-white">
        <App />
      </body>
    </html>
  );
}
