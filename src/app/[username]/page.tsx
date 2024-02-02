import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/ui/LogoutButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Profile from "./Profile";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profileDataArray, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("username", params.username);

  const initialData = profileDataArray && profileDataArray[0];
  console.log(initialData);

  if (!initialData) {
    notFound();
  }

  return (
    <div>
      <Profile profile={initialData} />
    </div>
  );
}
