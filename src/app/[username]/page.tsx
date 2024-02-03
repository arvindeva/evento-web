import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import Profile from "./Profile";
import NavBar from "./NavBar";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  console.log(userData);

  const { data: profileDataArray, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("username", params.username);

  const profileData = profileDataArray && profileDataArray[0];
  console.log(profileData);

  const isOwner =
    userData.user && profileData && userData.user.id === profileData.id;

  if (!profileData) {
    notFound();
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-lg sm:mx-auto">
        <Profile profile={profileData} isOwner={isOwner} />
      </div>
    </div>
  );
}
