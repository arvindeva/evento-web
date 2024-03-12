import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RatingCard from '@/app/add/details/RatingCard'
import Link from 'next/link'

interface IRatings {
  isOwner: boolean
  username: string
  venueRating: number
  performanceRating: number
}

export default function Ratings({
  isOwner,
  username,
  venueRating,
  performanceRating,
}: IRatings) {
  return (
    <Tabs defaultValue="rating" className="box-border">
      <TabsList>
        <TabsTrigger
          value="rating"
          className={`
                     data-[state=active]:border-primary data-[state=active]:border-b-2 p-1.5 
                      box-border rounded-none px-4 data-[state=active]:text-primary data-[state=active]:font-semibold text-base
                  `}
        >
          Rating & Review
        </TabsTrigger>
        <TabsTrigger
          value="details"
          className="data-[state=active]:border-primary data-[state=active]:border-b-2 p-1.5 
                  box-border rounded-none px-4 data-[state=active]:text-primary data-[state=active]:font-semibold text-base"
        >
          <div>Event Details</div>
        </TabsTrigger>
      </TabsList>
      <div className="bg-neutral-200 dark:bg-neutral-400 h-px" />
      <TabsContent value="rating">
        <div className="flex flex-col p-4 gap-y-4">
          {isOwner ? (
            <h1>My event</h1>
          ) : (
            <h1>
              <span className="font-bold text-primary">
                <Link href={`/${username}`}>
                  <span className="active:text-fuchsia-500 hover:text-fuchsia-500">{`${username}`}</span>
                </Link>
              </span>
              &apos;s event
            </h1>
          )}
          <RatingCard
            title="performance"
            currentRating={performanceRating.toString()}
          />
          <RatingCard title="Venue" currentRating={venueRating.toString()} />
          {/* <Button></Button> */}
        </div>
      </TabsContent>
      <TabsContent value="details">
        <div className="p-4 text-center text-2xl font-semibold">
          🛠️ Under Construction 🛠️
        </div>
      </TabsContent>
    </Tabs>
  )
}
