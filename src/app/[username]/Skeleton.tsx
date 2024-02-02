import { Skeleton as ShadSkeleton } from "@/components/ui/skeleton";

export default function Skeleton() {
  return (
    <div className="p-4 py-8 flex flex-col gap-10">
      <div className="flex items-center space-x-4 w-full">
        <ShadSkeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <ShadSkeleton className="h-4 w-[250px]" />
          <ShadSkeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="">
        <ShadSkeleton className="h-[66px] w-full rounded-xl" />
      </div>
      <div className="flex flex-col space-y-3">
        <ShadSkeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <ShadSkeleton className="h-4 w-full" />
          <ShadSkeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <ShadSkeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <ShadSkeleton className="h-4 w-full" />
          <ShadSkeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
