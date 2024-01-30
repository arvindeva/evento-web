import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Form from "./Form";

export default async function PrivatePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  console.log(data);
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div>
      <div>{data.user.id}</div>
      <div>{JSON.stringify(data.user.app_metadata)}</div>
      <Form user={data} />
    </div>
  );
}
