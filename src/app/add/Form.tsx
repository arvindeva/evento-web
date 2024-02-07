"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FilterX } from "lucide-react";
import Combobox from "./ComboBox";
import ky from "ky";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfiniteScroll from 'react-infinite-scroll-component';



interface EventsResponse {
  itemsPerPage: number;
  page: number;
  setlist: Setlist[];
  total: number;
  type: string;
}

interface Setlist {
  id: string;
  eventDate: string;
  artist: {
    mbid: string;
    name: string;
  };
  venue: {
    name: string;
    city: {
      name: string;
      country: {
        name: string;
      };
    };
  };
  tour: {
    name: string;
  };
}

// interface NotFoundResponse { 
//   code: string;
//   status: string;
//   message: string;
//   timestamp: string;
// }

export default function Form() {
  const [selectedMbid, setSelectedMbid] = useState<string>("");
  const [eventResults, setEventResults] = useState<EventsResponse | null>(null);
  const [eventList, setEventList] = useState<Setlist[]>([])
  const [year, setYear] = React.useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  async function getEventsByMbid(selected: string) {
    setSelectedMbid(selected);
    const data = await ky
      .get(
        `${process.env.NEXT_PUBLIC_EVENTO_API_URL}/search/events/${selected}?p=1`
      )
      .json<EventsResponse>();
    setCurrentPage(1);
    setEventResults(data);
    setEventList(data.setlist);

    // check if theres more data to fetch
    const difference = data.total - data.page * data.itemsPerPage
    console.log(difference)
    if (difference < 0) {
      setHasMore(false)
    } else {
      setHasMore(true);
    }
  }

  // async function getEventsByMbid
  async function handleValueChange(newYear: string) {
    setYear(newYear);
    if (newYear === "") {
      const data = await ky
        .get(
          `${process.env.NEXT_PUBLIC_EVENTO_API_URL}/search/events/${selectedMbid}`
        )
        .json<EventsResponse>();
      setEventResults(data);
      setEventList(data.setlist);
      const difference = data.total - data.page * data.itemsPerPage
      if (difference < 0) {
        setHasMore(true)
      } else {
        setHasMore(false);
      }
      setCurrentPage(1);
    } else {
      const data = await ky
        .get(
          `${process.env.NEXT_PUBLIC_EVENTO_API_URL}/search/events?artistMbid=${selectedMbid}&year=${newYear}&p=1`
        )
        .json<EventsResponse>();
      console.log(data);
      setEventResults(data);
      setEventList(data.setlist);
      const difference = data.total - data.page * data.itemsPerPage

      console.log(difference)
      if (difference < 0) {
        setHasMore(false)
      } else {
        setHasMore(true);
      }
      setCurrentPage(1);
    }
  }

  async function fetchMoreEvents() {

    const url = year === ""
      ? `${process.env.NEXT_PUBLIC_EVENTO_API_URL}/search/events/${selectedMbid}?p=${currentPage + 1}`
      : `${process.env.NEXT_PUBLIC_EVENTO_API_URL}/search/events?artistMbid=${selectedMbid}&year=${year}&p=${currentPage + 1}`;

    try {
      const data = await ky.get(url).json<EventsResponse>();
      console.log(data);
      setEventResults(data);
      setEventList([...eventList, ...data.setlist]);
      const difference = data.total - data.page * data.itemsPerPage
      console.log(difference)
      if (difference < 0) {
        setHasMore(false)
      } else {
        setHasMore(true);
      }
      setCurrentPage(prevState => prevState + 1)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-widget p-4 flex flex-col gap-y-4">
      <Combobox getEventsByMbid={getEventsByMbid} />
      <Select value={year} onValueChange={handleValueChange}>
        <div className="flex flex-row items-center gap-x-5">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Year">{year}</SelectValue>
          </SelectTrigger>
          <Button variant="outline" onClick={() => handleValueChange("")}>
            <FilterX />
          </Button>
        </div>
        <SelectContent>
          {Array.from({ length: 30 }, (_, i) => (
            <SelectItem key={i} value={`${new Date().getFullYear() - i}`}>
              {new Date().getFullYear() - i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {eventList?.length > 0 && <InfiniteScroll
        dataLength={eventList.length} //This is important field to render the next data
        next={fetchMoreEvents}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {eventList.map((evento: Setlist) => {
          return (
            <div
              key={evento.id}
              className="text-base flex flex-row justify-between"
            >
              <div>
                {evento.artist.name}
                {evento.tour?.name && <span> {evento.tour?.name}</span>},{" "}
                {evento.venue.name}, {evento.venue.city.name}
                <p>{evento.eventDate}</p>
              </div>
              <Link href={`/add/details?event_id=${evento.id}`}>
                <Button>Add</Button>
              </Link>
            </div>
          );
        })}
      </InfiniteScroll>}

    </div>
  );
}
