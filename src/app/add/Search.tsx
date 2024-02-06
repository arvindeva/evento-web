import * as React from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ky from "ky";

interface SearchProps {
  selectedResult?: Artist;
  onSelectResult: (artist: Artist) => void;
}

export interface Artist {
  mbid: string;
  name: string;
}

export interface SearchResponse {
  artist: Artist[];
  type: string;
  itemsPerPage: number;
  page: number;
  total: number;
}

export function Search({ selectedResult, onSelectResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelectResult = (artist: Artist) => {
    onSelectResult(artist);

    // OPTIONAL: reset the search query upon selection
    // setSearchQuery('');
  };

  return (
    <Command
      shouldFilter={false}
      className="h-auto rounded-lg border border-b-0 shadow-md"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search for Artist"
      />

      <SearchResults
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
      />
    </Command>
  );
}

interface SearchResultsProps {
  query: string;
  selectedResult: SearchProps["selectedResult"];
  onSelectResult: SearchProps["onSelectResult"];
}

function SearchResults({
  query,
  selectedResult,
  onSelectResult,
}: SearchResultsProps) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  const enabled = !!debouncedSearchQuery;

  const mockDelay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const searchProductsByName = async (query: string) => {
    const data = await ky
      .get(
        `${process.env.NEXT_PUBLIC_EVENTO_API_URL}/search/artists/${query
          .split(" ")
          .join("-")}`
      )
      .json<SearchResponse>();

    return data;
  };

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<SearchResponse>({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => searchProductsByName(debouncedSearchQuery),
    enabled,
  });

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isLoadingOrig;

  if (!enabled) return null;

  return (
    <CommandList>
      {/* TODO: these should have proper loading aria */}
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {!isError && !isLoading && !data?.artist && (
        <div className="p-4 text-sm">No products found</div>
      )}
      {isError && <div className="p-4 text-sm">Something went wrong</div>}

      {data?.artist?.map(({ mbid, name }) => {
        return (
          <CommandItem
            key={mbid}
            onSelect={() => onSelectResult({ mbid, name })}
            value={name}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedResult?.mbid === mbid ? "opacity-100" : "opacity-0"
              )}
            />
            {name}
          </CommandItem>
        );
      })}
    </CommandList>
  );
}