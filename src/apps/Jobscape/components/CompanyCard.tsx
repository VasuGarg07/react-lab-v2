import React from 'react';
import { Card, Box, Typography, Button, AspectRatio } from '@mui/joy';
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
            maxWidth: 380,
            p: 2,
            mb: 2,
            bgcolor: 'background.surface',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            borderColor: 'neutral.outlinedBorder',
            '&:hover': {
                borderColor: 'primary.300',
                boxShadow: 'md',
                cursor: 'pointer',
            },
        }}
        onClick={() => onClick(info.id)}
    >
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <AspectRatio
                ratio="1"
                sx={{
                    width: 72,
                    borderRadius: 'md',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    flexShrink: 0,
                }}
            >
                <img
                    src={info.logoURL}
                    alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </AspectRatio>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    level="h4"
                    sx={{
                        fontSize: 'lg',
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 0.5,
                        letterSpacing: '-0.01em'
                    }}
                >
                    {info.companyName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <MapPin
                        size={14}
                        style={{
                            color: 'var(--joy-palette-neutral-400)',
                            strokeWidth: 2
                        }}
                    />
                    <Typography
                        level="body-sm"
                        sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            color: 'neutral.500',
                            fontWeight: 500
                        }}
                    >
                        {info.address}
                    </Typography>
                </Box>
            </Box>
        </Box>

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mt: 'auto'
            }}
        >
            <Typography
                sx={{
                    color: 'primary.600',
                    bgcolor: 'primary.50',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 'md',
                    fontSize: 'sm',
                    fontWeight: 600
                }}
            >
                {`${info.activeJobsCount} Open Position${info.activeJobsCount !== 1 ? 's' : ''}`}
            </Typography>

            <Button
                size="sm"
                variant="solid"
                color="primary"
                endDecorator={
                    <ArrowRight
                        size={16}
                        style={{
                            transition: 'transform 0.2s ease',
                        }}
                    />
                }
                sx={{
                    fontWeight: 600,
                    '&:hover': {
                        transform: 'translateX(4px)',
                        transition: 'all 0.3s ease-in-out'
                    },
                }}
            >
                Know More
            </Button>
        </Box>
    </Card>
);