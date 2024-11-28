import { Button, ButtonProps } from '@mui/joy';
import React from 'react';

interface GradientButtonProps extends ButtonProps {
    gradient?: {
        from: string;
        to: string;
    };
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
    ({
        children,
        gradient = {
            from: '#7028e4',
            to: '#e5b2ca'
        },
        ...props
    }, ref) => {
        const shadowColor = `${gradient.from}66`;

        return (
            <Button
                ref={ref}
                size="lg"
                {...props}
                sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: 'lg',
                    fontWeight: 600,
                    borderRadius: 'xl',
                    background: `linear-gradient(to left, ${gradient.from} 0%, ${gradient.to} 100%)`,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    border: 'none',
                    boxShadow: `0 10px 20px ${shadowColor}`,
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden',
                    isolation: 'isolate', // Creates a new stacking context

                    // Top shine
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '40%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                        zIndex: 1,
                    },

                    // Diagonal shine
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-50%',
                        width: '25%',
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                        transform: 'skewX(-25deg)',
                        zIndex: 1,
                    },

                    '@keyframes shine': {
                        '0%': {
                            left: '-50%',
                        },
                        '100%': {
                            left: '150%',
                        }
                    },

                    '& > span': {
                        position: 'relative',
                        zIndex: 2,
                    },

                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 15px 30px ${shadowColor}`,
                        background: `linear-gradient(to right, ${gradient.from} 0%, ${gradient.to} 100%)`,

                        '&::after': {
                            animation: 'shine 1.5s infinite',
                        }
                    },

                    '&:active': {
                        transform: 'scale(0.98)',
                    },

                    ...props.sx
                }}
            >
                {children}
            </Button>
        );
    }
);

GradientButton.displayName = 'GradientButton';

export default GradientButton;