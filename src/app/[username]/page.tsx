import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

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
