"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { QueryData, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { eventsSupabaseQuery, Events } from "./types/events";

import Card from "./Card";

interface ProfileProps {
  profile: {
    bio: string | null;
    first_name: string | null;
    id: string;
    last_name: string | null;
    updated_at: string | null;
    username: string | null;
  } | null;
}

export default function Profile(props: ProfileProps) {
  const supabase = createClient();

  const getProfile = async () => {
    console.log("getProfile trigerred");
    return await supabase
      .from("profiles")
      .select(`first_name, last_name, username`)
      .eq("id", props.profile!.id)
      .single();
  };

  const getEvents = async () => {
    return await eventsSupabaseQuery;
  };

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (profileQuery.error) {
    console.log(profileQuery.error.message);
  }

  if (eventsQuery.error) {
    console.log(eventsQuery.error.message);
  }

  const eventsList = eventsQuery.data?.data;
  let venue_ids: number[] = [];
  let artist_ids: number[] = [];

  if (eventsList) {
    for (const event of eventsList) {
      venue_ids.push(event!.events!.venues!.id);
    }
    for (const event of eventsList) {
      artist_ids.push(event!.events!.artists!.id);
    }
  }
  const uniqueEvents = eventsList?.length;
  const uniqueVenues = new Set(venue_ids).size;
  const uniqueArtists = new Set(artist_ids).size;

  return (
    <div>
      {profileQuery.isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="px-4 py-8 flex flex-col gap-y-6">
          <section className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-start gap-x-4">
              <div className="rounded-full w-14 h-14 bg-zinc-500"></div>
              <div>
                <div className="text-xl font-semibold">
                  {profileQuery.data?.data?.first_name} Wibisono
                </div>
                <div className="text-sm">
                  @{profileQuery.data?.data?.username}
                </div>
              </div>
            </div>
            <div>
              <Settings width={30} height={30} />
            </div>
          </section>

          <section className=" bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex flex-row justify-evenly items-center py-4 px-2 text-neutral-50">
            <div className="flex flex-col items-center w-1/5 text-center ">
              <div className="text-xl font-semibold ">{uniqueEvents}</div>
              <div className="text-sm whitespace-nowrap ">Live events</div>
            </div>
            <div className="w-1 flex justify-center">
              <div className="bg-zinc-400 w-px h-10" />
            </div>
            <div className="flex flex-col items-center w-1/5">
              <div className="text-xl font-semibold">{uniqueVenues}</div>
              <div className="text-sm">Venues</div>
            </div>
            <div className="w-1 flex justify-center">
              <div className="bg-zinc-400 w-px h-10" />
            </div>
            <div className="flex flex-col items-center w-1/5">
              <div className="text-xl font-semibold">{uniqueArtists}</div>
              <div className="text-sm">Artists</div>
            </div>
          </section>

          <section className="flex flex-col gap-y-3">
            <div className="flex flex-row justify-between items-center pt-4">
              <div className="text-xl font-semibold">Arvindeva's events</div>
              <div className="text-sm">See all (7)</div>
            </div>
            {eventsList?.map((e) => {
              return (
                <Card
                  eventData={{
                    eventName: e.events!.name,
                    date: e.events!.date,
                    artist: e.events!.artists!.name,
                    venue: e.events!.venues!.name,
                    eventId: e.event_id,
                  }}
                  key={e.id}
                />
              );
            })}
          </section>
        </div>
      )}
    </div>
  );
}
