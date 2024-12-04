import { Box, Typography, IconButton } from '@mui/joy';
import { motion } from 'framer-motion';
import { Plus, Volume2 } from 'lucide-react';

// ===== Audio Player Component =====
interface AudioPlayerProps {
    src: string;
    label: string;
}

export const AudioPlayer = ({ src, label }: AudioPlayerProps) => (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 2,
        borderRadius: '12px',
        bgcolor: 'background.backdrop',
        border: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: 'primary.500',
        }
    }}>
        <Volume2 size={20} />
        <Typography level="body-sm">{label}</Typography>
        <audio src={src} />
    </Box>
);

// ===== Move List Item Component =====
interface MoveItemProps {
    name: string;
    expanded?: boolean;
    onToggle: () => void;
}

export const MoveItem = ({ name, expanded = false, onToggle }: MoveItemProps) => (
    <Box
        onClick={onToggle}
        sx={{
            position: 'relative',
            p: 2,
            borderRadius: '12px',
            bgcolor: 'background.backdrop',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
                bgcolor: 'background.level1',
            }
        }}
    >
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Typography sx={{ textTransform: 'capitalize' }}>
                {name.replace('-', ' ')}
            </Typography>
            <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{
                    transform: expanded ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.2s'
                }}
            >
                <Plus size={16} />
            </IconButton>
        </Box>
    </Box>
);

// ===== Stat Hexagon Component =====
interface StatHexagonProps {
    label: string;
    value: number;
    maxValue?: number;
    color: string;
}

export const StatHexagon = ({ label, value, maxValue = 255, color }: StatHexagonProps) => {
    const percentage = (value / maxValue) * 100;
    const size = 80;

    return (
        <Box sx={{
            position: 'relative',
            width: size,
            height: size,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <svg width={size} height={size} viewBox="0 0 100 100">
                <motion.path
                    d="M50 3 L93.3 25 L93.3 75 L50 97 L6.7 75 L6.7 25 Z"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: percentage / 100 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
            <Typography
                level="body-xs"
                sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                {value}
            </Typography>
            <Typography
                level="body-xs"
                sx={{
                    position: 'absolute',
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textTransform: 'capitalize'
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

// ===== Pokemon Form Card Component =====
interface FormCardProps {
    name: string;
    url: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const FormCard = ({ name, isActive = false, onClick }: FormCardProps) => (
    <Box
        onClick={onClick}
        sx={{
            p: 2,
            borderRadius: '12px',
            bgcolor: isActive ? 'primary.softBg' : 'background.backdrop',
            border: '1px solid',
            borderColor: isActive ? 'primary.500' : 'divider',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
                transform: 'translateY(-2px)',
                borderColor: 'primary.500',
            }
        }}
    >
        <Typography sx={{ textTransform: 'capitalize' }}>
            {name.replace('-', ' ')}
        </Typography>
    </Box>
);

// ===== Sprite Gallery Component =====
interface SpriteGalleryProps {
    sprites: {
        front_default: string;
        back_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
            'home': {
                front_default: string;
            };
            'showdown': {
                front_default: string;
                back_default: string;
            }
        };
    };
}

export const SpriteGallery = ({ sprites }: SpriteGalleryProps) => (
    <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: 2,
        p: 2,
        borderRadius: '16px',
        bgcolor: 'background.backdrop',
    }}>
        {Object.entries(sprites)
            .filter(([key, value]) =>
                typeof value === 'string' &&
                value !== null &&
                !key.includes('other')
            )
            .map(([key, src]) => (
                <Box
                    key={key}
                    sx={{
                        aspectRatio: '1',
                        p: 1,
                        borderRadius: '8px',
                        bgcolor: 'background.surface',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        }
                    }}
                >
                    <img
                        src={src as string}
                        alt={`Pokemon ${key}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </Box>
            ))}
    </Box>
);

// ===== Type Badge with Animation =====
interface TypeBadgeProps {
    type: string;
    color: string;
}

export const AnimatedTypeBadge = ({ type, color }: TypeBadgeProps) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <Box
            sx={{
                px: 3,
                py: 1.5,
                borderRadius: '30px',
                bgcolor: color,
                color: 'white',
                textTransform: 'capitalize',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: `0 4px 20px ${color}66`,
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}
        >
            {type}
        </Box>
    </motion.div>
);