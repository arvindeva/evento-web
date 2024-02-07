import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

interface IBurger {
  username: string;
}

export default function Burger({ username }: IBurger) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu width={26} height={26} className="text-purple-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-red-500 text-transparent bg-clip-text mb-8">
            Evento{" "}
            <span className="text-lg font-light text-purple-600">v0.0</span>
          </h1>
        </SheetHeader>

        <ul className="flex flex-col gap-y-8 mb-8 font-semibold text-xl text-primary dark:text-slate-300">
          <li className="dark:active:text-indigo-600 active:text-indigo-600">
            <SheetClose asChild>
              <Link href="/">Home</Link>
            </SheetClose>
          </li>
          <li className="active:text-indigo-600 dark:active:text-indigo-600">
            <SheetClose asChild>
              <Link href="/add">Add An Event</Link>
            </SheetClose>
          </li>

          <li className="active:text-indigo-600 dark:active:text-indigo-600">
            <SheetClose asChild>
              <Link href={`/${username}`}>My Profile</Link>
            </SheetClose>
          </li>
        </ul>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
