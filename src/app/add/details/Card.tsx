import Image from "next/image";
import type { FormProps } from "./Form";

export default function Card(props: FormProps) {
  const datearray = props.eventData!.date!.split("/");

  var formattedDate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];

  const cardDate = new Date(formattedDate);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[cardDate.getMonth()].slice(0, 3);
  const day = cardDate.getDate();
  const year = cardDate.getFullYear();

  return (
    <div className="max-w-lg rounded-xl overflow-hidden shadow-lg border bg-white text-black m-2.5">
      <section className="border-dashed border-b border-zinc-300">
        <div className="rounded-lg m-2.5 overflow-hidden mb-5 max-h-40">
          <Image
            className="w-full object-cover"
            src="/images/concert.jpg"
            alt="Sunset in the mountains"
            width={400}
            height={200}
            priority
          />
        </div>
      </section>

      <section className="">
        <div className="flex flex-row">
          <div className="w-1/5 flex flex-col items-center justify-center p-4 text-neutral-800 border-r border-dashed border-zinc-300">
            <div className="text-sm uppercase">{month}</div>
            <div className="font-bold text-xl">{day}</div>
            <div className="text-sm font-medium text-neutral-400">{year}</div>
          </div>
          <div className="w-4/5 p-2 flex flex-col justify-center ">
            <div className="tracking-tight font-semibold text-lg flex items-center text-neutral-800 leading-6 mb-0.5">
              {props.eventData.artist}&nbsp;
              <span>
                {props.eventData?.tour && <span>{props.eventData.tour}</span>}
              </span>
            </div>
            <span className="text-sm text-zinc-500">
              {props.eventData.venue}, {props.eventData.city}
            </span>
          </div>
        </div>
      </section>
      <section id="tab"></section>
    </div>
  );
}
