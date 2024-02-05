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
import AsyncSelect from "react-select/async";
import Combobox from "./ComboBox";

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

interface IArtist {
  disambiguation: string;
  mbid: string;
  name: string;
  sortName: string;
  url: string;
}

export default function Form(props: ProfileProps) {
  const supabase = createClient();
  const router = useRouter();

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

  function printSelected(selected: string) {
    console.log(selected);
  }

  return (
    <div className="form-widget p-4 flex flex-col gap-y-4">
      <Combobox printSelected={printSelected} />
    </div>
  );
}
