import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { EXPENSE_TYPES, INCOME_TYPES, Transaction } from "@/apps/BudgetBuddy/helpers/expense.constants";

interface CategoryData {
    name: string;
    value: number;
    color: string;
    percentage: number;
}

interface AggregateViewProps {
    transactions: Transaction[];
    type: "income" | "expense";
    total: number;
    title: string;
}

const getChartColors = (color: string) => ({
    border: color,
    fill: `${color}40`, // 25% opacity
});

export const AggregateView: React.FC<AggregateViewProps> = ({
    transactions,
    type,
    total,
    title,
}) => {
    const CATEGORIES = type === "income" ? INCOME_TYPES : EXPENSE_TYPES;

    const categoryData: CategoryData[] = CATEGORIES.map((category) => {
        const categoryTotal = transactions
            .filter((t) => t.type === type && t.category === category.name)
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            name: category.name,
            value: categoryTotal,
            color: category.color,
            percentage: (categoryTotal / total) * 100,
        };
    })
        .filter((category) => category.value > 0)
        .sort((a, b) => b.value - a.value);

    return (
        <div
            className={`
                rounded-2xl shadow-xl overflow-hidden p-4 sm:p-6
                bg-white/60 dark:bg-zinc-900/60 
                backdrop-blur-md border border-zinc-200 dark:border-zinc-700
               
            `}
            style={{
                boxShadow: `
                0 4px 20px rgba(0,0,0,0.05),
                0 0 30px rgba(0, 94, 255, 0.05),
                inset 0 1px 0 rgba(255,255,255,0.3)
                `,
            }}
        >
            {/* Title */}
            <h3 className="text-center text-xl font-medium font-sans text-zinc-800 dark:text-zinc-200 mb-4">
                {title}
            </h3>

            {/* Chart Section */}
            <div className="h-64 flex items-center justify-center mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            dataKey="value"
                            strokeWidth={1}
                        >
                            {categoryData.map((entry, index) => {
                                const colors = getChartColors(entry.color);
                                return (
                                    <Cell
                                        key={index}
                                        fill={colors.fill}
                                        stroke={colors.border}
                                    />
                                );
                            })}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* List Section */}
            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-thumb-rounded dark:scrollbar-thumb-zinc-600">
                {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center gap-3">
                        {/* Color Block */}
                        <div
                            className="w-3 h-3 rounded-sm shadow-sm"
                            style={{
                                background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}80 100%)`,
                            }}
                        />

                        {/* Category Name */}
                        <span className="flex-1 font-medium text-sm text-zinc-700 dark:text-zinc-200">
                            {category.name}
                        </span>

                        {/* Percentage */}
                        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                            {category.percentage.toFixed(1)}%
                        </span>

                        {/* Value */}
                        <span className="text-xs tabular-nums text-right min-w-[100px] text-zinc-600 dark:text-zinc-400">
                            (₹{category.value.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AggregateView;
