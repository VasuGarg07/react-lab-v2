import React from 'react';
import { Input, IconButton, Stack, Divider } from '@mui/joy';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, X, Github, Globe } from 'lucide-react';

export type SocialPlatform = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github' | 'website';

interface SocialLinkInputProps {
    platform: SocialPlatform;
    value: string;
    onChange: (value: string) => void;
}

const PLATFORM_CONFIG = {
    facebook: {
        icon: <Facebook size={20} />,
        label: 'Facebook'
    },
    twitter: {
        icon: <Twitter size={20} />,
        label: 'Twitter'
    },
    instagram: {
        icon: <Instagram size={20} />,
        label: 'Instagram'
    },
    linkedin: {
        icon: <Linkedin size={20} />,
        label: 'LinkedIn'
    },
    youtube: {
        icon: <Youtube size={20} />,
        label: 'Youtube'
    },
    github: {
        icon: <Github size={20} />,
        label: 'Github'
    },
    website: {
        icon: <Globe size={20} />,
        label: "Website"
    }
} as const;

const SocialLinkInput: React.FC<SocialLinkInputProps> = ({
    platform,
    value,
    onChange
}) => {
    const config = PLATFORM_CONFIG[platform];

    return (
        <Input
            placeholder="Profile link/url..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            startDecorator={
                <Stack direction="row" spacing={1} alignItems="center" minWidth="120px">
                    {config.icon}
                    <span className='spacer'>{config.label}</span>
                    <Divider orientation="vertical" />
                </Stack>
            }
            endDecorator={
                value ? (
                    <IconButton
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => onChange('')}
                    >
                        <X size={18} />
                    </IconButton>
                ) : null
            }
        />
    );
};

export default SocialLinkInput;