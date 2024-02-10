import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEventTitle(artist: string, tour?: string): string {
  if (typeof tour !== 'undefined') {
    const lowerCaseTour: string = tour.toLowerCase()
    if (tour.length > 4 && lowerCaseTour.slice(-2)) {
      return `${artist}: ${tour} Tour`
    } else {
      return `${artist}: ${tour}`
    }
  } else {
    return artist
  }
}

const groupBy = (values: any, keyFinder: any) => {
  // using reduce to aggregate values
  return values.reduce((a: any, b: any) => {
    // depending upon the type of keyFinder
    // if it is function, pass the value to it
    // if it is a property, access the property
    const key = typeof keyFinder === 'function' ? keyFinder(b) : b[keyFinder]

    // aggregate values based on the keys
    if (!a[key]) {
      a[key] = [b]
    } else {
      a[key] = [...a[key], b]
    }

    return a
  }, {})
}

export interface EventsByYear {
  year: string | null
  events: {
    evento: EventoWithYear
  }[]
}

interface Evento {
  artist: string | null
  artist_mbid: string | null
  city: string | null
  country: string | null
  date: string | null
  id: number
  performance_rating: number | null
  slfm_id: string | null
  tour: string | null
  user_id: string | null
  venue: string | null
  venue_id: string | null
  venue_rating: number | null
}

interface EventoWithYear {
  artist: string | null
  artist_mbid: string | null
  city: string | null
  country: string | null
  date: string | null
  id: number
  performance_rating: number | null
  slfm_id: string | null
  tour: string | null
  user_id: string | null
  venue: string | null
  venue_id: string | null
  venue_rating: number | null
  year?: number | null
}

interface YearToEventsMapping {
  year: EventoWithYear[]
}

export function groupEventsByYear(data: Evento[]): EventsByYear[] {
  let yearList = data.map((evento: Evento) => {
    return new Date(evento.date!).getFullYear()
  })

  const yearInserted = data.map((evento: Evento, i: number): EventoWithYear => {
    return { ...evento, year: yearList[i] }
  })

  const resultsByYear: YearToEventsMapping = groupBy(
    yearInserted!,
    ({ year }: EventoWithYear) => year
  )

  let ready: EventsByYear[] = []

  for (const [key, value] of Object.entries(resultsByYear)) {
    ready.push({ year: key, events: value })
  }

  let orderedReady = ready.reverse()

  return orderedReady
}

interface DateObject {
  day: string
  month: string
  year: string
}

export function dateStringToObject(dateString: string): DateObject {
  const cardDate = new Date(dateString)

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
  const day = cardDate.getDate().toString()
  const year = cardDate.getFullYear().toString()

  return { day, month, year }
}
