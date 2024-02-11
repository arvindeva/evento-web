'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import ClipLoader from 'react-spinners/ClipLoader'
import { useRouter } from 'next/navigation'

export default function LoginAsGuestButton() {
  const router = useRouter()
  const data = {
    email: 'guest@guest.com',
    password: 'guest1234',
  }

  async function signInAsGuest() {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      router.push('/')
    }
    router.push('/')
    router.refresh()
  }
  return (
    <Button
      className="h-9 w-28 text-xs"
      onClick={signInAsGuest}
      variant="secondary"
    >
      <span>Continue as Guest</span>
    </Button>
  )
}
