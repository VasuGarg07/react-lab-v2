import React, { useMemo } from 'react'
import { useBudget } from '@/apps/BudgetBuddy/BudgetContext'
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import { BarChart4 } from 'lucide-react';
import Card from '@mui/joy/Card';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Timeline: React.FC = () => {
    const { transactions, loading, error } = useBudget();
    const timelineData = useMemo(() => {
        if (!transactions.length) return [];

        const sorted = [...transactions].sort((a, b) => a.date - b.date);
        let balance = 0;

        return sorted.map(txn => {
            balance += (txn.type === 'income' ? txn.amount : -txn.amount);
            return {
                date: new Date(txn.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit'
                }),
                balance,
                status: balance >= 0 ? 'positive' : 'negative'
            };
        });
    }, [transactions]);


    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 52px)',
                    p: 3
                }}
            >
                <CircularProgress
                    size="lg"
                    variant="soft"
                    sx={{
                        '--CircularProgress-trackColor': 'rgba(132, 204, 22, 0.1)',
                        '--CircularProgress-progressColor': '#84cc16',
                    }}
                />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert
                    variant="soft"
                    color="danger"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        boxShadow: 'sm'
                    }}
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    if (!transactions.length) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert
                    variant="soft"
                    color="neutral"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        boxShadow: 'sm'
                    }}
                >
                    No transactions found. Add some transactions to see your balance timeline.
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    borderBottom: '2px solid',
                    borderColor: '#84cc16',
                    pb: 2,
                    mb: 3
                }}
            >
                <BarChart4 size={28} color="#84cc16" />
                <Typography
                    level="h2"
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        fontFamily: 'Montserrat',
                        letterSpacing: 1,
                        textTransform: 'uppercase'
                    }}
                >
                    Timeline
                </Typography>
            </Box>

            <Card
                variant="soft"
                sx={{
                    p: 2,
                    boxShadow: 'md',
                    background: 'rgba(255, 255, 255, 0.8)',
                    height: '500px', // Fixed height for better consistency
                    transition: 'box-shadow 0.2s ease',
                    '&:hover': {
                        boxShadow: 'lg',
                    },
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={timelineData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(0,0,0,0.1)"
                            vertical={false} // Only show horizontal grid lines for cleaner look
                        />
                        <XAxis
                            dataKey="date"
                            stroke="rgba(0,0,0,0.5)"
                            fontSize={12}
                            tickMargin={8}
                            tick={{ fill: 'rgba(0,0,0,0.7)' }} // Slightly darker text
                        />
                        <YAxis
                            stroke="rgba(0,0,0,0.5)"
                            fontSize={12}
                            tickFormatter={(value) => `₹${value.toLocaleString()}`}
                            tick={{ fill: 'rgba(0,0,0,0.7)' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine
                            y={0}
                            stroke="rgba(0,0,0,0.2)"
                            strokeWidth={1}
                            strokeDasharray="3 3"
                        />
                        <Line
                            type="monotone"
                            dataKey="balance"
                            strokeWidth={2}
                            dot={{
                                stroke: '#999',
                                strokeWidth: 2,
                                r: 4,
                            }}
                            stroke="url(#colorGradient)"
                            animationDuration={1000}
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </Box>
    );
}

export default Timeline;

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const balance = payload[0].value;
        return (
            <Card
                variant="outlined"
                sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    p: 1.5
                }}
            >
                <Typography level="body-sm" fontWeight="bold">
                    {label}
                </Typography>
                <Typography
                    level="body-sm"
                    sx={{
                        color: balance >= 0 ? '#16a34a' : '#dc2626',
                        fontWeight: 500
                    }}
                >
                    ₹{balance.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </Typography>
            </Card>
        );
    }
    return null;
};
