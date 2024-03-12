export async function GET(_: Request, { params }: { params: { id: string } }) {
  console.log(params)
  const res = await fetch(
    `https://api.setlist.fm/rest/1.0/setlist/${params.id}`,
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
