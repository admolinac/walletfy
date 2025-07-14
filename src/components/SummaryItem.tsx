import type { SummaryItemType } from "@/types/SummaryItemType";
import { currencyFormatter } from "@/utils/formatters";
import { cn } from "@/utils/style";

type SummaryItemProps = SummaryItemType & {
    className?: string;
};

const SummaryItem = (props: SummaryItemProps) => {

    const { label, value } = props;

    return (
        <div className={cn("p-2 flex text-sm flex-row justify-between", props.className)}>
            <p className="capitalize font-semibold text-gray-700 dark:text-gray-200">
                {label}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
                {currencyFormatter.format(value)}
            </p>
        </div>
    );
};

export default SummaryItem;
