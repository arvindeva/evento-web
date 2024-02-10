import { source_serif_4, jetbrains_mono } from '@/app/fonts'
import { cn } from '@/lib/utils'
import concertImage from '../../../public/images/concert.jpg'
import Image from 'next/image'

interface IEventoCard {
  eventData: {
    date: {
      day: string | null
      month: string | null
      year: string | null
    } | null
    artist: string | null
    venue: string | null
    slfmId: string | null
    city: string | null
    tour: string | null
  } | null
}

export default function EventoCard({ eventData }: IEventoCard) {
  return (
    <div className="relative overflow-hidden h-[160px] justify-between rounded-2xl">
      <div className="flex flex-row h-full">
        <div className="absolute inline-block -z-10 inset-0 bg-slate-900">
          <Image
            src={concertImage}
            alt="hi"
            fill
            style={{ objectFit: 'cover' }}
            className="static opacity-20"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div
          className={cn(
            'flex flex-col p-3 px-5 justify-center items-center  backdrop-grayscale text-zinc-50  bg-gradient-to-b from-violet-500 to-fuchsia-700 bg-opacity-50',
            jetbrains_mono.className
          )}
        >
          <h1 className="text-lg leading-none">{eventData?.date?.day}</h1>
          <h1 className="text-2xl font-semibold uppercase">
            {eventData?.date?.month}
          </h1>
          <h1 className="text-lg leading-none">{eventData?.date?.year}</h1>
        </div>
        <div className="py-3 px-5 flex flex-col items-end w-full justify-between text-slate-50">
          <div className="flex flex-col items-end text-right">
            <h1
              className={cn(
                'font-bold font-serif tracking-wide text-wrap leading-snug',
                source_serif_4.className,
                eventData!.artist!.length < 17 ? 'text-3xl' : 'text-xl',
                'leading-tight'
              )}
            >
              {eventData?.artist}
            </h1>
            <h2 className="font-light text-sm">{eventData?.tour}</h2>
          </div>
          <div className="flex flex-col items-end text-right">
            <div className="text-sm text-right">{eventData?.venue}</div>
            <div className="font-semibold text-xl">{eventData?.city}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
