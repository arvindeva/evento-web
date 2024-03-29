import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import MyNavBar from '@/components/ui/MyNavBar'
import Feed from './Feed'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    redirect('/')
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', userData.user.id)
    .limit(1)
    .single()

  if (profileError || !profileData) {
    return <div>error fetching data</div>
  }

  return (
    <main>
      <MyNavBar
        profile
        add
        login={false}
        authed={true}
        username={profileData.username}
      />
      <div className="mt-4 mb-4 px-4 max-w-lg sm:mx-auto">
        <h2 className="text-[32px] font-bold tracking-tight text-secondary-foreground">
          Hi,{' '}
          <span className="bg-gradient-to-r from-gradient-start  to-gradient-end text-transparent bg-clip-text">
            {' '}
            {profileData.username}
          </span>
          !
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Here are the latest activities of other users.
        </p>
      </div>

      <div className="max-w-lg sm:mx-auto">
        <Feed />
      </div>
    </main>
  )
}
