import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const term = searchParams.get('term')

  const res = await fetch(
    `https://api.setlist.fm/rest/1.0/search/artists?artistName=${term}&sort=relevance`,
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
