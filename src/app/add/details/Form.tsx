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

interface EventData {
  id: number;
  eventName: string | null;
  date: string | null;
  artistName: string | null;
  venueName: string | null;
  promoterName: string | null;
}

interface IFormInput {
  performanceRating: number;
}

const formSchema = z.object({
  performance: z.string(),
});

export default function Form({
  id,
  eventName,
  date,
  artistName,
  venueName,
  promoterName,
}: EventData) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performance: "5",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      <div>
        <div>{id}</div>
        <div>{eventName}</div>
        <div>{date}</div>
        <div>{artistName}</div>
        <div>{venueName}</div>
        <div>{promoterName}</div>
      </div>
      <div>
        <RHForm {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Drawer>
              <DrawerTrigger>Open</DrawerTrigger>
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

            <Button type="submit">Submit</Button>
          </form>
        </RHForm>
      </div>
    </div>
  );
}
