import Container from '@mui/joy/Container'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import React from 'react'

const FormFooter: React.FC = () => {
    return (
        <Sheet component="footer" sx={{
            p: 2,
            borderTop: '1px solid #DADADA',
        }}>
            <Container maxWidth="lg">
                <Typography
                    level="body-sm"
                    sx={{
                        color: '#777',
                        textAlign: 'center',
                    }}
                >
                    © {new Date().getFullYear()} JobScape - Job Portal. All rights Reserved
                </Typography>
            </Container>
        </Sheet>
    )
}

export default FormFooter