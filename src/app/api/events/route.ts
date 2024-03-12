import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const artistMbid = searchParams.get('artistMbid')
  const year = searchParams.get('year')
  const page = searchParams.get('p') || 1
  console.log(year)

  if (!year) {
    const res = await fetch(
      `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=${artistMbid}&p=${page}`,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          'x-api-key': process.env.SETLIST_FM_API_KEY || '',
        },
      }
    )

    const data = await res.json()
    return Response.json({ ...data })
  }

  const res = await fetch(
    `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=${artistMbid}&year=${year}&p=${page}`,
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        'x-api-key': process.env.SETLIST_FM_API_KEY || '',
      },
    }
  )

  const data = await res.json()
  return Response.json({ ...data })
}
