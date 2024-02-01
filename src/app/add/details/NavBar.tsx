import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky -top-px z-50 border-b border-b-zinc-600 bg-background">
      <div className="grid grid-cols-3 items-center align-center p-2.5 h-16">
        <div className="">
          <Link href="/add">
            <ArrowLeft />
          </Link>
        </div>
        <div className="text-center text-lg font-semibold">Add Event</div>
        <div></div>
      </div>
    </header>
  );
}
