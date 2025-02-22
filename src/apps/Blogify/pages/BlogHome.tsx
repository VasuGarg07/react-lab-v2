import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    Chip,
    Grid,
    Stack,
    Typography
} from '@mui/joy';
import { ArrowRight } from 'lucide-react';
import { Link, useLoaderData } from 'react-router';
import BlogCard from '../components/BlogCard';
import { Blog } from '../helpers/blog.constants';

interface LoaderData {
    recentBlogs: Blog[];
}

const HomePage = () => {
    const { recentBlogs } = useLoaderData() as LoaderData;
    const [featuredBlog, ...otherBlogs] = recentBlogs;

    const formatDate = (dateString: string | number) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const truncateContent = (content: string, maxLength: number = 150) => {
        const cleanContent = content.replace(/<[^>]*>/g, '');
        if (cleanContent.length <= maxLength) return cleanContent;
        return cleanContent.substring(0, maxLength) + '...';
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Stack spacing={4}>
                {/* Featured Blog */}
                {featuredBlog && (
                    <Box>
                        <Typography level="h2" sx={{ mb: 3 }}>
                            Featured Post
                        </Typography>
                        <Box sx={{
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                                zIndex: 1,
                            }
                        }}>
                            <AspectRatio ratio="21/9">
                                <img
                                    src={featuredBlog.coverImageUrl}
                                    alt={featuredBlog.title}
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </AspectRatio>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: { xs: 2, md: 4 },
                                    color: 'white',
                                    zIndex: 2,
                                }}
                            >
                                <Stack spacing={2} sx={{ maxWidth: 'md' }}>
                                    {featuredBlog.tags.length > 0 && (
                                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                            {featuredBlog.tags.slice(0, 3).map((tag) => (
                                                <Chip
                                                    key={tag}
                                                    size="sm"
                                                    variant="soft"
                                                    sx={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        color: 'white'
                                                    }}
                                                >
                                                    {tag}
                                                </Chip>
                                            ))}
                                        </Stack>
                                    )}
                                    <Typography
                                        level="h2"
                                        sx={{
                                            color: 'white',
                                            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        {featuredBlog.title}
                                    </Typography>
                                    <Typography
                                        level="body-md"
                                        sx={{
                                            display: { xs: 'none', sm: 'block' },
                                            color: 'white',
                                            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        {truncateContent(featuredBlog.blogContent, 200)}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        sx={{ mt: 1 }}
                                    >
                                        <Avatar
                                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${featuredBlog.author}`}
                                            size="sm"
                                        />
                                        <Stack spacing={0.5}>
                                            <Typography
                                                level="body-sm"
                                                component={Link}
                                                to={`/blogify/list/${featuredBlog.author}`}
                                                sx={{
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                    '&:hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                {featuredBlog.author}
                                            </Typography>
                                            <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                                {formatDate(featuredBlog.createdAt)}
                                            </Typography>
                                        </Stack>
                                        <Button
                                            component={Link}
                                            to={`/blogify/blog/${featuredBlog.id}`}
                                            variant="solid"
                                            size="sm"
                                            endDecorator={<ArrowRight />}
                                            sx={{
                                                ml: 'auto',
                                                bgcolor: 'rgba(255,255,255,0.2)',
                                                color: 'white',
                                                '&:hover': {
                                                    bgcolor: 'rgba(255,255,255,0.3)'
                                                }
                                            }}
                                        >
                                            Read More
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                )}

                {/* Recent Posts */}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
                        <Typography level="h3">
                            Recent Posts
                        </Typography>
                        <Button
                            component={Link}
                            to="/blogify/list"
                            color='neutral'
                            endDecorator={<ArrowRight />}
                            size='sm'
                            variant='soft'
                        >
                            View All Posts
                        </Button>
                    </Box>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {otherBlogs.map((blog) => (
                            <Grid key={blog.id} xs={1}>
                                <BlogCard blog={blog} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Stack>
        </Box>
    );
};

export default HomePage;