import { Box, Card, Typography } from '@mui/joy';
import { MapPin } from 'lucide-react';
import React from 'react';
import { JobsCardInfo } from '@/apps/Jobscape/helpers/response.types';
import FeaturedChip from '@/apps/Jobscape/components/FeaturedChip';

interface JobCardProps {
    info: JobsCardInfo;
    onClick: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ info, onClick }) => (
    <Card
        variant="outlined"
        sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            background: info.isFeatured ? 'linear-gradient(to right, #F6BA001d 0%, rgba(246, 186, 0, 0) 100%)' : 'transparent',
            boxShadow: 'none',
            borderRadius: 'md',
            height: 1,
            '&:hover': {
                cursor: 'pointer',
                borderColor: 'primary.300',
                boxShadow: 'md'
            },
        }}
        onClick={() => onClick(info.id)}
    >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>

            <Box
                component="img"
                src={info.logoURL}
                alt={info.companyName}
                style={{
                    objectFit: 'cover',
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                }}
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
                    <Typography level="body-md" sx={{ fontWeight: 500 }}>
                        {info.title}
                    </Typography>
                    {info.isFeatured && (<FeaturedChip />)}
                </Box>

                <Typography
                    level="title-sm"
                    sx={{
                        mb: 0.5,
                        color: 'neutral.400'
                    }}
                >
                    {info.companyName}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    columnGap: 1,
                    color: 'neutral.500',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Typography level="body-sm">Full Time</Typography>
                    <Typography level="body-sm">•</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <MapPin size={14} />
                        <Typography level="body-sm">
                            {info.location}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Card>
);

export default JobCard;