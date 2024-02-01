"use client";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Form as RHForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TicketCard from "@/components/ui/TicketCard";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import RatingItem from "@/app/add/details/RatingItems";

interface EventData {
  eventData: {
    id: number;
    eventName: string | null;
    date: string | null;
    artistName: string | null;
    venueName: string | null;
    promoterName: string | null;
  };
}

const formSchema = z.object({
  performance: z.string(),
  venue: z.string(),
});

const ratings = ["1", "2", "3", "4", "5"];

export default function Form({ eventData }: EventData) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div>
        <TicketCard eventData={eventData} />
      </div>
      <div>
        <RHForm {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col space-y-8"
          >
            <Drawer>
              <DrawerTrigger>Performance</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <FormField
                  control={form.control}
                  name="performance"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Notify me about...</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {ratings.map((num) => {
                            return <RatingItem num={num} key={num} />;
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>Cancel</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Drawer>
              <DrawerTrigger>Venue</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Notify me about...</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {["1", "2", "3", " 4", "5"].map((num) => {
                            return (
                              <FormItem
                                className="flex items-center space-x-3 space-y-0"
                                key={num}
                              >
                                <FormControl>
                                  <RadioGroupItem value={num} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {num}
                                </FormLabel>
                              </FormItem>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>Cancel</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </RHForm>
      </div>
    </div>
  );
}
