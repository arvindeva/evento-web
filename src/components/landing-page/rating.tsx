'use client'

import Image from 'next/image'

export default function Rating() {
  return (
    <section className="container flex flex-col gap-y-8 lg:flex-row gap-x-8 py-12 lg:py-16 px-4">
      <div className="flex justify-center flex-col space-y-6 lg:w-1/2">
        <div className="text-xl lg:text-3xl font-bold tracking-tight leading-snug">
          <h1>
            Curate your events journey by adding to your personalized gallery
          </h1>
        </div>
        <p>
          Relive the excitement by uploading your photos and videos,
          transforming moments into lasting memories.
        </p>
      </div>
      <div className="lg:w-1/2">
        <Image
          alt="app mockup"
          src="/images/landing-page/rating-mockup.png"
          width={500}
          height={500}
          priority
        ></Image>
      </div>
    </section>
  )
}
