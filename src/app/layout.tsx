import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "VirginEngine",
  description: "VirginEngine, simple game engine",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="overflow-hidden select-none text-white bg-black">{children}</body>
    </html>
  )
}
