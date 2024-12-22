import { Alert, Box, CircularProgress, Typography } from '@mui/joy';
import { PieChart, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import React from 'react';
import { useBudget } from '../BudgetContext';
import AggregateView from '../components/AggregateView';
import BalanceCard from '../components/BalanceCard';

const Statistics: React.FC = () => {
    const {
        transactions,
        loading,
        error,
        totalIncome,
        totalExpenses,
        remainingBalance
    } = useBudget();

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

    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    borderBottom: '2px solid',
                    borderColor: '#84cc16',
                    pb: 2
                }}
            >
                <PieChart size={28} color="#84cc16" />
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
                    Statistics
                </Typography>
            </Box>

            {/* Stat Cards */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr'
                    },
                    gap: 3,
                    py: 3,
                }}
            >
                <BalanceCard
                    title="Total Income"
                    amount={totalIncome}
                    icon={<TrendingUp size={20} color="white" />}
                    variant="income"
                />
                <BalanceCard
                    title="Total Expenses"
                    amount={totalExpenses}
                    icon={<TrendingDown size={20} color="white" />}
                    variant="expense"
                />
                <BalanceCard
                    title="Balance"
                    amount={remainingBalance}
                    icon={<Wallet size={20} color="white" />}
                    variant="balance"
                />
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                    },
                    gap: 3,
                }}
            >
                <AggregateView
                    transactions={transactions}
                    type="income"
                    total={totalIncome}
                    title="Income Details"
                />
                <AggregateView
                    transactions={transactions}
                    type="expense"
                    total={totalExpenses}
                    title="Expense Details"
                />
            </Box>
        </Box>
    );
};

export default Statistics;