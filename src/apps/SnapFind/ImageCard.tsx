import { Blurhash } from 'react-blurhash';
import { Image } from './helper';
import { useState } from 'react';
import { Avatar, Box, Chip, Stack } from '@mui/joy';
import IGLogo from '../../assets/insta-icon.png';


const ImageCard = ({ image }: { image: Image }) => {
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
                    bgcolor: `${image.color}80`,
                    borderRadius: 16, p: 2,
                    display: 'none',
                }}
            >
                <Stack width={1} height={1}>
                    <Stack direction='row' justifyContent='space-between'>
                        <Avatar size="lg" src={image.user.profile_image.large} />
                        <Chip
                            variant="plain"
                            color="neutral"
                            size="lg"
                            sx={{
                                height: '32px',
                                "--Chip-radius": "8px",
                                "--Chip-gap": "0px",
                                "--Chip-paddingInline": "4px",
                                "--Chip-decoratorChildHeight": "24px"
                            }}
                            startDecorator={<Avatar src={image.user.instagram_username ? IGLogo : ''} />}
                            onClick={() => navigateToExternalUrl(image.user.instagram_username)}
                        >
                            {image.user.instagram_username ? `@${image.user.instagram_username}` : image.user.name}
                        </Chip>
                    </Stack>

                </Stack>
            </Box>
        </>
    )
}

export default ImageCard