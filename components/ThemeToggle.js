'use client'
// components/ThemeToggle.js  (Client Component)
// Reads and changes shared state through the useTheme() context hook.
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md border border-slate-300 px-3 py-1 text-sm dark:border-slate-600"
    >
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  )
}
