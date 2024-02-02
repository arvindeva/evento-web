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
      <div className="p-4 text-center mt-24">
        <h2 className="text-2xl">
          <span className="font-bold text-5xl bg-gradient-to-r from-indigo-600 via-purple-500 to-red-500 text-transparent bg-clip-text">
            Evento
          </span>{" "}
          <span className="bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            v.0.0
          </span>
          <p>development build</p>
        </h2>
      </div>
    </main>
  );
}
