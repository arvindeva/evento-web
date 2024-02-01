"use client";

import { Button } from "./button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      router.push("/");
    }

    router.refresh();
  }

  return <Button onClick={signOut}>Sign out</Button>;
}
