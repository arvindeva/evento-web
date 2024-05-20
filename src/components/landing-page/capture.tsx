'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ibm_plex_serif } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function Capture() {
  return (
    <section className="py-8 lg:py-16 bg-gradient-to-r from-indigo-600 to-purple-500 px-4">
      <div className="container flex flex-col space-y-6 items-center">
        <h2 className="max-lg:text-center text-3xl lg:text-4xl font-bold tracking-tight leading-snug text-white">
          Capture your events,{' '}
          <span className={cn('italic', ibm_plex_serif.className)}>now</span>
        </h2>
        <div className="flex flex-col gap-y-4 lg:flex-row items-center gap-x-4 text-white">
          <div className="w-[156px] h-[50px]">
            <Link href="#">
              <Image
                src="/svg/app-store-badge.svg"
                alt="app store badge"
                width={156}
                height={50}
                priority
                className="h-full w-full"
              />
            </Link>
          </div>
          <span>or</span>
          <Link href="/login">
            <Button
              variant="outline"
              className="dark:text-white dark:border-none"
            >
              Register
            </Button>
          </Link>
          <span>on Web.</span>
        </div>
      </div>
    </section>
  )
}
