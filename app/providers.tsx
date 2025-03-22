"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/components/translation-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TranslationProvider>{children}</TranslationProvider>
    </ThemeProvider>
  )
}

