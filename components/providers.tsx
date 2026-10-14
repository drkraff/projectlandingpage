"use client"

import { ThemeProvider } from "next-themes"
import siteConfig from "@/lib/site.config"

const mode = siteConfig.theme.defaultMode

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={mode}
      enableSystem={mode === "system"}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
