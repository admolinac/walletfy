import { currencyFormatter } from "@/utils/formatters";

type FinancialSummaryProps = {
    income: number;
    expense: number;
    monthlyBalance: number;
    globalBalance: number;
}


export default function FinancialSummary({ income, expense, monthlyBalance, globalBalance }: FinancialSummaryProps) {

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
                <span className="text-gray-700 dark:text-gray-200">{currencyFormatter.format(monthlyBalance)}</span>
            </div>
            <div className="flex justify-between font-semibold mt-1">
                <span>Global:</span>
                <span className="text-gray-700 dark:text-gray-200">{currencyFormatter.format(globalBalance)}</span>
            </div>
        </div >
    );
}
