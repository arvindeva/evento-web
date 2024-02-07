import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Form from "./Form";
import MyNavBar from "@/components/ui/MyNavBar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { profile } from "console";

interface IAddPage {
  searchParams: {
    error?: string;
    type?: string;
  };
}

export default async function AddPage({ searchParams }: IAddPage) {
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
  if (profileError) {
    console.error(profileError.message);
    redirect("/");
  }

  const initialData = profileDataArray && profileDataArray[0];

  return (
    <div>
      <MyNavBar
        profile
        add={false}
        login={false}
        authed={true}
        username={initialData.username!}
      />
      {searchParams.error === "true" && (
        <div className="px-4 my-2">
          <Alert variant="destructive" className="bg-red-700 text-zinc-300">
            <AlertTitle>Server Error!</AlertTitle>
            <AlertDescription>You already have that event.</AlertDescription>
          </Alert>
        </div>
      )}
      <div className="mx-auto max-w-lg">
        <Form />
      </div>
    </div>
  );
}
