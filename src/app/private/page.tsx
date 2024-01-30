import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function PrivatePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <LogoutButton />
    </div>
  );
}
