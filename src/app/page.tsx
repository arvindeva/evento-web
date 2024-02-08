import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MyNavBar from '@/components/ui/MyNavBar'
import Hero from '@/components/ui/Hero'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: userData } = await supabase.auth.getUser()
  if (userData?.user) {
    redirect('/home')
  }

  return (
    <main className="">
      <MyNavBar
        profile={false}
        add={false}
        login
        authed={false}
        username={null}
      />
      <Hero />
    </main>
  )
}
