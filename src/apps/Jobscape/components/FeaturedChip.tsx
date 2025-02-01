import Chip from '@mui/joy/Chip';
import React from 'react';

const FeaturedChip: React.FC = () => (
    <Chip
        size="sm"
        variant="soft"
        color="danger"
        sx={{
            fontSize: '11px',
            px: 1,
            py: 0,
            height: '20px',
            fontWeight: 500,
            textTransform: 'capitalize',
            bgcolor: 'var(--joy-palette-danger-100)',
            color: 'var(--joy-palette-danger-600)'
        }}
    >
        Featured
    </Chip>
)

export default FeaturedChip