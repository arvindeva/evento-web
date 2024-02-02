import { createClient } from "@/lib/supabase/client";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";

const supabase = createClient();

export const eventsSupabaseQuery = supabase
  .from("users_events")
  .select(
    `user_id, event_id, events (name, date, artists (name), venues (name, location), promoters (name))`
  )
  .order("events(date)", { ascending: true });

export type Events = QueryData<typeof eventsSupabaseQuery>;
