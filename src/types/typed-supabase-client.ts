import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export type TypedSupabaseClient = SupabaseClient<Database>;
