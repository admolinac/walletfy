import dayjs from "dayjs";
import { Tooltip } from '@mantine/core';
import type { EventType } from "@/types/eventType";
import { cn } from "@/utils/style";
import { currencyFormatter } from "@/utils/formatters";


type EventItemProps = EventType & {
    className?: string,
}

const EventItem = (props: EventItemProps) => {
    const { name, date, description, amount, type, id } = props;

    return (
        <>
            <Tooltip label={description} color="indigo" position="bottom-start" offset={5}>
                <div
                    className={cn(
                        "p-2 rounded-md flex justify-between gap-x-32 hover:bg-gray-100 dark:hover:bg-zinc-700",
                        props.className,
                    )}
                >
                    <div className="flex flex-col text-base text-left text-gray-700">
                        <span className="text-sm text-gray-700 dark:text-gray-200">{name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-300">
                            {dayjs(date).format("DD/MM/YYYY")}
                        </span>
                    </div>
                    <div
                        className={cn(
                            "text-sm",
                            type === "expense"
                                ? "text-red-400 dark:text-red-300"
                                : "text-green-600 dark:text-green-400"
                        )}
                    >
                        {currencyFormatter.format(amount)}
                    </div>
                </div>
            </Tooltip>
            <div className="border-b border-gray-200 w-full h-px my-2 dark:border-zinc-500"></div>
        </>
    );
};

export default EventItem;