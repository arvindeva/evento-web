import { Database } from '@/types/supabase'
import { TypedSupabaseClient } from '@/types/typed-supabase-client'

export function getProfileById(client: TypedSupabaseClient, userId: string) {
  return client
    .from('profiles')
    .select()
    .eq('id', userId)
    .throwOnError()
    .single()
}
