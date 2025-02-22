import React from 'react'
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { CirclePlus } from 'lucide-react';

const Settings: React.FC = () => {
    const { profileId, role, profileService } = useJobscape();

    const handleDeleteAccount = async () => {
        if (!profileId || !role) return;
        try {
            await profileService.deleteUserAccount(profileId, role);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Typography level='title-md' sx={{ mb: 2 }}>
                Delete Your Account
            </Typography>

            <Typography level='body-sm' textColor='neutral.500' sx={{ mb: 2 }}>
                If you delete your JobScape account, you will no longer be able to get information
                about the matched jobs, following employers, and job alert, shortlisted jobs and more.
                You will be abandoned from all the services of JobScape.</Typography>

            <Button
                variant='solid'
                color='danger'
                onClick={handleDeleteAccount}
                startDecorator={<CirclePlus
                    size={16}
                    style={{
                        transform: 'rotate(45deg)'
                    }}
                />}
            >
                Delete Account
            </Button>
        </>
    )
}

export default Settings