'use client'

import { createClient } from '@/lib/supabase/client'
import { useQuery } from '@tanstack/react-query'
import Skeleton from '@/app/[username]/Skeleton'
import Card from '@/app/[username]/Card'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistance } from 'date-fns'
import { motion } from 'framer-motion'
import EventoCard from '@/components/ui/EventoCard'
interface FeedProps {
  id: string
}

export default function Feed({ id }: FeedProps) {
  const supabase = createClient()
  const eventosSupabaseQuery = supabase
    .from('eventos')
    .select(
      `id, user_id, slfm_id, profiles ( first_name, last_name, username, avatar_url ), date, artist, venue, city, country, tour, artist_mbid, venue_id, performance_rating, venue_rating`
    )
    .order('date', { ascending: false })
    .range(0, 19)

  const getEvents = async () => {
    return await eventosSupabaseQuery
  }

  const eventsQuery = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  if (eventsQuery.error) {
    console.error(eventsQuery.error.message)
  }
  const eventsList = eventsQuery.data?.data

  console.log(eventsList)

  return (
    <div>
      {eventsQuery.isLoading ? (
        <Skeleton />
      ) : (
        <motion.div
          className="p-4 flex flex-col gap-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
        >
          {eventsList?.map((e) => {
            const cardDate = new Date(e!.date!)

            const monthNames = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]

            const month = monthNames[cardDate.getMonth()].slice(0, 3)
            const day = cardDate.getDate().toString()
            const year = cardDate.getFullYear().toString()
            return (
              <div key={e.id} className="flex flex-col gap-y-3">
                <div className="flex flex-row items-center gap-x-2.5">
                  <div className="rounded-full w-10 h-10 bg-neutral-500 overflow-hidden z-5">
                    <Link href={`/${e.profiles?.username}`}>
                      {e.profiles!.avatar_url ? (
                        <Image
                          src={e.profiles?.avatar_url!}
                          alt="you"
                          width={100}
                          height={100}
                          priority
                        />
                      ) : (
                        <Image
                          src="/images/tom.jpg"
                          alt="you"
                          width={200}
                          height={200}
                          priority
                        />
                      )}
                    </Link>
                  </div>
                  <div className="tracking-medium flex flex-col">
                    <Link
                      href={`/${e.profiles?.username}`}
                      className="font-semibold dark:text-neutral-200 text-base leading-tighter"
                    >
                      {e.profiles?.username}
                    </Link>
                    <div className="text-sm text-neutral-500 dark:text-neutral-300 leading-tighter">
                      {formatDistance(e.date!, new Date())} ago
                    </div>
                  </div>
                </div>
                <Link href={`/evento/${e.id}`}>
                  <EventoCard
                    eventData={{
                      tour: e.tour,
                      date: {
                        day,
                        month,
                        year,
                      },
                      artist: e.artist,
                      venue: e.venue,
                      city: e.city,
                      slfmId: e.slfm_id,
                    }}
                  />
                </Link>
              </div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
