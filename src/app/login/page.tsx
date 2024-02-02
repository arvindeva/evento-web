import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userData?.user) {
    redirect("/");
  }
  return (
    <form className="p-2.5 my-12 flex flex-col gap-y-4">
      <h1 className="text-2xl font-extrabold mb-4">Login</h1>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button formAction={login} className="h-11 mt-6">
        Log in
      </Button>
    </form>
  );
}
