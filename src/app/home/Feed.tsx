"use client";

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/[username]/Skeleton";
import Card from "@/app/[username]/Card";
import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";
import { motion } from "framer-motion";

interface FeedProps {
  id: string;
}

export default function Feed({ id }: FeedProps) {
  const supabase = createClient();

  // const eventsSupabaseQuery = supabase
  //   .from("users_events")
  //   .select(
  //     `
  //       id,
  //       user_id,
  //       event_id,
  //       profiles ( first_name, last_name, username ),
  //       events (name, date, artists (id, name),
  //       venues (id, name, location))
  //     `
  //   )
  //   .order("events(date)", { ascending: false });

  // const getEvents = async () => {
  //   return await eventsSupabaseQuery;
  // };
  const eventosSupabaseQuery = supabase
    .from("eventos")
    .select(
      `id, user_id, slfm_id, profiles ( first_name, last_name, username ), date, artist, venue, city, country, tour, artist_mbid, venue_id, performance_rating, venue_rating`
    )
    .order("date", { ascending: false });

  const getEvents = async () => {
    return await eventosSupabaseQuery;
  };

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (eventsQuery.error) {
    console.error(eventsQuery.error.message);
  }

  const eventsList = eventsQuery.data?.data;
  return (
    <div>
      {eventsQuery.isLoading ? (
        <Skeleton />
      ) : (
        <motion.div
          className="p-4 flex flex-col gap-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          {eventsList?.map((e) => {
            return (
              <div key={e.id} className="flex flex-col gap-y-3">
                <div className="flex flex-row items-center gap-x-2.5">
                  <div className="rounded-full w-10 h-10 bg-neutral-500 overflow-hidden z-5">
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
                      className="font-semibold dark:text-neutral-200 text-base"
                    >
                      {e.profiles?.username}
                    </Link>
                    <div className="text-sm text-neutral-500 dark:text-neutral-300">
                      {formatDistance(e.date!, new Date())} ago
                    </div>
                  </div>
                </div>
                <div className="text-base dark:text-neutral-300">
                  Attended{" "}
                  <span className="font-semibold text-secondary-foreground">
                    {e.tour
                      ? `${e.artist} ${e.tour}`
                      : `an event by ${e.artist}`}
                  </span>
                </div>
                <Card
                  eventData={{
                    tour: e.tour,
                    date: e.date,
                    artist: e.artist,
                    venue: e.venue,
                    city: e.city,
                    slfmId: e.slfm_id,
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
