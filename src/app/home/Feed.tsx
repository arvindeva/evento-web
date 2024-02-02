"use client";

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/[username]/Skeleton";
import Card from "@/app/[username]/Card";
import Link from "next/link";

interface FeedProps {
  id: string;
}

export default function Feed({ id }: FeedProps) {
  const supabase = createClient();

  const eventsSupabaseQuery = supabase
    .from("users_events")
    .select(
      `
        id, 
        user_id, 
        event_id, 
        profiles ( first_name, last_name, username ), 
        events (name, date, artists (id, name), 
        venues (id, name, location), 
        promoters (name))
      `
    )
    .order("events(date)", { ascending: false });

  const getEvents = async () => {
    return await eventsSupabaseQuery;
  };

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (eventsQuery.error) {
    console.log("events error");
    console.log(eventsQuery.error.message);
  }

  console.log(eventsQuery.data);
  const eventsList = eventsQuery.data?.data;
  console.log(eventsList);
  return (
    <div>
      {eventsQuery.isLoading ? (
        <Skeleton />
      ) : (
        <div className="p-4 flex flex-col gap-y-10">
          {eventsList?.map((e) => {
            return (
              <div key={e.id} className="flex flex-col gap-y-3">
                <div className="tracking-medium">
                  <Link
                    href={`/${e.profiles?.username}`}
                    className="font-semibold text-purple-800 dark:text-purple-500"
                  >
                    {e.profiles?.first_name} {e.profiles?.last_name}
                  </Link>{" "}
                  went to {e.events?.name}
                </div>
                <Card
                  eventData={{
                    eventName: e.events!.name,
                    date: e.events!.date,
                    artist: e.events!.artists!.name,
                    venue: e.events!.venues!.name,
                    eventId: e.event_id,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
