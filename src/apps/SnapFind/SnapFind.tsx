import { CircularProgress, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { ErrorMessage } from "../../components/ErrorMessage";
import ImageGallery from "./ImageGallery";
import SearchBar from "./SearchBar";
import { Image, unsplashImages } from "./helper";
import { Spacer } from "../../components/Spacer";

const SnapFind = () => {

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [value, setValue] = useState<string | null>(null);


  const handleSubmit = async (reset: boolean = false) => {
    if (!query) {
      setError('Please Input your query');
      return;
    }

    try {
      setLoading(true);
      setImages([]);
      reset && setPage(1);
      const data = await unsplashImages(query, page, value)

      setError('');
      setTotalPages(data.total_pages);
      setImages(data.results);

    } catch (error) {
      setError('Unable to load Images. Try again in a while');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) handleSubmit();
  }, [page])

  return (
    <>
      <Stack spacing={2} alignItems='center' sx={{ p: 2, width: 1, maxWidth: 1200, m: 'auto', minHeight: 'calc(100dvh - 54px)' }}>
        <Spacer />

        <Typography
          fontFamily={'Kanit'}
          letterSpacing={1.5}
          level="h1"
          children="SNAP FIND"
        />

        <SearchBar
          loading={loading}
          value={value}
          onSearchInput={setQuery}
          onSubmit={handleSubmit}
          onToggleChange={setValue}
        />

        {error && <ErrorMessage message={error} />}

        <Spacer />

        {images?.length > 0 && <ImageGallery images={images} />}

        {loading && <CircularProgress
          color="danger"
          size="lg"
          value={64}
          sx={{
            my: 2,
            "--CircularProgress-size": "120px",
            "--CircularProgress-trackThickness": "12px",
            "--CircularProgress-progressThickness": "12px"
          }} />}

        <Spacer />

        {images?.length > 0 && totalPages > 1 &&
          <ResponsivePagination
            maxWidth={400}
            current={page}
            total={totalPages}
            onPageChange={setPage}
          />
        }
      </Stack >
    </>
  )
}

export default SnapFind