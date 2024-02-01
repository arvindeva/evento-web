import Image from "next/image";

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

export default function TicketCard({ eventData }: EventData) {
  return (
    <div className="max-w-lg rounded-xl overflow-hidden shadow-lg border bg-white text-black">
      <div className="border-dashed border-b border-zinc-300">
        <div className="rounded-lg m-3 overflow-hidden mb-6">
          <Image
            className="w-full "
            src="/images/concert.jpg"
            alt="Sunset in the mountains"
            width={400}
            height={300}
            priority
          />
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{eventData.eventName}</div>
        <p className="text-base">{eventData.venueName}</p>
      </div>
    </div>
  );
}
