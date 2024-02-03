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
      <div className="mt-4 mb-4 px-4 max-w-lg sm:mx-auto">
        <h2 className="text-[32px] font-bold tracking-tight">
          Hi,{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-red-500 text-transparent bg-clip-text">
            {" "}
            {profileData!.username}
          </span>
          !
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Here are the latest activities of other users.
        </p>
      </div>

      <div className="max-w-lg sm:mx-auto">
        <Feed id={profileData!.id} />
      </div>
    </div>
  );
}
