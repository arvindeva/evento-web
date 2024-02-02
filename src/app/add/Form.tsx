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
  promoter_id: number | null;
  updated_at: string | null;
  venue_id: number | null;
}

export default function Form(props: ProfileProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<IResult[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { register } = useForm();

  const getProfile = async () => {
    console.log("getProfile trigerred");
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
    console.log(result);
    return result;
  };

  const fetchResults = async (searchTerm: string) => {
    return await supabase
      .from("events")
      .select()
      .textSearch("name", `${formatSearchTerm(searchTerm)}`);
  };
  const searchEvents = async () => {
    setIsSearching(true);
    if (debouncedSearchTerm) {
      const { data, error } = await fetchResults(debouncedSearchTerm);
      if (error) {
        console.log(error);
      }
      console.log(data);
      data && setResults(data);
    }
    setIsSearching(false);
  };
  React.useEffect(() => {
    searchEvents();
  }, [debouncedSearchTerm]);

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="search_term">search</label>
        <Input
          name="search_term"
          placeholder="search event"
          onChange={handleChange}
        />
      </div>

      {results.map((result) => {
        return (
          <div key={result.id}>
            <Link href={`/add/details?event_id=${result.id}`}>
              {result.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
