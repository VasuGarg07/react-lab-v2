import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import React from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import Sheet from '@mui/joy/Sheet'
import BrandLogo from '@/apps/Jobscape/components/BrandLogo'

const FormHeader: React.FC<{ title: string }> = ({ title }) => {
    return (
        <Stack
            component={Sheet}
            sx={{
                px: 8,
                py: 1.5,
                flexDirection: 'row',
                gap: 1,
                alignItems: 'center',
                boxShadow: 'sm',
                justifyContent: 'space-between'
            }}
        >
            <BrandLogo />
            <Typography level="h4">
                {title}
            </Typography>
            <ThemeToggle />
        </Stack>
    )
}

export default FormHeader