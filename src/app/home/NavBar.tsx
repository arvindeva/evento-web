'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, UserRound } from 'lucide-react'
import { useTheme } from 'next-themes'
import ThemeToggle from '@/components/ui/ThemeToggle'

interface INavBar {
  username: string | null
}

export default function NavBar({ username }: INavBar) {
  return (
    // <header className="fixed top-0 w-full h-14 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-background border-b border-b-zinc-300 ">
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-4 border-b h-14 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center" href="/home">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-red-500 text-transparent bg-clip-text">
          Evento{' '}
          <span className="text-lg font-light text-fuchsia-500">v0.0</span>
        </h1>
        <span className="sr-only">Evento</span>
      </Link>
      <div className="flex flex-row items-center gap-x-4">
        <ThemeToggle></ThemeToggle>
        <Link className="flex items-center" href={`/${username}`}>
          <Button variant="outline" size="icon" className="border-none">
            <UserRound
              width={22}
              height={22}
              strokeWidth="2px"
              className="text-fuchsia-500"
            />
          </Button>
        </Link>
        <Link className="flex items-center" href="/add">
          <Button variant="outline" size="icon" className="border-none">
            <Plus width={26} height={26} className="text-fuchsia-500" />
          </Button>
        </Link>
      </div>
    </header>
  )
}
