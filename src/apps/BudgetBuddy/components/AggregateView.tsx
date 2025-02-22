import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { PieChart, Cell, Pie, ResponsiveContainer } from 'recharts';
import { EXPENSE_TYPES, INCOME_TYPES, Transaction } from "@/apps/BudgetBuddy/helpers/expense.constants";
import { useColorScheme } from "@mui/joy/styles";

interface CategoryData {
    name: string;
    value: number;
    color: string;
    percentage: number;
}

interface AggregateViewProps {
    transactions: Transaction[];
    type: 'income' | 'expense';
    total: number;
    title: string;
}

const getChartColors = (color: string) => ({
    border: color,
    fill: `${color}40` // 50% opacity
});

const AggregateView: React.FC<AggregateViewProps> = ({ transactions, type, total, title }) => {
    const CATEGORIES = type === 'income' ? INCOME_TYPES : EXPENSE_TYPES;
    const { mode } = useColorScheme();

    const categoryData: CategoryData[] = CATEGORIES.map(category => {
        const categoryTotal = transactions
            .filter(t => t.type === type && t.category === category.name)
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            name: category.name,
            value: categoryTotal,
            color: category.color,
            percentage: (categoryTotal / total) * 100
        };
    }).filter(category => category.value > 0)
        .sort((a, b) => b.value - a.value); // Sort by value descending

    return (
        <Card
            variant="solid"
            sx={{
                background: mode === 'light'
                    ? `
                        radial-gradient(circle at 30% 0%, rgba(0, 94, 255, 0.2), transparent 70%),
                        radial-gradient(circle at 70% 100%, rgba(255, 0, 0, 0.2), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4), transparent 70%)
                      `
                    : `
                        radial-gradient(circle at 30% 0%, rgba(47, 19, 235, 0.2), transparent 70%),
                        radial-gradient(circle at 70% 100%, rgba(189, 22, 3, 0.4), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), transparent 70%)
                      `,
                boxShadow: 'md',
                overflow: 'hidden'
            }}
        >
            {/* Title */}
            <Typography
                level="h3"
                sx={{
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    pt: 1,
                    fontFamily: 'Noto Sans',
                    fontWeight: 400
                }}
            >
                {title}
            </Typography>

            <Box sx={{ px: 2, pb: 2 }}>
                {/* Chart Section */}
                <Box
                    sx={{
                        height: 300,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        userSelect: 'none'
                    }}
                >
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
                </Box>

                {/* List Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        maxHeight: '300px',
                        overflowY: 'auto',
                        pr: 1,
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: mode == 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                        },
                    }}
                >
                    {categoryData.map((category, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5
                            }}
                        >
                            {/* Color Block */}
                            <Box
                                sx={{
                                    width: '12px',
                                    height: '12px',
                                    background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}80 100%)`,
                                    borderRadius: '3px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                            />

                            {/* Category Name */}
                            <Typography
                                level="body-md"
                                sx={{
                                    flex: 1,
                                    fontWeight: 500
                                }}
                            >
                                {category.name}
                            </Typography>

                            {/* Percentage */}
                            <Typography
                                level="body-md"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                {category.percentage.toFixed(1)}%
                            </Typography>

                            {/* Value */}
                            <Typography
                                level="body-sm"
                                sx={{
                                    minWidth: '120px',
                                    textAlign: 'right'
                                }}
                            >
                                (₹{category.value.toLocaleString('en-IN', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })})
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Card>
    );
};

export default AggregateView;