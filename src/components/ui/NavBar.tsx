import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";

export default function NavBar() {
  return (
    <header className="fixed top-0 w-full h-20 flex items-center justify-between px-4 md:px-6 bg-background border-b border-b-zinc-300">
      <Link className="flex items-center" href="/">
        <h1 className="text-2xl font-bold">
          Evento <span className="text-lg">v0.0</span>
        </h1>
        <span className="sr-only">Evento</span>
      </Link>
      <Link className="flex items-center" href="/login">
        <Button>Login</Button>
      </Link>
    </header>
  );
}
