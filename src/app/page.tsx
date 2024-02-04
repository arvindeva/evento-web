import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/ui/LogoutButton";
import MyNavBar from "@/components/ui/MyNavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hero from "@/components/ui/Hero";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userData?.user) {
    redirect("/home");
  }

  return (
    <main className="">
      <MyNavBar
        profile={false}
        add={false}
        login
        authed={false}
        username={null}
      />
      <Hero />
    </main>
  );
}
