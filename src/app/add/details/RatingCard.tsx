import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const ratings = ["1", "2", "3", "4", "5"];

interface IRatingCard {
  title: string | null;
  currentRating: string;
}

export default function RatingCard({ title, currentRating }: IRatingCard) {
  return (
    <Card className="px-4 py-5 dark:bg-greybg flex">
      <div className="flex flex-row justify-between items-center w-full">
        <div>{title}</div>
        <div className="flex flex-row">
          {ratings.map((rating) => (
            <Star
              fill={`${
                parseInt(currentRating) >= parseInt(rating)
                  ? "#FACC15"
                  : "#D8DDE4"
              }`}
              strokeWidth={0}
              key={rating}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
