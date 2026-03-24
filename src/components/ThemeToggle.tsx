"use client"

import { useTheme } from "@/components/ThemeProvider"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 하이드레이션 불일치 방지
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={cn(
        "flex w-24 h-12 p-1.5 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "bg-zinc-950 border border-zinc-800"
          : "bg-white border border-zinc-200"
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
      aria-label="테마 전환"
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-9 h-9 rounded-full transition-transform duration-300",
            isDark
              ? "transform translate-x-0 bg-zinc-800"
              : "transform translate-x-12 bg-gray-200"
          )}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-white" strokeWidth={1.5} />
          ) : (
            <Sun className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-9 h-9 rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "transform -translate-x-12"
          )}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
          ) : (
            <Moon className="w-5 h-5 text-black" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  )
}
