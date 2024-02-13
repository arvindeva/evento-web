import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileNavBar from '@/app/[username]/ProfileNavBar'
import EventoCard from '@/components/ui/EventoCard'
import { dateStringToObject } from '@/lib/utils'
import Ratings from './Ratings'
import Link from 'next/link'

export default async function EventoPage({
  params,
}: {
  params: { id: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError) {
    console.error(userError)
    redirect('/')
  }

  const { data: eventoData, error: eventoError } = await supabase
    .from('eventos')
    .select()
    .eq('id', parseInt(params.id))
    .single()

  if (eventoError) {
    console.error(eventoError)
    notFound()
  }

  const { data: profileData, error: profileDataError } = await supabase
    .from('profiles')
    .select()
    .eq('id', eventoData!.user_id!)
    .single()

  if (profileDataError) {
    console.error(profileDataError)
    notFound()
  }

  let eventData = {
    date: dateStringToObject(eventoData.date!),
    artist: eventoData?.artist,
    venue: eventoData?.venue,
    slfmId: eventoData?.slfm_id,
    city: eventoData?.city,
    tour: eventoData?.tour,
    artistMbid: eventoData?.artist_mbid,
  }

  const isOwner = userData.user.id === profileData.id

  return (
    <div>
      <ProfileNavBar userId={userData.user.id} />
      <div className="p-4 flex flex-col gap-y-4">
        {isOwner ? (
          <h1>My event</h1>
        ) : (
          <h1>
            <span className="font-bold text-primary">
              <Link href={`/${profileData.username}`}>
                <span className="active:text-fuchsia-500">{`${profileData.username}`}</span>
              </Link>
            </span>
            &apos;s event
          </h1>
        )}
        <EventoCard eventData={eventData} />
      </div>
      <Ratings
        isOwner={isOwner}
        username={profileData.username!}
        venueRating={eventoData.venue_rating!}
        performanceRating={eventoData.performance_rating!}
      />
    </div>
  )
}
