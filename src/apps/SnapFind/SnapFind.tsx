import ImageGallery from "@/apps/SnapFind/ImageGallery";
import SearchBar from "@/apps/SnapFind/SearchBar";
import { Image, unsplashImages } from "@/apps/SnapFind/helper";
import { toastService } from "@/providers/toastr";
import { Box, Card, CircularProgress, Stack, Typography, useTheme } from "@mui/joy";
import React, { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const SnapFind: React.FC = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [value, setValue] = useState<string | null>(null);

  const handleSubmit = async (reset: boolean = false) => {
    if (!query) {
      toastService.error('Please input your query');
      return;
    }

    try {
      setLoading(true);
      setImages([]);
      reset && setPage(1);
      const data = await unsplashImages(query, page, value);

      setTotalPages(data.total_pages);
      setImages(data.results);
    } catch (error) {
      toastService.error('Unable to load images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) handleSubmit();
  }, [page]);

  const patternColor = theme.palette.mode === 'light' ? '#000000' : '#ffffff';
  const baseColor = theme.palette.mode === 'light' ? '#ffffff' : '#121212';

  return (
    <Box
      sx={{
        minHeight: 'calc(100dvh - 54px)',
        background: `
          ${baseColor} url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${patternColor.replace('#', '%23')}' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        transition: 'background 0.3s ease-in-out',
      }}
    >
      <Stack
        spacing={3}
        alignItems='center'
        sx={{
          p: 3,
          width: '100%',
          maxWidth: '1200px',
          m: 'auto',
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '100%',
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(18, 18, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            p: 3,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            fontFamily={'Kanit'}
            letterSpacing={1.5}
            level="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              textAlign: 'center',
              color: theme.palette.mode === 'light' ? 'primary.600' : 'primary.300',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 2,
            }}
          >
            SNAP FIND
          </Typography>

          <SearchBar
            loading={loading}
            value={value}
            onSearchInput={setQuery}
            onSubmit={handleSubmit}
            onToggleChange={setValue}
          />

        </Card>

        <span className='spacer' />


        {images?.length > 0 && (
          <ImageGallery images={images} />
        )}

        {loading && (
          <CircularProgress
            color="primary"
            size="lg"
            sx={{
              my: 2,
              "--CircularProgress-size": "120px",
              "--CircularProgress-trackThickness": "12px",
              "--CircularProgress-progressThickness": "12px"
            }}
          />
        )}

        <span className='spacer' />


        {images?.length > 0 && totalPages > 1 && (
          <Card
            variant="outlined"
            sx={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(18, 18, 18, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              p: 2,
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <ResponsivePagination
              current={page}
              total={totalPages}
              onPageChange={setPage}
            />
          </Card>
        )}
      </Stack>
    </Box>
  );
};

export default SnapFind;