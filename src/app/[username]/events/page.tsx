import UnderConstruction from '@/components/ui/UnderConstruction'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileNavBar from '../ProfileNavBar'
import MyNavBar from '@/components/ui/MyNavBar'
import EventoCard from '@/components/ui/EventoCard'
import { dateStringToObject } from '@/lib/utils'
import Link from 'next/link'

interface IEventsPage {
  searchParams: {
    year: number
  }
  params: {
    username: string
  }
}

export default async function EventsPage({
  searchParams,
  params,
}: IEventsPage) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  console.log(searchParams.year)
  const { data: userData, error: userError } = await supabase.auth.getUser()

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('username', params.username)
    .single()

  if (profileError) {
    console.error(profileError)
    notFound()
  }

  const { data: eventosData, error: eventosError } = await supabase
    .from('eventos')
    .select()
    .eq('user_id', profileData!.id)
    .gte('date', `${searchParams.year.toString()}-01-01`)
    .lte('date', `${searchParams.year.toString()}-12-31`)
    .order('date', { ascending: false })

  if (eventosError) {
    console.error(eventosError)
    notFound()
  }

  console.log(userData)
  console.log(eventosData)

  return (
    <>
      {userData.user ? (
        <ProfileNavBar userId={userData.user.id} />
      ) : (
        <MyNavBar authed={false} username={null} />
      )}
      <div className="p-4 mx-auto max-w-lg">
        <h1 className="mb-6 text-3xl">
          <span className="text-primary">
            <Link href={`/${profileData.username}`}>
              <span className="active:text-fuchsia-500 hover:text-fuchsia-700">
                {profileData.username}
              </span>
            </Link>
          </span>
          <span className="text-xl">&apos;s {searchParams.year} events</span>
        </h1>
        <div className="flex flex-col gap-y-8">
          {eventosData?.map((evento) => {
            return (
              <div key={evento.id}>
                <Link href={`/evento/${evento.id}`}>
                  <div className="box-border active:border hover:border border-fuchsia-500 rounded-2xl">
                    <EventoCard
                      eventData={{
                        date: dateStringToObject(evento.date!),
                        artist: evento.artist,
                        venue: evento.venue,
                        slfmId: evento.slfm_id,
                        city: evento.city,
                        tour: evento.tour,
                      }}
                    />
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
