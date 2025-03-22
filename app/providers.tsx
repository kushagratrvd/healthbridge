"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/components/translation-provider"
import { AppProvider } from "@/providers/app-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TranslationProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </TranslationProvider>
    </ThemeProvider>
  )
}

