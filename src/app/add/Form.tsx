"use client";
import React, { useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";

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

export default function Form(props: ProfileProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
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

  const fetchResults = async (searchTerm: string) => {
    return await supabase
      .from("events")
      .select()
      .textSearch("name", `${searchTerm}:*`);
  };

  React.useEffect(() => {
    const searchHN = async () => {
      let results = [];
      setIsSearching(true);
      if (debouncedSearchTerm) {
        const data = await fetchResults(debouncedSearchTerm);
        console.log(data);
      }

      setIsSearching(false);
      // setResults(results);
    };

    searchHN();
  }, [debouncedSearchTerm]);

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="search_term">search</label>
        <input
          name="search_term"
          placeholder="search event"
          onChange={handleChange}
        />
      </div>
      {results && results}
    </div>
  );
}
