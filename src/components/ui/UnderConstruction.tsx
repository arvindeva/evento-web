import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function UnderConstruction() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full flex items-center justify-between px-4 border-b h-14 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link className="flex items-center" href="/home">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-primary to-red-500 text-transparent bg-clip-text">
            Evento <span className="text-lg font-light text-primary">v0.0</span>
          </h1>
          <span className="sr-only">Evento</span>
        </Link>
        <ThemeToggle></ThemeToggle>
      </header>
      <div className="max-w-4xl mx-auto text-center p-4">
        <div className="text-[26px] md:text-[50px] mt-36 font-bold ">
          ✨
          <span className="bg-gradient-to-r from-indigo-600 via-primary to-red-500 text-transparent bg-clip-text">
            Under Construction
          </span>
          ✨
        </div>
        <div className="text-[18px] md:text-[36px] mt-36">
          <Link href="/" className="underline">
            return home
          </Link>
        </div>
      </div>
    </>
  )
}
