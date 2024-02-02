import { createClient } from "@/lib/supabase/client";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";

const supabase = createClient();

export const eventsSupabaseQuery = supabase
  .from("users_events")
  .select(
    `id, user_id, event_id, events (name, date, artists (id, name), venues (id, name, location), promoters (name))`
  )
  .order("events(date)", { ascending: true });

export type Events = QueryData<typeof eventsSupabaseQuery>;
