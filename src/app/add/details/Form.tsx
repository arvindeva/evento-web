'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroup } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import {
  Form as RHForm,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import RatingItem from '@/app/add/details/RatingItems'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RatingCard from './RatingCard'
import DrawerHeader from '@/app/add/details/DrawerHeader'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import MyCard from '@/app/add/details/Card'
import { useMutation } from '@tanstack/react-query'

export interface FormProps {
  eventData: Setlist
}

export interface Setlist {
  id: string
  tour: string
  date: string
  artist: string
  venue: string
  userId: string
  artistMbid: string
  venueId: string
  city: string
  country: string
}

const formSchema = z.object({
  performance: z.string(),
  venue: z.string(),
})

const ratings = ['1', '2', '3', '4', '5']

export default function Form({ eventData }: FormProps) {
  // supabase
  const supabase = createClient()
  const router = useRouter()

  //  form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performance: '0',
      venue: '0',
    },
  })

  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      return await supabase.from('eventos').insert(payload).select()
    },
    onError: (error) => {
      toast({
        description: `Error: ${error.message}`,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.push('/home')
    },
  })
  // submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const datearray = eventData!.date!.split('-')
    var formattedDate = datearray[1] + '/' + datearray[0] + '/' + datearray[2]

    const payload = {
      slfm_id: eventData.id,
      user_id: eventData.userId,
      artist_mbid: eventData.artistMbid,
      venue_id: eventData.venueId,
      date: formattedDate,
      artist: eventData.artist,
      venue: eventData.venue,
      city: eventData.city,
      country: eventData.country,
      tour: eventData.tour,
      performance_rating: parseInt(values.performance),
      venue_rating: parseInt(values.venue),
    }
    mutation.mutate(payload)
  }

  const performanceStarRating = form.watch('performance')
  const venueStarRating = form.watch('venue')

  const closeDrawerText = 'Remove rating & review'
  return (
    <div className="flex flex-col gap-y-4 mt-3">
      <div>
        <MyCard eventData={eventData} />
      </div>
      <div>
        <RHForm {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col space-y-8 box-border"
          >
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
                <div className="flex flex-col p-2.5 gap-y-4">
                  <h1 className="font-semibold text-lg">My Rating</h1>
                  <Drawer preventScrollRestoration={false}>
                    <DrawerTrigger>
                      <RatingCard
                        currentRating={performanceStarRating}
                        title="Performance"
                      />
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader
                        heading="Performance"
                        subheading={eventData!.artist}
                        starRating={performanceStarRating}
                      />
                      <div className="bg-neutral-700 h-px" />
                      <div className="pt-7 pb-5">
                        <FormField
                          control={form.control}
                          name="performance"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-row space-y-1 justify-center gap-x-3"
                                >
                                  {ratings.map((num) => {
                                    return (
                                      <RatingItem
                                        num={num}
                                        key={num}
                                        active={
                                          parseInt(performanceStarRating) >=
                                          parseInt(num)
                                        }
                                      />
                                    )
                                  })}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <DrawerFooter>
                        <DrawerClose
                          onClick={() => form.setValue('performance', '0')}
                          className="text-base font-semibold text-red-500"
                        >
                          {closeDrawerText}
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                  <Drawer>
                    <DrawerTrigger>
                      <RatingCard
                        currentRating={venueStarRating}
                        title="Venue"
                      />
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader
                        heading="Venue"
                        subheading={eventData!.venue}
                        starRating={venueStarRating}
                      />
                      <div className="bg-neutral-700 h-px" />
                      <div className="pt-7 pb-5">
                        <FormField
                          control={form.control}
                          name="venue"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-row space-y-1 justify-center gap-x-3"
                                >
                                  {ratings.map((num) => {
                                    return (
                                      <RatingItem
                                        num={num}
                                        key={num}
                                        active={
                                          parseInt(venueStarRating) >=
                                          parseInt(num)
                                        }
                                      />
                                    )
                                  })}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <DrawerFooter>
                        <DrawerClose
                          onClick={() => form.setValue('venue', '0')}
                          className="text-base font-semibold text-red-500"
                        >
                          {closeDrawerText}
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </TabsContent>
              <TabsContent value="details">
                <div className="p-4 text-center text-2xl font-semibold">
                  🛠️ Under Construction 🛠️
                </div>
              </TabsContent>
            </Tabs>
            <div className="p-2.5 w-full">
              <Button type="submit" className="w-full">
                Save
              </Button>
            </div>
          </form>
        </RHForm>
      </div>
    </div>
  )
}
