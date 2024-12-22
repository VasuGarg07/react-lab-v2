import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

interface StatCardProps {
    title: string;
    amount: number;
    icon: React.ReactNode;
    variant: 'income' | 'expense' | 'balance';
}

const styles = {
    income: {
        background: 'linear-gradient(135deg, #22c55e 0%,rgb(3, 101, 39) 100%)',
        iconBg: 'rgba(255, 255, 255, 0.2)',
        shadow: '0 8px 16px -4px rgba(34, 197, 94, 0.2)',
    },
    expense: {
        background: 'linear-gradient(135deg, #ef4444 0%,rgb(133, 4, 4) 100%)',
        iconBg: 'rgba(255, 255, 255, 0.2)',
        shadow: '0 8px 16px -4px rgba(239, 68, 68, 0.2)',
    },
    balance: {
        background: 'linear-gradient(135deg, #6366f1 0%,rgb(12, 5, 127) 100%)',
        iconBg: 'rgba(255, 255, 255, 0.2)',
        shadow: '0 8px 16px -4px rgba(99, 102, 241, 0.2)',
    }
};

const BalanceCard: React.FC<StatCardProps> = ({ title, amount, icon, variant }) => (
    <Card
        variant="solid"
        sx={{
            p: 2,
            background: styles[variant].background,
            boxShadow: 'md',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            transition: 'transform 0.2s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
            }
        }}
    >
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography
                level="title-lg"
                sx={{
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.875rem',
                    fontWeight: 600
                }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    p: 1,
                    borderRadius: 'md',
                    backgroundColor: styles[variant].iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {icon}
            </Box>
        </Box>
        <Typography
            level="h3"
            sx={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '-0.5px'
            }}
        >
            ₹{amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}
        </Typography>
    </Card>
);

export default BalanceCard;