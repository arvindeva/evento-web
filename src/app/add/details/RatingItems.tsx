import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";

interface IRatingItem {
  num: string;
  active: boolean;
}

export default function RatingItem({ num, active }: IRatingItem) {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0" key={num}>
      <FormControl>
        <RadioGroupItem value={num} active={active}></RadioGroupItem>
      </FormControl>
    </FormItem>
  );
}
