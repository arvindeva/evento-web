import Link from 'next/link'
import { Button } from './button'

export default function NewNavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-row justify-between container items-center py-4 px-4">
        <Link href="/">
          <h1 className="font-bold text-2xl">Evento</h1>
        </Link>
        <div className="flex flex-row items-center gap-x-4">
          <Link href="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href="/login">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
