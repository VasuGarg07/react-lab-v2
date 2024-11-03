import { Card, CardContent, Stack, Typography } from "@mui/joy";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <Card
        variant="outlined"
        sx={{
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            },
        }}
    >
        <CardContent>
            <Stack direction="column" spacing={1} alignItems="center" textAlign="center">
                {icon}
                <Typography level="h3" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</Typography>
                <Typography sx={{ fontSize: '0.875rem' }}>{description}</Typography>
            </Stack>
        </CardContent>
    </Card>
);

export default FeatureCard;