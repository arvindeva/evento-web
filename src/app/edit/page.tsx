import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import MyNavBar from '@/components/ui/MyNavBar'
import EditProfileForm from '@/app/edit/EditProfileForm'

export default async function EditPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError) {
    console.error(userError)
    redirect('/')
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', userData.user.id)
    .limit(1)
    .single()

  if (profileError) {
    console.error(profileError.message)
    redirect('/')
  }

  return (
    <div>
      <MyNavBar profile username={profileData.username} authed={true} />
      <EditProfileForm userId={userData.user.id} />
    </div>
  )
}
