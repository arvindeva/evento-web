import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, UserRound } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Burger from '@/components/ui/Burger'

interface IProfileNavBar {
  userId: string
}

export default async function ProfileNavBar({ userId }: IProfileNavBar) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .limit(1)
    .single()

  if (profileError || !profileData) {
    console.error(profileError)
  }

  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-4 border-b h-14 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center" href="/home">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gradient-start  to-gradient-end text-transparent bg-clip-text">
          Evento
          <span className="text-lg font-light text-primary">v0.0</span>
        </h1>
        <span className="sr-only">Evento</span>
      </Link>

      <div className="flex flex-row items-center gap-x-4">
        <ThemeToggle></ThemeToggle>

        <Link className="flex items-center" href="/add">
          <Button variant="outline" size="icon" className="border-none">
            <Plus width={26} height={26} className="text-primary" />
          </Button>
        </Link>

        <Button variant="outline" size="icon" className="border-none">
          <Burger username={profileData?.username || ''} />
        </Button>
      </div>
    </header>
  )
}
