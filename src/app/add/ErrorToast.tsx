"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export function ErrorToast(props: any) {
  const { toast } = useToast();

  useEffect(() => {
    toast;
  }, []);

  return <div>a</div>;
}
