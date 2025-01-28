import React from 'react';
import { Card, Box, Typography, Button } from '@mui/joy';
import { MapPin, ArrowRight } from 'lucide-react';
import { CompanyCardInfo } from '../helpers/response.types';

interface CompanyCardProps {
    info: CompanyCardInfo;
    onClick: (id: string) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ info, onClick }) => (
    <Card
        variant="outlined"
        sx={{
            width: '100%',
            p: 1.5,
            mb: 1,
            transition: 'all 0.2s',
            '&:hover': {
                bgcolor: 'background.level1',
                cursor: 'pointer',
            },
        }}
        onClick={() => onClick(info.id)}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <img
                src={info.logoURL}
                alt=""
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                }}
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography level="title-sm">{info.companyName}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <MapPin size={13} />
                    <Typography
                        level="body-sm"
                        color="neutral"
                        sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {info.address}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                    level="body-xs"
                    sx={{
                        bgcolor: 'background.level2',
                        px: 1,
                        py: 0.5,
                        borderRadius: 'sm',
                    }}
                >
                    {`${info.activeJobsCount} open job${info.activeJobsCount !== 1 ? 's' : ''}`}
                </Typography>

                <Button
                    variant="plain"
                    color="primary"
                    endDecorator={<ArrowRight size={14} />}
                    size="sm"
                    sx={{
                        gap: 0.5,
                        '&:hover': {
                            '& .lucide-arrow-right': {
                                transform: 'translateX(2px)',
                            },
                        },
                        '& .lucide-arrow-right': {
                            transition: 'transform 0.2s',
                        },
                    }}
                >
                    Find Jobs
                </Button>
            </Box>
        </Box>
    </Card>
);