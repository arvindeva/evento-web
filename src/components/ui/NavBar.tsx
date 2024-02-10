'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, UserRound } from 'lucide-react'
import { useTheme } from 'next-themes'
import ThemeToggle from './ThemeToggle'

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-4 border-b h-14 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center" href="/home">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gradient-start  to-gradient-end text-transparent bg-clip-text">
          Evento <span className="text-lg font-light text-primary">v0.0</span>
        </h1>
        <span className="sr-only">Evento</span>
      </Link>
      <div className="flex flex-row items-center gap-x-4">
        <ThemeToggle></ThemeToggle>
        <Link className="flex items-center" href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </header>
  )
}
