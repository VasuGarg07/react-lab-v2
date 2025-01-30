import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import { LucideIcon } from "lucide-react";

interface InfoBoxProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    divider?: boolean
}

const InfoStrip: React.FC<InfoBoxProps> = ({ title, value, icon: Icon, divider = true }) => (
    <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Icon color="var(--joy-palette-primary-500)" />
            <Box>
                <Typography level="body-xs" sx={{ color: 'neutral.400', textTransform: 'capitalize' }}>{title}</Typography>
                <Typography>{value}</Typography>
            </Box>
        </Box>
        {divider && <Divider sx={{ my: 2 }} />}
    </>
);

export default InfoStrip;