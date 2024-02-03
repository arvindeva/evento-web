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
import { ChevronRight } from "lucide-react";

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

interface IResult {
  artist_id: number | null;
  average_rating: number | null;
  created_at: string;
  date: string | null;
  id: number;
  name: string | null;
  updated_at: string | null;
  venue_id: number | null;
  venues: {
    location: string | null;
    name: string | null;
  } | null;
}

export default function Form(props: ProfileProps) {
  const supabase = createClient();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<IResult[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const getProfile = async () => {
    return await supabase
      .from("profiles")
      .select(`first_name, username, last_name`)
      .eq("id", props.profile!.id)
      .single();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (error) {
    console.log(error.message);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const formatSearchTerm = (searchTerm: string): string => {
    let current = searchTerm;
    current = searchTerm.trim();
    let array = current.split(" ");
    if (array.length === 1) {
      return `${array[0]}:*`;
    }
    let result = "";
    for (let i = 0; i < array.length; i++) {
      if (i === array.length) {
        result = result + ` | ${array[i]}:*`;
      } else if (i === 0) {
        result = `${array[i]}:*`;
      } else {
        result = result + ` | ${array[i]}:*`;
      }
    }
    return result;
  };

  const fetchResults = async (searchTerm: string) => {
    return await supabase
      .from("events")
      .select(`*, venues ( name, location)`)
      .textSearch("name", `${formatSearchTerm(searchTerm)}`)
      .order("date", { ascending: false });
  };
  const searchEvents = async () => {
    setIsSearching(true);
    if (debouncedSearchTerm) {
      const { data, error } = await fetchResults(debouncedSearchTerm);
      if (error) {
        console.log(error);
      }
      data && setResults(data);
    }
    setIsSearching(false);
  };
  React.useEffect(() => {
    searchEvents();
  }, [debouncedSearchTerm]);

  const count = results.length;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="form-widget p-4 flex flex-col gap-y-4">
      <h1 className="text-2xl font-semibold">Add Event</h1>
      <div className="flex flex-col gap-y-1">
        <label
          htmlFor="search_term"
          className="text-slate-700 dark:text-slate-400"
        >
          Search
        </label>
        <Input
          name="search_term"
          placeholder="search event"
          onChange={handleChange}
        />
      </div>
      <div className="text-md font-normal text-slate-700 dark:text-slate-400">
        <span className="font-bold">{count}</span> results
      </div>
      {results.map((result) => {
        const cardDate = new Date(result!.date!);
        const month = monthNames[cardDate.getMonth()].slice(0, 3);
        const day = cardDate.getDate();
        const year = cardDate.getFullYear();
        return (
          <div
            key={result.id}
            className="flex flex-row justify-between items-center"
          >
            <Link href={`/add/details?event_id=${result.id}`}>
              <div className="flex flex-row items-center gap-x-3">
                <div className="flex flex-col gap-y-px items-center">
                  <div className="text-sm uppercase text-slate-500 dark:text-slate-400">
                    {month}
                  </div>
                  <div className="text-lg font-bold dark:text-slate-200">
                    {day}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {year}
                  </div>
                </div>
                <div className="bg-neutral-300 dark:bg-slate-500 w-px h-10" />
                <div>
                  <div className="flex flex-col gap-y-1 pr-2">
                    <div className="text-base font-semibold dark:text-slate-200">
                      {result.name}
                    </div>
                    <div className="text-sm font-normal text-slate-500 dark:text-slate-400">
                      {result.venues?.name}, {result.venues?.location}
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRight className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
