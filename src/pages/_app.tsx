import type { AppProps } from 'next/app';
import { Box, CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import '@/styles/globals.css';
import theme from '@/styles/theme';
import Header from '@/shared/components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 52px)' }}>
        <Component {...pageProps} />
      </Box>
    </CssVarsProvider>
  );
}