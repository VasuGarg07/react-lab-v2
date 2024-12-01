import { Box, IconButton, Sheet, Typography } from '@mui/joy';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { TYPE_COLORS } from '../helpers/constant';

interface EntriesSectionProps {
    flavorTexts: string[];
    primaryType: string;
}

const EntriesSection = ({ flavorTexts, primaryType }: EntriesSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const accentColor = TYPE_COLORS[primaryType];

    const nextEntry = () => {
        setCurrentIndex((prev) =>
            prev === flavorTexts.length - 1 ? 0 : prev + 1
        );
    };

    const prevEntry = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? flavorTexts.length - 1 : prev - 1
        );
    };

    return (
        <Box>

            {/* Carousel */}
            <Box sx={{ position: 'relative' }}>
                <Sheet
                    variant="plain"
                    sx={{
                        p: 3,
                        borderRadius: 'xl',
                        minHeight: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        borderLeft: '4px solid',
                        borderColor: accentColor,
                        boxShadow: 'sm',
                        my: 1,
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            style={{ width: 'calc(100% - 64px)', margin: 'auto' }}
                        >
                            <Typography
                                level="body-lg"
                                sx={{
                                    textAlign: 'center',
                                    fontStyle: 'italic',
                                    lineHeight: 1.6
                                }}
                            >
                                {flavorTexts[currentIndex]}
                            </Typography>
                        </motion.div>
                    </AnimatePresence>
                </Sheet>

                {/* Navigation Buttons */}
                <Box sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 2,
                    pointerEvents: 'none'
                }}>
                    <IconButton
                        variant="soft"
                        onClick={prevEntry}
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{
                            pointerEvents: 'auto',
                            bgcolor: 'background.surface',
                            '&:hover': { bgcolor: 'background.level1' }
                        }}
                    >
                        <ChevronLeft />
                    </IconButton>
                    <IconButton
                        variant="soft"
                        onClick={nextEntry}
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{
                            pointerEvents: 'auto',
                            bgcolor: 'background.surface',
                            '&:hover': { bgcolor: 'background.level1' }
                        }}
                    >
                        <ChevronRight />
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                mb: 3
            }}>
                <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    {currentIndex + 1} of {flavorTexts.length}
                </Typography>
            </Box>

            {/* Progress Dots */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                mt: 3
            }}>
                {flavorTexts.map((_, index) => (
                    <Box
                        key={index}
                        component={motion.div}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setCurrentIndex(index)}
                        sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            bgcolor: index === currentIndex ? accentColor : 'background.level2',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default EntriesSection;