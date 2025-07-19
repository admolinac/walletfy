import type { EventType } from "@/types/eventType";
import { currencyFormatter } from "@/utils/formatters";


export default function FinancialSummary({ events }: { events: Array<EventType> }) {
    const income = events.filter(e => e.type === "income").reduce((acc, e) => acc + e.amount, 0);
    const expense = events.filter(e => e.type === "expense").reduce((acc, e) => acc + e.amount, 0);
    const balance = income - expense;

    return (
        <div className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
                <span>Income:</span>
                <span className="text-green-600 dark:text-green-400">{currencyFormatter.format(income)}</span>
            </div>
            <div className="flex justify-between">
                <span>Expense:</span>
                <span className="text-red-400 dark:text-red-300">{currencyFormatter.format(expense)}</span>
            </div>
            <div className="flex justify-between font-semibold mt-1">
                <span>Monthly:</span>
                <span className="text-gray-700 dark:text-gray-200">{currencyFormatter.format(balance)}</span>
            </div>
            <div className="flex justify-between font-semibold mt-1">
                <span>Global:</span>
                <span className="text-gray-700 dark:text-gray-200">{currencyFormatter.format(balance)}</span>
            </div>
        </div >
    );
}
