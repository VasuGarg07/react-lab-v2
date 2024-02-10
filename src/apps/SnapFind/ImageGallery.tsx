import { Box } from '@mui/joy';
import { Image } from './helper'
import ImageCard from './ImageCard';

const ImageGallery = ({ images }: { images: Image[] }) => {

    const breakpoints = {
        xs: 1,
        sm: 2,
        md: 3
    };

    return (
        <Box
            sx={{
                // Define the responsive columns
                columnCount: { xs: breakpoints.xs, sm: breakpoints.sm, md: breakpoints.md },
                columnGap: '16px',
                '& > div': {
                    marginBottom: '16px',
                    breakInside: 'avoid',
                    width: '100%'
                }
            }}
        >
            {images.map(item => (
                <Box
                    key={item.id}
                    sx={{
                        display: 'inline-block',
                        width: '100%',
                        marginBottom: 16,
                        position: 'relative',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            transition: 'transform 0.2s linear',
                            '& .overlay': {
                                display: 'flex',
                                cursor: 'pointer',
                            }
                        }
                    }}
                >
                    <ImageCard image={item} />
                </Box>
            ))}
        </Box>

    )
}

export default ImageGallery;



