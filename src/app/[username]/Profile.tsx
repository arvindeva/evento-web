'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import Skeleton from '@/app/[username]/Skeleton'
import Image from 'next/image'
import EventoCard from '@/components/ui/EventoCard'
import { useToast } from '@/components/ui/use-toast'
import { groupEventsByYear, dateStringToObject } from '@/lib/utils'

interface ProfileProps {
  profile: {
    bio: string | null
    first_name: string | null
    id: string
    last_name: string | null
    updated_at: string | null
    username: string | null
  }
  isOwner: boolean | null
}

export default function Profile(props: ProfileProps) {
  const supabase = createClient()
  const { toast } = useToast()
  const getProfile = async () => {
    return await supabase
      .from('profiles')
      .select(`first_name, last_name, username, avatar_url`)
      .eq('id', props.profile.id)
      .single()
  }

  const eventosSupabaseQuery = supabase
    .from('eventos')
    .select(
      `id, user_id, slfm_id, date, artist, venue, city, country, tour, artist_mbid, venue_id, performance_rating, venue_rating`
    )
    .eq('user_id', props.profile.id)
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
  let venue_ids: (string | null)[] = []
  let artist_ids: (string | null)[] = []

  if (eventsList) {
    for (const event of eventsList) {
      venue_ids.push(event.venue_id)
    }
    for (const event of eventsList) {
      artist_ids.push(event.artist_mbid)
    }
  }

  const uniqueEvents = eventsList?.length
  const uniqueVenues = new Set(venue_ids).size
  const uniqueArtists = new Set(artist_ids).size

  let final: any[] = []
  if (eventosQuery.data?.data) {
    final = groupEventsByYear(eventosQuery.data.data)
    console.log(final)
  }

  return (
    <div className="mt-2 sm:mt-8 mx-auto">
      {profileQuery.isLoading || eventosQuery.isLoading ? (
        <Skeleton />
      ) : (
        <div className="px-4 py-5 flex flex-col gap-y-4">
          <section className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-start gap-x-3">
              <div className="rounded-full w-14 h-14 bg-zinc-500 overflow-hidden">
                {profileQuery.data?.data?.avatar_url ? (
                  <Image
                    src={profileQuery.data?.data?.avatar_url}
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
              {!props.isOwner ? (
                <Button
                  className="text-base rounded-lg bg-purple-600 h-9 active:bg-fuchsia-500"
                  onClick={() => {
                    toast({
                      title: 'Feature is under construction',
                    })
                  }}
                >
                  Follow
                </Button>
              ) : (
                <Link href="/edit">
                  <Button variant="outline" className="py-1 text-sm rounded-xl">
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </section>

          <section className=" bg-gray-100 text-slate-700 dark:bg-slate-800 rounded-2xl flex flex-row justify-evenly items-center py-4 px-2 dark:text-neutral-50 mb-2">
            <div className="flex flex-col items-center w-1/5 text-center ">
              <div className="text-xl font-semibold ">{uniqueEvents}</div>
              <div className="text-base whitespace-nowrap ">Events</div>
            </div>
            <div className="w-1 flex justify-center">
              <div className="bg-zinc-400 w-px h-10" />
            </div>
            <div className="flex flex-col items-center w-1/5">
              <div className="text-xl font-semibold">{uniqueVenues}</div>
              <div className="text-base">Venues</div>
            </div>
            <div className="w-1 flex justify-center">
              <div className="bg-zinc-400 w-px h-10" />
            </div>
            <div className="flex flex-col items-center w-1/5">
              <div className="text-xl font-semibold">{uniqueArtists}</div>
              <div className="text-base">Artists</div>
            </div>
          </section>

          <section>
            {final.length === 0 && props.isOwner && (
              <div className="mt-12 flex flex-col items-center">
                <h1 className="font-semibold mb-2">No Events Yet</h1>
                <p className="text-muted-foreground text-base mb-4">
                  Add your first event by tapping the button below
                </p>
                <Link href="/add">
                  <Button className="w-50">Add Event</Button>
                </Link>
              </div>
            )}
            {final.length === 0 && !props.isOwner && (
              <div className="mt-12 flex flex-col gap-y-2 items-center">
                <p className="text-muted-foreground text-base">
                  This user has no events yet.
                </p>
              </div>
            )}
            {final.length > 0 && (
              <div className="flex flex-col gap-y-6">
                {final.map((evento: any) => {
                  return (
                    <div key={evento.year} className="flex flex-col gap-y-1">
                      <div className="flex flex-row justify-between items-end">
                        <div className="text-[2.2rem] font-black bg-gradient-to-b from-slate-900 via-zinc-600 to-white dark:bg-gradient-to-b dark:from-slate-400 dark:via-zinc-500 dark:to-black text-transparent bg-clip-text leading-none">
                          {evento.year}
                        </div>
                        <Link
                          href={`/${profileQuery.data?.data?.username}/events?year=${evento.year}`}
                        >
                          <div className="text-purple-500 font-semibold active:text-fuchsia-500 hover:text-fuchsia-500">
                            See All ({evento.events.length})
                          </div>
                        </Link>
                      </div>

                      <div>
                        <Link
                          href={`/${profileQuery.data?.data?.username}/events?year=${evento.year}`}
                        >
                          <div className="box-border active:border hover:border border-fuchsia-500 rounded-2xl">
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
                          </div>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
