"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, UserRound } from "lucide-react";
import { useTheme } from "next-themes";

export default function NavBar() {
  return (
    <header className="fixed top-0 w-full h-20 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-background border-b border-b-zinc-300">
      <Link className="flex items-center" href="/home">
        <h1 className="text-2xl font-bold">
          Evento <span className="text-lg">v0.0</span>
        </h1>
        <span className="sr-only">Evento</span>
      </Link>
      <div className="flex flex-row items-center gap-x-4">
        <Link className="flex items-center" href="/add">
          <Button className="rounded-full w-10 h-10 p-0">
            <Plus width={24} height={24} color="#fafafa" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
