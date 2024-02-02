import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/ui/LogoutButton";
import NavBar from "@/components/ui/NavBar";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userData?.user) {
    redirect("/home");
  }

  return (
    <main className="">
      <NavBar />
      <div className="mt-24">
        Hello world{" "}
        <div>
          <LogoutButton></LogoutButton>
        </div>
      </div>
    </main>
  );
}
