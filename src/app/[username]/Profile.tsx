'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { createClient } from '@/lib/supabase/client'
import { QueryData, User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Skeleton from '@/app/[username]/Skeleton'

import Card from './Card'
import Image from 'next/image'
import LogoutButton from '@/components/ui/LogoutButton'
import ThemeToggle from '@/components/ui/ThemeToggle'
import EventoCard from '@/components/ui/EventoCard'
interface ProfileProps {
  profile: {
    bio: string | null
    first_name: string | null
    id: string
    last_name: string | null
    updated_at: string | null
    username: string | null
  } | null
  isOwner: boolean | null
}

export default function Profile(props: ProfileProps) {
  const supabase = createClient()

  const getProfile = async () => {
    return await supabase
      .from('profiles')
      .select(`first_name, last_name, username, avatar_url`)
      .eq('id', props.profile!.id)
      .single()
  }

  const eventosSupabaseQuery = supabase
    .from('eventos')
    .select(
      `id, user_id, slfm_id, date, artist, venue, city, country, tour, artist_mbid, venue_id, performance_rating, venue_rating`
    )
    .eq('user_id', props.profile!.id)
    .order('date', { ascending: false })

  const getEvents = async () => {
    return await eventosSupabaseQuery
  }

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const eventosQuery = useQuery({
    queryKey: ['eventos'],
    queryFn: getEvents,
  })

  if (profileQuery.error) {
    console.error(profileQuery.error.message)
  }

  if (eventosQuery.error) {
    console.error(eventosQuery.error.message)
  }

  const eventsList = eventosQuery.data?.data
  let venue_ids: string[] = []
  let artist_ids: string[] = []

  if (eventsList) {
    for (const event of eventsList) {
      venue_ids.push(event!.venue_id!)
    }
    for (const event of eventsList) {
      artist_ids.push(event!.artist_mbid!)
    }
  }

  const uniqueEvents = eventsList?.length
  const uniqueVenues = new Set(venue_ids).size
  const uniqueArtists = new Set(artist_ids).size

  let yearList = eventsList?.map((evento) => {
    return new Date(evento!.date!).getFullYear()
  })

  const yearInserted = eventsList?.map((evento, i) => {
    return { ...evento, year: yearList![i] }
  })

  let final: any
  const groupBy = (values: any, keyFinder: any) => {
    // using reduce to aggregate values
    return values.reduce((a: any, b: any) => {
      // depending upon the type of keyFinder
      // if it is function, pass the value to it
      // if it is a property, access the property
      const key = typeof keyFinder === 'function' ? keyFinder(b) : b[keyFinder]

      // aggregate values based on the keys
      if (!a[key]) {
        a[key] = [b]
      } else {
        a[key] = [...a[key], b]
      }

      return a
    }, {})
  }
  if (eventosQuery.data?.data) {
    const resultsByYear = groupBy(yearInserted!, ({ year }: any) => year!)
    final = resultsByYear

    let ready = []

    for (const [key, value] of Object.entries(final)) {
      ready.push({ year: key, events: value })
    }

    let orderedReady = ready.reverse()
    console.log(orderedReady)

    final = orderedReady
  }

  interface DateObject {
    day: string
    month: string
    year: string
  }

  function dateStringToObject(dateString: string): DateObject {
    const cardDate = new Date(dateString)

    console.log(dateString)
    console.log(cardDate)

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

    return { day, month, year }
  }

  return (
    <div className="">
      {profileQuery.isLoading || eventosQuery.isLoading ? (
        <Skeleton />
      ) : (
        <div className="px-4 py-5 flex flex-col gap-y-4">
          <section className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-start gap-x-3">
              <div className="rounded-full w-14 h-14 bg-zinc-500 overflow-hidden">
                {profileQuery.data?.data?.avatar_url ? (
                  <Image
                    src={profileQuery.data?.data?.avatar_url!}
                    alt="you"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src="/images/tom.jpg"
                    alt="you"
                    width={200}
                    height={200}
                  />
                )}
              </div>
              <div>
                <div className="text-xl font-bold tracking-base">
                  {profileQuery.data?.data?.first_name}{' '}
                  {profileQuery.data?.data?.last_name}
                </div>
                <div className="text-base font-base tracking-wide text-zinc-500 dark:text-zinc-400">
                  @{profileQuery.data?.data?.username}
                </div>
              </div>
            </div>
            <div>
              {!props.isOwner ? null : (
                <Link href="/edit">
                  <Button variant="outline" className="py-1 text-sm rounded-xl">
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </section>

          <section className=" bg-gradient-to-r from-indigo-500  via-purple-500 to-purple-500 rounded-2xl flex flex-row justify-evenly items-center py-4 px-2 text-neutral-50 mb-2">
            <div className="flex flex-col items-center w-1/5 text-center ">
              <div className="text-xl font-semibold ">{uniqueEvents}</div>
              <div className="text-sm whitespace-nowrap ">Live events</div>
            </div>
            <div className="w-1 flex justify-center">
              <div className="bg-zinc-400 w-px h-10" />
            </div>
            <div className="flex flex-col items-center w-1/5">
              <div className="text-xl font-semibold">{uniqueVenues}</div>
              <div className="text-sm">Venues</div>
            </div>
            <div className="w-1 flex justify-center">
              <div className="bg-zinc-400 w-px h-10" />
            </div>
            <div className="flex flex-col items-center w-1/5">
              <div className="text-xl font-semibold">{uniqueArtists}</div>
              <div className="text-sm">Artists</div>
            </div>
          </section>

          <section>
            {final && (
              <div className="flex flex-col gap-y-6">
                {final.map((evento: any) => {
                  return (
                    <div key={evento.year} className="flex flex-col gap-y-1">
                      <div className="flex flex-row justify-between items-end">
                        <div className="text-5xl font-black bg-gradient-to-b from-slate-500 via-zinc-600 to-black text-transparent bg-clip-text leading-none">
                          {evento.year}
                        </div>
                        <Link
                          href={`/${profileQuery.data?.data?.username}/events?year=${evento.year}`}
                        >
                          <div className="text-purple-500 font-semibold">
                            See All ({evento.events.length})
                          </div>
                        </Link>
                      </div>

                      <div>
                        <Link
                          href={`/${profileQuery.data?.data?.username}/events?year=${evento.year}`}
                        >
                          <EventoCard
                            eventData={{
                              tour: evento.events[0].tour,
                              date: dateStringToObject(evento.events[0].date),
                              artist: evento.events[0].artist,
                              venue: evento.events[0].venue,
                              slfmId: evento.events[0].slfm_id,
                              city: evento.events[0].city,
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* <section className="flex flex-col ">
            <div className="flex flex-row justify-between items-center pt-4">
              <div className="text-xl font-bold tracking-tight mb-3">
                {profileQuery.data?.data?.first_name}&apos;s events
              </div>
            </div>
            <div className="text-center dark:text-zinc-400">
              {eventsList?.length === 0 && props.isOwner && (
                <div className="flex flex-col gap-y-4 mt-2">
                  <div>You have no events... try adding some!</div>
                  <Link href="/add" className="w-full">
                    <Button className="w-full flex flex-row items-center gap-x-2">
                      <Plus width={18} height={18} />
                      Add Event
                    </Button>
                  </Link>
                </div>
              )}
              {eventsList?.length === 0 && !props.isOwner && (
                <div className="flex flex-col gap-y-4 mt-2">
                  <div>
                    {profileQuery.data?.data?.username} have no events...
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-6">
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
                      slfmId: e.slfm_id,
                      city: e.city,
                    }}
                    key={e.id}
                  />
                )
              })}
            </div>
          </section> */}
        </div>
      )}
    </div>
  )
}
