import { Box, Grid, Stack, Typography } from '@mui/joy';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { BlogListResponse } from '../helpers/blog.constants';
import BlogCard from './BlogCard';


interface BlogGalleryProps {
    blogListResponse: BlogListResponse;
    isLoading?: boolean;
    onPageChange: (page: number) => void;
    emptyMessage?: string;
}

const BlogGallery = ({
    blogListResponse,
    isLoading = false,
    onPageChange,
    emptyMessage = 'No blogs found',
}: BlogGalleryProps) => {
    const { data, pagination } = blogListResponse;

    // Empty state
    if (!isLoading && data.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px'
                }}
            >
                <Typography level="body-lg" color="neutral">
                    {emptyMessage}
                </Typography>
            </Box>
        );
    }

    return (
        <Stack spacing={3}>
            {/* Results Summary */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography level="body-sm">
                    Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} - {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} blogs
                </Typography>
            </Box>

            {/* Blog Grid */}
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 1, md: 2, xl: 3 }}
            >
                {data.map((blog) => (
                    <Grid key={blog.id} xs={1}>
                        <BlogCard blog={blog} />
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <ResponsivePagination
                    current={pagination.currentPage}
                    total={pagination.totalPages}
                    onPageChange={onPageChange}
                    maxWidth={300}
                />
            )}
        </Stack>
    );
};

export default BlogGallery;