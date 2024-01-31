"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

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

  console.log(data?.data);

  if (error) {
    console.log(error.message);
  }
  return <div className="form-widget">a</div>;
}
