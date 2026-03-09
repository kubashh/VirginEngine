import App from "./App";

export default function Page() {
  return (
    <html>
      <head>
        <link rel="icon" href="./icon.png" />
        <meta name="description" content="VirginEngine simple game engine" />
        <title>VirginEngine</title>
      </head>
      <body className="overflow-hidden select-none bg-black text-white">
        <App />
      </body>
    </html>
  );
}
