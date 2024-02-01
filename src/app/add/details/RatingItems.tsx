import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface IRatingItem {
  num: string;
}

export default function RatingItem({ num }: IRatingItem) {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0" key={num}>
      <FormControl>
        <RadioGroupItem value={num} />
      </FormControl>
      <FormLabel className="font-normal">{num}</FormLabel>
    </FormItem>
  );
}
