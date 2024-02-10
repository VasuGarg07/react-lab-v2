import { Button, CircularProgress, Input, Stack, Typography } from "@mui/joy"
import { useEffect, useState } from "react"
import { ErrorMessage, MatIcon, Spacer } from "../../components/Utils";
import { Image, unsplashImages } from "./helper";
import ImageGallery from "./ImageGallery";

const SnapFind = () => {

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // TODO: Add orientation selection option
  // TODO: Download functionality

  const handleSubmit = async (reset: boolean = false) => {
    if (!query) {
      setError('Please Input your query');
      return;
    }

    try {
      setLoading(true);
      const data = await unsplashImages(query, page)
      setError('');
      setTotalPages(data.total_pages);
      setImages(arr => reset ? data.results : [...arr, ...data.results]);
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

        <Stack direction='row' spacing={1} sx={{ width: 1, maxWidth: 800, }}>
          <Input
            placeholder="Search Images from unsplash"
            variant="outlined"
            color='neutral'
            endDecorator={<MatIcon icon="search" />}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ flexGrow: 1 }}
            disabled={loading}
          />
          <Button
            color='warning' variant='solid'
            onClick={() => { handleSubmit(true) }}
            loading={loading}
          >
            Search
          </Button>
        </Stack>

        {error && <ErrorMessage message={error} />}

        <Spacer />

        {images?.length > 0 && <ImageGallery images={images} />}

        {loading && <CircularProgress
          color="danger"
          size="lg"
          value={64}
          sx={{
            mt: 2,
            "--CircularProgress-size": "120px",
            "--CircularProgress-trackThickness": "12px",
            "--CircularProgress-progressThickness": "12px"
          }} />}

        <Spacer />

        {images?.length > 0 && page < totalPages &&
          <Button
            onClick={() => setPage(page + 1)}
            loading={loading}>
            Show More
          </Button>}
      </Stack >
    </>
  )
}

export default SnapFind