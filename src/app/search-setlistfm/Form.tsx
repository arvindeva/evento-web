"use client";
import React, { useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, FilterX } from "lucide-react";
import AsyncSelect from "react-select/async";
import Combobox from "./ComboBox";
import ky from "ky";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
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
  setlist: {
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
  }[];
  total: number;
  type: string;
}

export default function Form(props: ProfileProps) {
  const supabase = createClient();
  const router = useRouter();
  const [selectedMbid, setSelectedMbid] = useState<string>("");
  const [eventResults, setEventResults] = useState<EventsResponse | null>(null);
  const [value, setValue] = React.useState("");

  // const getProfile = async () => {
  //   return await supabase
  //     .from("profiles")
  //     .select(`first_name, username, last_name`)
  //     .eq("id", props.profile!.id)
  //     .single();
  // };

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: getProfile,
  // });

  // if (error) {
  //   console.log(error.message);
  // }

  async function getEventsByMbid(selected: string) {
    setSelectedMbid(selected);
    const data = await ky
      .get(`http://localhost:8080/search/events/${selected}`)
      .json<EventsResponse>();
    console.log(data);
    setEventResults(data);
  }

  // async function getEventsByMbid
  async function handleValueChange(newValue: string) {
    setValue(newValue);
    if (newValue === "") {
      const data = await ky
        .get(`http://localhost:8080/search/events/${selectedMbid}`)
        .json<EventsResponse>();
      console.log(data);
      setEventResults(data);
    } else {
      console.log("new value is ", newValue);
      const data = await ky
        .get(
          `http://localhost:8080/search/events?artistMbid=${selectedMbid}&year=${newValue}&p=1`
        )
        .json<EventsResponse>();
      console.log(data);
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
          {Array.from({ length: 50 }, (_, i) => (
            <SelectItem key={i} value={`${new Date().getFullYear() - i}`}>
              {new Date().getFullYear() - i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {eventResults?.setlist?.map((evento) => {
        console.log(evento);
        return (
          <div key={evento.id} className="text-base">
            {evento.artist.name}
            {evento.tour?.name && <span> {evento.tour?.name}</span>},{" "}
            {evento.venue.name}, {evento.venue.city.name}
            <p>{evento.eventDate}</p>
          </div>
        );
      })}
    </div>
  );
}
