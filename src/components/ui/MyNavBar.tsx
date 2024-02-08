'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, UserRound } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Burger from './Burger'

interface IMyNavBar {
  profile?: boolean | null
  add?: boolean | null
  login?: boolean | null
  authed?: boolean | null
  username: string | null
}

export default function MyNavBar({
  profile,
  add,
  login,
  username,
  authed,
}: IMyNavBar) {
  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-4 border-b h-14 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center" href="/home">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-red-500 text-transparent bg-clip-text">
          Evento
          <span className="text-lg font-light text-purple-500">v0.0</span>
        </h1>
        <span className="sr-only">Evento</span>
      </Link>

      <div className="flex flex-row items-center gap-x-4">
        <ThemeToggle></ThemeToggle>

        {add && (
          <Link className="flex items-center" href="/add">
            <Button variant="outline" size="icon" className="border-none">
              <Plus width={26} height={26} className="text-purple-500" />
            </Button>
          </Link>
        )}
        {authed ? (
          <Button variant="outline" size="icon" className="border-none">
            <Burger username={username!} />
          </Button>
        ) : (
          <Link className="flex items-center" href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  )
}
