import { DrawerClose, DrawerTitle } from "@/components/ui/drawer";

interface IDrawerHeader {
  heading: string;
  subheading: string | null;
  starRating: string | null;
}

export default function DrawerHeader({
  heading,
  subheading,
  starRating,
}: IDrawerHeader) {
  return (
    <div className="flex flex-row justify-between items-center p-4">
      <div className="flex flex-col gap-y-1">
        <DrawerTitle>
          <div className="text-left">{heading}</div>
        </DrawerTitle>
        <div className="text-left text-sm text-zinc-400">{subheading}</div>
      </div>
      <DrawerClose>{starRating !== "0" ? "Save" : "Cancel"}</DrawerClose>
    </div>
  );
}
