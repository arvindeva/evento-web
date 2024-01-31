import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Form from "./Form";

export default async function EditPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  console.log(data);
  if (error || !data?.user) {
    alert("Something went wrong");
    redirect("/");
  }
  return (
    <div>
      <Form user={data.user} />
    </div>
  );
}
