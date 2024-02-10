import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu, TicketPlus, Home, User, Settings } from 'lucide-react'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

interface IBurger {
  username: string
}

export default function Burger({ username }: IBurger) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu width={26} height={26} className="text-fuchsia-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-red-500 text-transparent bg-clip-text mb-8">
            Evento{' '}
            <span className="text-lg font-light text-fuchsia-600">v0.0</span>
          </h1>
        </SheetHeader>

        <ul className="flex flex-col gap-y-8 mb-8 font-semibold text-xl text-primary dark:text-slate-300">
          <li className="dark:active:text-indigo-600 active:text-indigo-600">
            <SheetClose asChild>
              <Link href="/" className="flex flex-row items-center gap-x-3">
                <Home />
                <p>Home</p>
              </Link>
            </SheetClose>
          </li>
          <li className="active:text-indigo-600 dark:active:text-indigo-600">
            <SheetClose asChild>
              <Link href="/add" className="flex flex-row items-center gap-x-3">
                <span>
                  <TicketPlus />
                </span>
                <p>Add An Event</p>
              </Link>
            </SheetClose>
          </li>

          <li className="active:text-indigo-600 dark:active:text-indigo-600">
            <SheetClose asChild>
              <Link
                href={`/${username}`}
                className="flex flex-row items-center gap-x-3"
              >
                <User />
                <p>My Profile</p>
              </Link>
            </SheetClose>
          </li>
          <li className="active:text-indigo-600 dark:active:text-indigo-600">
            <SheetClose asChild>
              <Link
                href={`/settings`}
                className="flex flex-row items-center gap-x-3"
              >
                <Settings />
                <p>Settings</p>
              </Link>
            </SheetClose>
          </li>
        </ul>
        <SheetFooter>
          <div className="mt-3 w-full">
            <LogoutButton />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
