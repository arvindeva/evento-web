'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FilterX, ChevronRight } from 'lucide-react'
import Combobox from './ComboBox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '@/components/ui/loader'
interface EventsResponse {
  itemsPerPage: number
  page: number
  setlist: Setlist[]
  total: number
  type: string
}

interface Setlist {
  id: string
  eventDate: string
  artist: {
    mbid: string
    name: string
  }
  venue: {
    name: string
    city: {
      name: string
      country: {
        name: string
      }
    }
  }
  tour: {
    name: string
  }
}

enum Status {
  PENDING = 'pending',
  INACTIVE = 'inactive',
}

export default function Form() {
  const [selectedMbid, setSelectedMbid] = useState<string>('')
  const [eventResults, setEventResults] = useState<EventsResponse | null>(null)
  const [eventList, setEventList] = useState<Setlist[]>([])
  const [year, setYear] = React.useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [firstLoadingStauts, setFirstLoadingStatus] = useState<Status>(
    Status.INACTIVE
  )

  async function getEventsByMbid(selected: string) {
    setSelectedMbid(selected)
    setYear('')
    setFirstLoadingStatus(Status.PENDING)

    const res = await fetch(`/api/events?artistMbid=${selected}&p=1`)
    const data = await res.json()

    setCurrentPage(1)
    setEventResults(data)
    setEventList(data.setlist)
    setFirstLoadingStatus(Status.INACTIVE)

    // check if theres more data to fetch
    const difference = data.total - data.page * data.itemsPerPage
    console.log(data)
    console.log(difference)
    if (difference <= 0) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
  }

  // async function getEventsByMbid
  async function handleValueChange(newYear: string) {
    setYear(newYear)
    if (newYear === '') {
      setFirstLoadingStatus(Status.PENDING)
      const res = await fetch(`/api/events?artistMbid=${selectedMbid}&p=1`)
      const data = await res.json()
      setEventResults(data)
      setEventList(data.setlist)
      const difference = data.total - data.page * data.itemsPerPage
      if (difference <= 0) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
      setCurrentPage(1)
      setFirstLoadingStatus(Status.INACTIVE)
    } else {
      setFirstLoadingStatus(Status.PENDING)
      const res = await fetch(
        `/api/events?artistMbid=${selectedMbid}&year=${newYear}&p=1`
      )
      const data = await res.json()
      console.log(data)
      setEventResults(data)
      setEventList(data.setlist)
      const difference = data.total - data.page * data.itemsPerPage

      console.log(difference)
      if (difference <= 0) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
      setCurrentPage(1)
      setFirstLoadingStatus(Status.INACTIVE)
    }
  }

  async function fetchMoreEvents() {
    const url =
      year === ''
        ? `/api/events?artistMbid=${selectedMbid}&p=${currentPage + 1}`
        : `/api/events?artistMbid=${selectedMbid}&year=${year}&p=${
            currentPage + 1
          }`
    try {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      setEventResults(data)
      setEventList([...eventList, ...data.setlist])
      const difference = data.total - data.page * data.itemsPerPage
      console.log(difference)
      if (difference <= 0) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
      setCurrentPage((prevState) => prevState + 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-40 w-full bg-background form-widget p-4 flex flex-col gap-y-4">
        <h1 className="text-3xl font-semibold text-primary">Add event</h1>
        <Combobox getEventsByMbid={getEventsByMbid} />
        <Select value={year} onValueChange={handleValueChange}>
          <div className="flex flex-row items-center gap-x-5">
            <SelectTrigger className="w-[180px] text-lg">
              <SelectValue placeholder="Year">{year}</SelectValue>
            </SelectTrigger>
            <Button variant="outline" onClick={() => handleValueChange('')}>
              <FilterX />
            </Button>
          </div>
          <SelectContent>
            {Array.from({ length: 30 }, (_, i) => (
              <SelectItem
                key={i}
                value={`${new Date().getFullYear() - i}`}
                className="text-lg"
              >
                {new Date().getFullYear() - i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {eventResults?.total! > 0 ? (
          <div className="text-slate-500 text-base dark:text-slate-300 mb-2 mt-4">
            <span className="font-semibold">{eventResults?.total}</span> results
            found
          </div>
        ) : (
          <div className="text-slate-500 text-base dark:text-slate-300 mb-2 mt-4">
            No Results Found
          </div>
        )}
      </div>
      {firstLoadingStauts === Status.PENDING ? (
        <div className="mt-4 flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="px-4 py-0">
          {eventList?.length > 0 && (
            <InfiniteScroll
              dataLength={eventList.length} //This is important field to render the next data
              next={fetchMoreEvents}
              hasMore={hasMore}
              loader={
                <div className="flex flex-row justify-center items-center mt-10 mb-10">
                  <Loader />
                </div>
              }
              endMessage={
                <p className="text-center mt-10 mb-10">
                  <b>You&apos;ve reached the end... :(</b>
                </p>
              }
            >
              <div className="flex flex-col gap-y-4">
                {eventList.map((evento: Setlist) => {
                  const datearray = evento.eventDate.split('-')
                  var formattedDate =
                    datearray[1] + '/' + datearray[0] + '/' + datearray[2]
                  const cardDate = new Date(formattedDate)
                  const monthNames = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ]

                  const month = monthNames[cardDate.getMonth()].slice(0, 3)
                  const day = cardDate.getDate()
                  const year = cardDate.getFullYear()
                  return (
                    <div key={evento.id} className="flex flex-col gap-y-4">
                      <Link href={`/add/details?event_id=${evento.id}`}>
                        <div className="text-base flex items-center flex-row justify-between border-b dark:border-b-zinc-800 pb-4">
                          <div className="flex flex-row gap-x-4 items-center">
                            <div className="flex flex-col items-center justify-center">
                              <div className="text-sm uppercase text-slate-500 dark:text-slate-300">
                                {month}
                              </div>
                              <div className="text-lg font-semibold">{day}</div>
                              <div className="text-sm text-slate-500 dark:text-slate-300">
                                {year}
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-1">
                              <div className="font-semibold text-base leading-normal dark:text-zinc-50">
                                {evento.artist.name}
                                {evento.tour?.name && (
                                  <span>: {evento.tour?.name}</span>
                                )}
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                {evento.venue.name}, {evento.venue.city.name}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="rounded-full border-none"
                          >
                            <ChevronRight
                              width={18}
                              height={18}
                              className="text-primary"
                            />
                          </Button>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </InfiniteScroll>
          )}
        </div>
      )}
    </div>
  )
}
