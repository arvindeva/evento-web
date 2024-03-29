import { login, signup, loginAsGuest } from './actions'
import { Input } from '@/components/ui/input'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import MyNavBar from '@/components/ui/MyNavBar'

import { Alert, AlertDescription } from '@/components/ui/alert'
import SubmitButton from './SubmitButton'
import LoginAsGuestButton from './LoginAsGuestButton'

interface ILoginPage {
  searchParams: {
    error: string
    type: string
  }
}

export default async function LoginPage({ searchParams }: ILoginPage) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userData?.user) {
    redirect('/')
  }
  return (
    <>
      <MyNavBar authed={false} username={null} />
      <div className="max-w-xl mx-auto">
        {searchParams.error === 'true' && (
          <div className="p-4">
            <Alert className="bg-red-700 text-zinc-100">
              <AlertDescription className="text-lg">
                Authentication error.
              </AlertDescription>
            </Alert>
          </div>
        )}
        <div>
          <form className="p-4 flex flex-col gap-y-4 mt-4" action={login}>
            <h1 className="text-2xl font-extrabold">Login</h1>
            <p className="mb-0 text-base text-zinc-500">
              Welcome back! Please enter your account information or continue as
              guest.
            </p>
            <LoginAsGuestButton />
            <div className="flex flex-col gap-y-2 mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="dark:border-gray-700"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="dark:border-gray-700"
              />
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
    </>
  )
}
