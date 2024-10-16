import React from 'react';
import { Box, IconButton, Typography } from '@mui/joy';
import { X, Trash2, XCircle } from 'lucide-react';

interface SkillChipProps {
    skill: string;
    color: string;
    onRemove: () => void;
}

// Variant 1: Gradient Background
const GradientSkillChip: React.FC<SkillChipProps> = ({ skill, color, onRemove }) => (
    <Box
        sx={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: 'pill',
            px: 2,
            py: 1,
            background: `linear-gradient(45deg, ${color}, ${color}66)`,
            color: 'white',
            boxShadow: 'sm',
            '&:hover': { boxShadow: 'md' },
        }}
    >
        <Typography level="body-sm" fontWeight="bold" mr={1}>
            {skill}
        </Typography>
        <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={onRemove}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
        >
            <X size={16} />
        </IconButton>
    </Box>
);

// Variant 2: Outlined with Accent
const OutlinedSkillChip: React.FC<SkillChipProps> = ({ skill, color, onRemove }) => (
    <Box
        sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyItems: 'space-between',
            border: '2px solid',
            borderColor: color,
            borderRadius: 'md',
            px: 1.5,
            width: 'fit-content',
            color: color,
            '&:hover': { bgcolor: `${color}11` },
        }}
    >
        <Box
            sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: color,
                mr: 1,
            }}
        />
        <Typography level="body-sm" fontWeight="medium" mr={1}>
            {skill}
        </Typography>
        <IconButton
            size="sm"
            variant="plain"
            color="success"
            onClick={onRemove}
        >
            <Trash2 size={14} />
        </IconButton>
    </Box>
);

// Variant 3: Minimalist Tag
const MinimalistSkillChip: React.FC<SkillChipProps> = ({ skill, color, onRemove }) => (
    <Box
        sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyItems: 'space-between',
            bgcolor: 'background.body',
            borderLeft: `4px solid ${color}`,
            borderRadius: 'sm',
            px: 1.5,
            py: 0.5,
            boxShadow: 'sm',
            '&:hover': { boxShadow: 'md', bgcolor: 'background.level1' },
        }}
    >
        <Typography level="body-sm" sx={{ color, mr: 1 }} fontWeight="medium">
            {skill}
        </Typography>
        <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={onRemove}
            sx={{ '&:hover': { color: 'danger.main' } }}
        >
            <XCircle size={16} />
        </IconButton>
    </Box>
);

export { GradientSkillChip, OutlinedSkillChip, MinimalistSkillChip };