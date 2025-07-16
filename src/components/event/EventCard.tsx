// src/components/TransactionsCard.tsx
import EventList from "./EventList";
import FinancialSummary from "./FinancialSummary";
import type { EventType } from "@/types/eventType";

type EventCardProps = {
    month: string;
    year: string;
    events: Array<EventType>;
};

const EventCard = ({ month, year, events }: EventCardProps) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-800">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-zinc-600">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {`${month} ${year}`}
                </h2>
            </div>

            <div className="px-4 py-2 space-y-2">
                <EventList />
            </div>

            <div className="border-t border-gray-200 dark:border-zinc-600 px-4 py-3">
                <FinancialSummary events={events} />
            </div>
        </div>
    );
}

export default EventCard;
