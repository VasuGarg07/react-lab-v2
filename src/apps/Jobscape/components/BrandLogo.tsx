import Box from '@mui/joy/Box'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import React from 'react'
import { useNavigate } from 'react-router'

const BrandLogo: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/jobscape')}>
            <Box sx={{
                width: '40px',
                height: '40px',
                lineHeight: 0
            }}>
                <img src="/briefcase.png" alt="Jobscape Logo"
                    style={{ width: "100%" }} />
            </Box>
            <Typography
                level='h3'
                fontFamily='Inter'>
                JobScape
            </Typography>
        </Stack>
    )
}

export default BrandLogo