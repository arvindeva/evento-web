"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "@/app/add/Search";

export interface Artist {
  mbid: string;
  name: string;
}

const POPOVER_WIDTH = "w-[252px]";

interface ComboBoxProps {
  getEventsByMbid: (selected: string) => void;
}

export default function Combobox({ getEventsByMbid }: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Artist | undefined>();

  const handleSetActive = React.useCallback((artist: Artist) => {
    setSelected(artist);

    //fire parent component's function to search artist's setlists.
    getEventsByMbid(artist.mbid);
    setOpen(false);
  }, [getEventsByMbid]);

  const displayName = selected ? selected.name : "Select artist";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", POPOVER_WIDTH)}
        >
          {displayName}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" className={cn("p-0", POPOVER_WIDTH)}>
        <Search selectedResult={selected} onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
}
