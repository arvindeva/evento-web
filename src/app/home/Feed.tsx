"use client";

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/[username]/Skeleton";
import Card from "@/app/[username]/Card";
import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";

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
                <div className="flex flex-row items-center gap-x-4">
                  <div className="rounded-full w-14 h-14 bg-zinc-500 overflow-hidden z-5">
                    <Image
                      src="/images/tom.jpg"
                      alt="you"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="tracking-medium flex flex-col">
                    <Link
                      href={`/${e.profiles?.username}`}
                      className="font-bold"
                    >
                      {e.profiles?.first_name} {e.profiles?.last_name}
                    </Link>
                    <div className="text-sm text-zinc-300">
                      {formatDistance(e.events!.date!, new Date())} ago
                    </div>
                  </div>
                </div>
                <div>
                  I went to <span className="font-bold">{e.events!.name}</span>
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
