import { source_serif_4 } from "@/app/fonts";
import { cn } from "@/lib/utils";
import concertImage from "../../../public/images/concert.jpg";
import Image from "next/image";

export default function EventoDesignPage() {
  return (
    <div className="relative overflow-hidden h-[190px] min-w-[350px] max-w-[400px] flex flex-col justify-between rounded-2xl">
      <div className="flex flex-row h-full">
        <div className="absolute inline-block -z-10 inset-0">
          <Image
            src={concertImage}
            alt="hi"
            fill
            style={{ objectFit: "cover" }}
            className="static opacity-25"
          />
        </div>
        <div className="flex flex-col p-3 justify-center items-center border-r backdrop-grayscale border-r-zinc-300 bg-gradient-to-b from-violet-500 to-fuchsia-500 bg-opacity-50">
          <h1 className="text-lg leading-none">31</h1>
          <h1 className="text-2xl font-semibold">JAN</h1>
          <h1 className="text-lg leading-none">2024</h1>
        </div>
        <div className="p-3 flex flex-col items-end w-full justify-between">
          <div className="flex flex-col items-end">
            <h1
              className={cn(
                "text-[24px] font-bold font-serif tracking-wide",
                source_serif_4.className,
              )}
            >
              Placebo
            </h1>
            <h2 className="font-light">Mylo Xyloto Tour</h2>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm">House Of Blues</div>
            <div className="font-semibold text-xl">Boston, USA</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between h-7 px-4 border-t border-t-zinc-300 text-sm bg-gradient-to-l from-violet-500 to-fuchsia-500">
        <div className="font-semibold">Evento</div>
        <div className="text-xs">2024</div>
      </div>
    </div>
  );
}
