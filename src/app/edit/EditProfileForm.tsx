'use client'

import { createClient } from '@/lib/supabase/client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { Alert } from '@/components/ui/alert'

interface IEditProfileForm {
  userId: string
}

interface EditProfilePayload {
  username?: string
  first_name?: string
  last_name?: string
}

const formSchema = z.object({
  first_name: z.string().min(1).max(40).or(z.literal('')),
  last_name: z.string().min(1).max(40).or(z.literal('')),
  username: z.string().min(3).max(20).or(z.literal('')),
})

export default function EditProfileForm({ userId }: IEditProfileForm) {
  const supabase = createClient()
  const router = useRouter()

  const getProfileById = async () => {
    return await supabase
      .from('profiles')
      .select(`first_name, last_name, username, avatar_url`)
      .eq('id', userId)
      .single()
  }

  const {
    data: profileData,
    isPending: profileIsPending,
    error: profileError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileById,
  })

  if (profileError) {
    console.error(profileError.message)
  }

  // define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (payload: EditProfilePayload) => {
      return await supabase
        .from('profiles')
        .update(payload)
        .eq('id', userId)
        .select()
        .single()
    },
    onSuccess: (data, variables, context) => {
      console.log('SUCCESS')
      console.log(data)
      router.push(`/${data?.data?.username}`)
    },
  })

  // submit handler
  function onSubmit({
    first_name,
    last_name,
    username,
  }: z.infer<typeof formSchema>) {
    let payload: { [k: string]: any } = {}

    if (first_name !== '') {
      payload.first_name = first_name
    }
    if (last_name !== '') {
      payload.last_name = last_name
    }
    if (username !== '') {
      payload.username = username
    }

    console.log(payload)

    mutation.mutate(payload)
  }

  return (
    <div className="mt-3 mx-auto max-w-lg p-4 flex flex-col gap-y-4">
      <h1 className="text-2xl font-semibold mb-8">Edit Profile</h1>
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex flex-col items-center gap-y-4">
          {profileIsPending && (
            <Skeleton className="w-20 h-20 rounded-full bg-gray-400"></Skeleton>
          )}
          {profileData?.data?.avatar_url && !profileIsPending && (
            <div className="rounded-full w-20 h-20 bg-zinc-500 overflow-hidden">
              <Image
                src={profileData?.data?.avatar_url!}
                alt="you"
                width={100}
                height={100}
                placeholder="blur"
                blurDataURL={profileData?.data?.avatar_url!}
              />
            </div>
          )}
          {!profileData?.data?.avatar_url && !profileIsPending && (
            <div className="rounded-full w-20 h-20 bg-zinc-500 overflow-hidden">
              <Image src="/images/tom.jpg" alt="you" width={100} height={100} />
            </div>
          )}

          <h2 className="text-xl font-semibold">Edit Picture (WIP)</h2>
        </div>
        {mutation.isError && (
          <Alert
            variant="destructive"
            className="bg-red-500 text-white text-base"
          >
            There's an error during submission
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={profileData?.data?.username || 'Username'}
                        className="text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          profileData?.data?.first_name || 'First name'
                        }
                        className="text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          profileData?.data?.last_name || 'Last name'
                        }
                        className="text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full mt-10">
              {mutation.isPending ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
