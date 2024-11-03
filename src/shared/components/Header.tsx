
import { Box, Stack, Typography, useColorScheme } from "@mui/joy"
import ThemeToggle from "./ThemeToggle"
import AuthButton from "./AuthButton"
import { useRouter } from "next/navigation"
import NavMenu from "./NavMenu";

const Navbar = () => {
    const { mode } = useColorScheme();
    const router = useRouter();

    const redirectHome = () => router.push('/');

    return (
        <Stack direction='row' alignItems='center' spacing={1}
            sx={{
                boxShadow: 'sm',
                width: 1,
                py: 1, px: 2,
                background: (_) =>
                    mode === 'light'
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
                        : 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
            }}>
            <NavMenu />
            <Box flexGrow={1} />

            <Typography level="h4" sx={{ cursor: 'pointer' }} onClick={redirectHome}>
                React Lab
            </Typography>

            <Box flexGrow={1} />
            <ThemeToggle />
            <AuthButton />
        </Stack>
    )
}

export default Navbar