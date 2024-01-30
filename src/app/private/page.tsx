import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function PrivatePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  console.log(userData);
  if (userError || !userData?.user) {
    redirect("/");
  }

  const { data: profileDataArray, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", userData.user.id);

  const profileData = profileDataArray && profileDataArray[0];

  if (profileError) {
    console.log(profileError);
  }

  if (userError || !userData?.user) {
    console.log(userError);
  }

  return (
    <div>
      <p>Hello {userData.user.email}</p>
      <p>First name: {profileData && profileData.first_name}</p>
      <p>Last name: {profileData && profileData.last_name}</p>
      <p>bio: {profileData && profileData.bio}</p>
      <LogoutButton />
    </div>
  );
}
