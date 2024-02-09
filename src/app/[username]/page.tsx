import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

import Profile from './Profile'
import MyNavBar from '@/components/ui/MyNavBar'
import ProfileNavBar from './ProfileNavBar'

export default async function UserPage({
  params,
}: {
  params: { username: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: userData, error: userError } = await supabase.auth.getUser()

  const { data: profileDataArray, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('username', params.username)

  const profileData = profileDataArray && profileDataArray[0]
  const isOwner =
    userData.user && profileData && userData.user.id === profileData.id

  const authed = !!userData.user

  if (!profileData) {
    notFound()
  }

  return (
    <div>
      {userData.user ? (
        <ProfileNavBar userId={userData.user.id} />
      ) : (
        <MyNavBar authed={false} username={null} />
      )}
      <div className="max-w-lg sm:mx-auto">
        <Profile profile={profileData} isOwner={isOwner} />
      </div>
    </div>
  )
}
