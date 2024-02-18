import { Avatar, Box, Chip, IconButton, Link, Stack } from '@mui/joy';
import { FC, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { MatIcon } from '../../components/Utils';
import { Image } from './helper';

interface ImageCardProps {
    image: Image
}

const ImageCard: FC<ImageCardProps> = ({ image }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const navigateToExternalUrl = (url: string) => {
        if (url) {
            window.open(`https://www.instagram.com/${url}`, '_blank');
        }
    };

    return (
        <>
            <div style={{ position: 'relative', borderRadius: '16px' }}>
                {!isLoaded && (
                    <Blurhash
                        hash={image.blur_hash}
                        width={400} // Set to your desired width
                        height={300} // Set to your desired height
                        style={{ position: 'absolute' }} />
                )}
                <img
                    src={image.urls.regular}
                    onLoad={() => setIsLoaded(true)}
                    style={{ width: '100%', height: '100%', borderRadius: '16px', display: isLoaded ? 'block' : 'none' }}
                    alt="" />
            </div>
            <Box
                className="overlay"
                sx={{
                    width: 1, height: 1,
                    position: 'absolute',
                    top: 0, left: 0,
                    bgcolor: `${image.color}a0`,
                    borderRadius: 16, p: 2,
                    display: 'none',
                }}
            >
                <Stack width={1} height={1} justifyContent='space-between'>
                    <Stack direction='row' justifyContent='space-between'>
                        <Avatar size="lg" src={image.user.profile_image.large} />
                        <Chip
                            variant="plain"
                            color="neutral"
                            size="sm"
                            sx={{
                                height: '24px',
                                "--Chip-radius": "8px",
                                "--Chip-gap": "0px",
                                "--Chip-paddingInline": "8px",
                            }}
                            // startDecorator={<Avatar src={image.user.instagram_username ? IGLogo : ''} />}
                            onClick={() => navigateToExternalUrl(image.user.instagram_username)}
                        >
                            {image.user.name}
                        </Chip>
                    </Stack>

                    <Stack direction='row' justifyContent='flex-end' spacing={1} zIndex={2}>
                        <IconButton variant='solid' size='sm' color='success'>
                            <Link overlay href={image.links.download} target="_blank" />
                            <MatIcon icon="open_in_new" size={20}></MatIcon>
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default ImageCard