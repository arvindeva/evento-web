import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import Form from './Form'
import MyNavBar from '@/components/ui/MyNavBar'
import { redirect } from 'next/navigation'

interface EventResponse {
  id: string
  eventDate: string
  artist: {
    mbid: string
    name: string
  }
  venue: {
    name: string
    city: {
      name: string
      country: {
        name: string
      }
    }
    id: string
  }
  tour: {
    name: string
  }
}

export default async function DetailsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    console.error(userError?.message || 'Fetching user failed.')
    redirect('/')
  }
  const { data: profileDataArray, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', userData.user!.id)

  const profileData = profileDataArray && profileDataArray[0]
  if (profileError || !profileData) {
    console.error(profileError?.message || 'Error fetching user')
    redirect('/')
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROUTE_HANDLER_URL}/api/event/${searchParams.event_id}`
  )

  const data: EventResponse = await res.json()

  const { data: userEventData, error: userEventError } = await supabase
    .from('eventos')
    .select('*')
    .eq('user_id', userData.user!.id)
    .eq('slfm_id', data!.id)

  if (userEventError) {
    console.error('fetching eventos failed.')
    redirect('/')
  }

  if (userEventData.length > 0) {
    redirect(`/add?error=true&type=user_event_already_exist`)
  }

  const eventData = {
    id: data.id,
    tour: data.tour?.name,
    date: data.eventDate,
    artist: data.artist.name,
    venue: data.venue.name,
    userId: userData.user.id,
    artistMbid: data.artist.mbid,
    venueId: data.venue.id,
    city: data.venue.city.name,
    country: data.venue.city.country.name,
  }

  return (
    <div>
      <MyNavBar profile username={profileData.username!} authed />
      <Form eventData={{ ...eventData }} />
    </div>
  )
}
