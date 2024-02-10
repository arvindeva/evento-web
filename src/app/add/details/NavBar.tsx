'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NavBar() {
  const router = useRouter()

  return (
    <header className="sticky -top-px z-50 border-b dark:border-b-zinc-600 bg-background">
      <div className="grid grid-cols-3 items-center align-center p-2.5 h-16">
        <div className="">
          <div onClick={() => router.back()}>
            <ArrowLeft />
          </div>
        </div>
        <div className="text-center text-lg font-bold tracking-tight ">
          Add Event
        </div>
        <div></div>
      </div>
    </header>
  )
}
