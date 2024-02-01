import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Form from "./Form";
import NavBar from "./NavBar";

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

  const { data: eventData, error: eventError } = await supabase
    .from("events")
    .select(
      `
      id,
      name,
      date,
      artists ( name ),
      venues (name) ,
      promoters (name)
    `
    )
    .eq("id", searchParams.event_id!)
    .single();

  console.log(eventData);

  if (userError || !userData?.user) {
    console.log(userError);
    console.log(userError?.message);
  }
  if (eventError) {
    console.log(eventError);
    console.log(eventError.message);
  }

  const eventDataProps = {
    id: eventData!.id,
    eventName: eventData!.name,
    date: eventData!.date,
    artistName: eventData!.artists!.name,
    venueName: eventData!.venues!.name,
    promoterName: eventData!.promoters!.name,
  };
  return (
    <div>
      <NavBar />
      <Form eventData={eventDataProps} />
    </div>
  );
}
