"use client";
import React, { useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FilterX } from "lucide-react";
import Combobox from "./ComboBox";
import ky from "ky";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface EventsResponse {
  itemsPerPage: number;
  page: number;
  setlist: Setlist[];
  total: number;
  type: string;
}

interface Setlist {
  id: string;
  eventDate: string;
  artist: {
    mbid: string;
    name: string;
  };
  venue: {
    name: string;
    city: {
      name: string;
      country: {
        name: string;
      };
    };
  };
  tour: {
    name: string;
  };
}

interface NotFoundResponse {
  code: string;
  status: string;
  message: string;
  timestamp: string;
}

export default function Form(props: ProfileProps) {
  const supabase = createClient();
  const router = useRouter();
  const [selectedMbid, setSelectedMbid] = useState<string>("");
  const [eventResults, setEventResults] = useState<EventsResponse | null>(null);
  const [value, setValue] = React.useState("");

  async function getEventsByMbid(selected: string) {
    setSelectedMbid(selected);
    const data = await ky
      .get(
        `${process.env.NEXT_PUBLIC_EVENTO_API_URL}/search/events/${selected}`
      )
      .json<EventsResponse>();
    setEventResults(data);
  }

  // async function getEventsByMbid
  async function handleValueChange(newValue: string) {
    setValue(newValue);
    if (newValue === "") {
      const data = await ky
        .get(
          `${process.env.NEXT_PUBLIC_EVENTO_API_URL}/search/events/${selectedMbid}`
        )
        .json<EventsResponse>();
      setEventResults(data);
    } else {
      const data = await ky
        .get(
          `${process.env.NEXT_PUBLIC_EVENTO_API_URL}/search/events?artistMbid=${selectedMbid}&year=${newValue}&p=1`
        )
        .json<EventsResponse>();
      setEventResults(data);
    }
  }

  return (
    <div className="form-widget p-4 flex flex-col gap-y-4">
      <Combobox getEventsByMbid={getEventsByMbid} />
      <Select value={value} onValueChange={handleValueChange}>
        <div className="flex flex-row items-center gap-x-5">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Year">{value}</SelectValue>
          </SelectTrigger>
          <Button variant="outline" onClick={() => handleValueChange("")}>
            <FilterX />
          </Button>
        </div>
        <SelectContent>
          {Array.from({ length: 30 }, (_, i) => (
            <SelectItem key={i} value={`${new Date().getFullYear() - i}`}>
              {new Date().getFullYear() - i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {eventResults?.setlist?.map((evento: Setlist) => {
        return (
          <div
            key={evento.id}
            className="text-base flex flex-row justify-between"
          >
            <div>
              {evento.artist.name}
              {evento.tour?.name && <span> {evento.tour?.name}</span>},{" "}
              {evento.venue.name}, {evento.venue.city.name}
              <p>{evento.eventDate}</p>
            </div>
            <Link href={`/add/details?event_id=${evento.id}`}>
              <Button>Add</Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
