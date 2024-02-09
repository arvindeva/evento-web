import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

import Profile from './Profile'
import MyNavBar from '@/components/ui/MyNavBar'

export default async function UserPage({
  params,
}: {
  params: { username: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: userData, error: userError } = await supabase.auth.getUser()
  const { data: ownerData, error: ownerError } = await supabase
    .from('profiles')
    .select()
    .eq('id', userData!.user!.id)
    .single()
  if (ownerError) {
    console.error('something went wrong')
  }

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
      <MyNavBar authed={authed} username={ownerData!.username} add />
      <div className="max-w-lg sm:mx-auto">
        <Profile profile={profileData} isOwner={isOwner} />
      </div>
    </div>
  )
}
