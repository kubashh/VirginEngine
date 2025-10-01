import App from "./App"

export const config: Config = {
  outdir: `./dist`,
  bundleCss: true,
}

export const metadata: Metadata = {
  iconPath: `./icon.png`,
  title: `VirginEngine`,
  description: `VirginEngine simple game engine`,
}

export default function Page() {
  return (
    <html>
      <head></head>
      <body className="overflow-hidden select-none bg-black text-white">
        <App />
      </body>
    </html>
  )
}

// Types

type Config = {
  outdir: string
  bundleCss: boolean
}

type Metadata = {
  iconPath: string
  title: string
  description?: string
  author?: string
  keywords?: string
  themeColor?: string
  [name: string]: string | undefined
}
