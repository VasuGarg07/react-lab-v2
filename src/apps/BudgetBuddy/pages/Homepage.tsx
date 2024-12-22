import {
    Box,
    Button,
    Card,
    Divider,
    LinearProgress,
    Typography
} from '@mui/joy';
import {
    ArrowDownCircle,
    ArrowUpCircle,
    Clock,
    Download,
    History,
    PieChart,
    Plus,
    User2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthProvider';
import { CSVDownloader } from '../../../shared/CSVDownloader';
import { useBudget } from '../BudgetContext';

const HomePage = () => {
    const {
        transactions,
        totalIncome,
        totalExpenses,
        remainingBalance,
        handleAddTransaction,
    } = useBudget();

    const { user } = useAuth();

    const navigate = useNavigate();

    const handleDownload = () => {
        try {
            const downloader = new CSVDownloader(transactions);
            const fileName = `Expense Report - ${new Date().toDateString()}`;
            downloader.parseData();
            downloader.download(fileName);
        } catch (error) {
            console.error('Failed to download CSV:', error);
            // TODO: You might want to add proper error handling/notification here
        }
    };

    const recentTransactions = transactions.slice(0, 5);

    return (
        <Box sx={{ p: 3 }}>
            {/* Header Section */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    borderBottom: '2px solid',
                    borderColor: '#84cc16',
                    pb: 2,
                    mb: 3,
                }}
            >
                <User2 size={28} color="#84cc16" />
                <Typography
                    level="h2"
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        fontFamily: 'Montserrat',
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                    }}
                >
                    Welcome, {user?.username}
                </Typography>
            </Box>

            {/* Main Grid */}
            <Box sx={{ display: 'grid', gap: 3 }}>
                {/* Summary Cards */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
                    <Card variant="outlined">
                        <Typography level="body-xs" sx={{ mb: 0.5 }}>
                            CURRENT BALANCE
                        </Typography>
                        <Typography level="h2">₹{remainingBalance.toLocaleString()}</Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                            Total available funds
                        </Typography>
                    </Card>

                    <Card variant="outlined">
                        <Typography level="body-xs" sx={{ mb: 0.5 }}>
                            TOTAL INCOME
                        </Typography>
                        <Typography level="h2" sx={{ color: 'success.500' }}>
                            ₹{totalIncome.toLocaleString()}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'success.500' }}>
                            <ArrowUpCircle size={16} />
                            <Typography level="body-sm">This month's earnings</Typography>
                        </Box>
                    </Card>

                    <Card variant="outlined">
                        <Typography level="body-xs" sx={{ mb: 0.5 }}>
                            TOTAL EXPENSES
                        </Typography>
                        <Typography level="h2" sx={{ color: 'danger.500' }}>
                            ₹{totalExpenses.toLocaleString()}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'danger.500' }}>
                            <ArrowDownCircle size={16} />
                            <Typography level="body-sm">This month's spending</Typography>
                        </Box>
                    </Card>

                    <Card
                        variant="solid"
                        sx={{
                            bgcolor: '#683de6',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#5330b9' },
                        }}
                        onClick={handleAddTransaction}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center', gap: 1,
                            color: 'white', height: 1
                        }}>
                            <Plus size={24} />
                            <Typography level="h4" sx={{ color: 'common.white' }}>Add Transaction</Typography>
                            <Typography level="title-sm" sx={{ color: 'common.white' }}>Record new income or expense</Typography>
                        </Box>
                    </Card>
                </Box>

                {/* Content Grid */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                    {/* Recent Transactions */}
                    <Card variant="outlined">
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography level="h4">Recent Transactions</Typography>
                                <Button
                                    variant="plain"
                                    color="neutral"
                                    size="sm"
                                    endDecorator={<History size={16} />}
                                    onClick={() => navigate('/budget-buddy/overview')}
                                >
                                    View All
                                </Button>
                            </Box>
                            <Divider />
                            <Box sx={{ mt: 2 }}>
                                {recentTransactions.map((transaction) => (
                                    <Box
                                        key={transaction.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            py: 1.5,
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                            '&:last-child': { borderBottom: 'none' },
                                        }}
                                    >
                                        <Box>
                                            <Typography>{transaction.title}</Typography>
                                            <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                                                {transaction.category}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography
                                                sx={{
                                                    color: transaction.type === 'income' ? 'success.500' : 'danger.500',
                                                    fontWeight: 'md',
                                                }}
                                            >
                                                {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString()}
                                            </Typography>
                                            <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                                                {new Date(transaction.date).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Card>

                    {/* Monthly Overview */}
                    <Card variant="outlined">
                        <Box sx={{ p: 2 }}>
                            <Typography level="h4" sx={{ mb: 2 }}>
                                Monthly Overview
                            </Typography>
                            <Divider />
                            <Box sx={{ mt: 3, mb: 2 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography level="body-sm">Income</Typography>
                                        <Typography level="body-sm" sx={{ color: 'success.500' }}>
                                            {((totalIncome / (totalIncome + totalExpenses)) * 100).toFixed(0)}%
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        determinate
                                        size="lg"
                                        value={(totalIncome / (totalIncome + totalExpenses)) * 100}
                                        color="success"
                                    />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography level="body-sm">Expenses</Typography>
                                        <Typography level="body-sm" sx={{ color: 'danger.500' }}>
                                            {((totalExpenses / (totalIncome + totalExpenses)) * 100).toFixed(0)}%
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        determinate
                                        size="lg"
                                        value={(totalExpenses / (totalIncome + totalExpenses)) * 100}
                                        color="danger"
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Box>

                {/* Quick Actions */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
                    <Card
                        variant="outlined"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'background.level1' },
                        }}
                        onClick={() => navigate('/budget-buddy/statistics')}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PieChart size={24} color="#84cc16" />
                            <Box>
                                <Typography level="h4">Statistics</Typography>
                                <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                                    View detailed insights
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card
                        variant="outlined"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'background.level1' },
                        }}
                        onClick={() => navigate('/budget-buddy/timeline')}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Clock size={24} color="#84cc16" />
                            <Box>
                                <Typography level="h4">Timeline</Typography>
                                <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                                    Track your progress
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card
                        variant="outlined"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'background.level1' },
                        }}
                        onClick={handleDownload}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Download size={24} color="#84cc16" />
                            <Box>
                                <Typography level="h4">Generate Report</Typography>
                                <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                                    Export transactions as CSV
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;