import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Montserrat, Playfair_Display, Dancing_Script } from "next/font/google"

// Load fonts using Next.js Font system
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-montserrat",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: "La Belle Cuisine Menu",
  description: "Fine Dining Experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfairDisplay.variable} ${dancingScript.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
