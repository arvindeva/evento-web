import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Form from "./Form";
import MyNavBar from "@/components/ui/MyNavBar";
import { redirect } from "next/navigation";

export default async function DetailsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.log(userError);
    console.log(userError?.message);
    redirect("/");
  }
  const { data: profileDataArray, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", userData.user!.id);

  const profileData = profileDataArray && profileDataArray[0];
  if (profileError || !profileData) {
    console.log(profileError);
    console.log(profileError?.message);
    redirect("/");
  }

  const { data: eventData, error: eventError } = await supabase
    .from("events")
    .select(
      `
      id,
      name,
      date,
      artists ( name ),
      venues (name)
    `
    )
    .eq("id", searchParams.event_id!)
    .single();
  if (eventError) {
    console.log(eventError);
    console.log(eventError.message);
    redirect("/");
  }

  const { data: userEventData, error: userEventError } = await supabase
    .from("users_events")
    .select("*")
    .eq("user_id", userData.user!.id)
    .eq("event_id", eventData!.id);

  console.log(userEventData);

  if (userEventError) {
    console.log("something went wrong");
    redirect("/");
  }

  if (userEventData!.length > 0) {
    console.log("user event already exist, cant add");
    redirect(`/add?error=true&type=user_event_already_exist`);
  }

  const eventDataProps = {
    id: eventData!.id,
    eventName: eventData!.name,
    date: eventData!.date,
    artistName: eventData!.artists!.name,
    venueName: eventData!.venues!.name,
  };
  return (
    <div>
      <MyNavBar profile username={profileData?.username} />
      <Form eventData={eventDataProps} />
    </div>
  );
}
