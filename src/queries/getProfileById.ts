import { Database } from "@/types/supabase";
import { TypedSupabaseClient } from "@/types/typed-supabase-client";

export function getProfileById(client: TypedSupabaseClient, userId: string) {
  console.log("user id");
  console.log(userId);
  return client
    .from("profiles")
    .select()
    .eq("id", userId)
    .throwOnError()
    .single();
}
