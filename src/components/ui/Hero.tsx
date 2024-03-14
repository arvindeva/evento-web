'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ibm_plex_serif } from '@/app/fonts'
import { cn } from '@/lib/utils'

export default function Hero() {
  return (
    <section className="container flex flex-col gap-y-8 lg:flex-row lg:justify-between py-8 lg:py-16 px-4">
      <div className="flex justify-center flex-col space-y-6">
        <div className="text-3xl lg:text-7xl font-bold tracking-tight leading-snug">
          <h1>
            Capture{' '}
            <span className={cn('italic', ibm_plex_serif.className)}>
              memories,
            </span>
          </h1>
          <h1>
            share{' '}
            <span className={cn('italic', ibm_plex_serif.className)}>
              feedback,
            </span>
          </h1>
          <h1>
            relive{' '}
            <span className={cn('italic', ibm_plex_serif.className)}>
              events.
            </span>
          </h1>
        </div>
        <p className="text-base lg:text-lg">
          Join a community of event enthusiasts, where every memory matters.
        </p>
        <Link href="">
          <div className="w-[156px] h-[50px]">
            <Image
              src="/svg/app-store-badge.svg"
              alt="app store badge"
              width={156}
              height={50}
              priority
              className="h-full w-full"
            />
          </div>
        </Link>
      </div>
      <div className="">
        <Image
          alt="app mockup"
          src="/images/landing-page/hero-mockup.png"
          width={550}
          height={550}
          priority
        ></Image>
      </div>
    </section>
  )
}
