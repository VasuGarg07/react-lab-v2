import { Box, CircularProgress, Stack, Typography, Avatar, Card } from '@mui/joy';
import { useLoaderData, useSearchParams, useNavigation } from 'react-router';
import BlogGallery from '@/apps/Blogify/components/BlogGallery';
import { BlogListResponse } from '@/apps/Blogify/helpers/blog.constants';
import { useAuth } from '@/auth/AuthProvider';

const MyBlogs = () => {
    const response = useLoaderData() as BlogListResponse;
    const [_, setPage] = useSearchParams();
    const navigation = useNavigation();
    const { user } = useAuth();

    const handlePageChange = (page: number) => {
        setPage(prev => {
            prev.set('page', page.toString());
            return prev;
        });
    };

    const publishedCount = response.data.filter(blog => !blog.isArchived).length;
    const draftCount = response.data.filter(blog => blog.isArchived).length;

    if (navigation.state === 'loading') {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Stack spacing={3} sx={{ p: { xs: 2, md: 4 } }}>
            {/* Author Header */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: 2
                }}
            >
                <Avatar
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}`}
                    size="lg"
                >
                    {user?.username.charAt(0)}
                </Avatar>
                <Box>
                    <Typography level="h2" component="h1">
                        Your Stories
                    </Typography>
                    <Typography level="body-md" color="neutral">
                        Welcome back, {user?.username}
                    </Typography>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 2
                }}
            >
                <Card variant="soft" sx={{ textAlign: 'center', p: 2 }}>
                    <Typography level="h3">
                        {response.pagination.totalItems}
                    </Typography>
                    <Typography level="body-sm">
                        Total Stories
                    </Typography>
                </Card>

                <Card variant="soft" sx={{ textAlign: 'center', p: 2 }}>
                    <Typography level="h3">
                        {publishedCount}
                    </Typography>
                    <Typography level="body-sm">
                        Published
                    </Typography>
                </Card>

                <Card variant="soft" sx={{ textAlign: 'center', p: 2 }}>
                    <Typography level="h3">
                        {draftCount}
                    </Typography>
                    <Typography level="body-sm">
                        Drafts
                    </Typography>
                </Card>

                <Card variant="soft" sx={{ textAlign: 'center', p: 2 }}>
                    <Typography level="h3">
                        {response.data.reduce((acc, blog) => acc + blog.tags.length, 0)}
                    </Typography>
                    <Typography level="body-sm">
                        Total Tags
                    </Typography>
                </Card>
            </Box>

            {/* Blog Gallery */}
            <BlogGallery
                blogListResponse={response}
                onPageChange={handlePageChange}
                emptyMessage="Start writing your first blog!"
            />
        </Stack>
    );
};

export default MyBlogs;