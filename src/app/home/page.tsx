import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import NavBar from "./NavBar";
import Feed from "./Feed";
import { PrefixPathnameNormalizer } from "next/dist/server/future/normalizers/request/prefix";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/");
  }

  const { data: profileDataArray, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", userData.user.id);

  const profileData = profileDataArray && profileDataArray[0];

  console.log(profileData);
  return (
    <div>
      <NavBar username={profileData!.username} />
      <div className="mt-24 mb-8 px-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Welcome back, {profileData!.username}!
        </h2>
      </div>
      <div className="px-4">
        <h3 className="text-xl font-semibold tracking-tight">Feed:</h3>
      </div>
      <div>
        <Feed id={profileData!.id} />
      </div>
    </div>
  );
}
