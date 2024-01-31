"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface ProfileProps {
  profile: {
    bio: string | null;
    first_name: string | null;
    id: string;
    last_name: string | null;
    updated_at: string | null;
    username: string | null;
  } | null;
}

export default function Card() {
  return (
    <div className="relative">
      <div className="absolute border border-slate-500 w-full rounded-lg z-30 bg-zinc-900 overflow-hidden">
        <div className="w-full relative ">
          <Image
            src="/images/coldplay.webp"
            alt="coldplay pic"
            width={500}
            height={500}
            priority
            className="object-cover w-full"
          />
        </div>
        <div className="pb-4">
          <div className="transform -translate-y-6 relative mx-8 bg-zinc-100  border border-slate-500 text-zinc-900 font-semibold text-center rounded-2xl h-24">
            <div className="flex flex-row justify-between items-center h-full">
              <div className="flex items-center justify-center w-1/3 border-r border-slate-500 h-full border-dashed">
                date
              </div>
              <div className="w-2/3">event</div>
            </div>
            <div className="absolute w-6 h-6 top-1/2  transform -translate-y-1/2 -left-3 rounded-full bg-zinc-900"></div>
            <div className="absolute w-6 h-6 top-1/2  transform -translate-y-1/2 -right-3 rounded-full bg-zinc-900"></div>
            <div className="hidden absolute w-px h-full top-1/2  transform -translate-y-1/2 left-1/3 -translate-x-1/2 rounded-full bg-red-500"></div>
          </div>
        </div>
      </div>
      <div className="absolute border border-slate-500 w-full rounded-lg top-3 z-20 bg-zinc-900">
        <div>
          <div className="w-full relative ">
            <Image
              src="/images/coldplay.webp"
              alt="coldplay pic"
              width={500}
              height={500}
              priority
              className="object-cover w-full"
            />
          </div>
          <div className="pb-4">
            <div className="relative mx-8 bg-zinc-900   border-slate-500 text-zinc-900 font-semibold text-center rounded-2xl h-24">
              <div className="flex flex-row justify-between items-center h-full">
                <div className="flex items-center justify-center w-1/3 h-full border-dashed">
                  date
                </div>
                <div className="w-2/3">event</div>
              </div>
              <div className="absolute w-6 h-6 top-1/2  transform -translate-y-1/2 -left-3 rounded-full bg-zinc-900"></div>
              <div className="absolute w-6 h-6 top-1/2  transform -translate-y-1/2 -right-3 rounded-full bg-zinc-900"></div>
              <div className="hidden absolute w-px h-full top-1/2  transform -translate-y-1/2 left-1/3 -translate-x-1/2 rounded-full bg-red-500"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute border border-slate-500  w-full rounded-lg top-6 z-10 bg-zinc-900">
        <div>
          <div className="w-full relative ">
            <Image
              src="/images/coldplay.webp"
              alt="coldplay pic"
              width={500}
              height={500}
              priority
              className="object-cover w-full"
            />
          </div>
          <div className="pb-4">
            <div className="relative mx-8 bg-zinc-900   border-slate-500 text-zinc-900 font-semibold text-center rounded-2xl h-24">
              <div className="flex flex-row justify-between items-center h-full">
                <div className="flex items-center justify-center w-1/3 h-full border-dashed">
                  date
                </div>
                <div className="w-2/3">event</div>
              </div>
              <div className="absolute w-6 h-6 top-1/2  transform -translate-y-1/2 -left-3 rounded-full bg-zinc-900"></div>
              <div className="absolute w-6 h-6 top-1/2  transform -translate-y-1/2 -right-3 rounded-full bg-zinc-900"></div>
              <div className="hidden absolute w-px h-full top-1/2  transform -translate-y-1/2 left-1/3 -translate-x-1/2 rounded-full bg-red-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
