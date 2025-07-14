import type { Metadata } from "next"
import "./globals.css"
import Head from "next/head"

export const metadata: Metadata = {
  title: "VirginEngine",
  description: "VirginEngine, simple game engine",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/virginengine/favicon.ico" />
      </Head>
      <body className="overflow-hidden select-none text-white bg-black">{children}</body>
    </html>
  )
}
