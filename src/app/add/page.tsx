import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Form from "./Form";

export default async function AddPage() {
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
  if (profileError) {
    console.log(profileError);
    redirect("/");
  }

  const initialData = profileDataArray && profileDataArray[0];

  return (
    <div>
      <Form profile={initialData} />
    </div>
  );
}
