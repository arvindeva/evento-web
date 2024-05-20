import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/ui/Hero'
import Gallery from '@/components/landing-page/gallery'
import Rating from '@/components/landing-page/rating'
import Ratings from '@/components/landing-page/ratings'

import NewNavBar from '@/components/ui/NewNavBar'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: userData } = await supabase.auth.getUser()
  if (userData?.user) {
    redirect('/home')
  }

  return (
    <main>
      <NewNavBar />
      <Hero />
      <Gallery />
      <Rating />
      <Ratings />
    </main>
  )
}
