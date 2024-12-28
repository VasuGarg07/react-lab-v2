import {
    AspectRatio,
    Avatar,
    Box,
    Breadcrumbs,
    Chip,
    Divider,
    Grid,
    Link as JoyLink,
    Stack,
    Typography
} from '@mui/joy';
import { ChevronRight } from 'lucide-react';
import { Link, useLoaderData } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { Blog } from '../helpers/blog.constants';
import StyledBlogContent from '../components/StyledBlogContent';

interface LoaderData {
    blog: Blog;
    relatedBlogs: Blog[];
}

const BlogDetail = () => {
    const { blog, relatedBlogs } = useLoaderData() as LoaderData;

    const formatDate = (dateString: string | number) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {/* Breadcrumbs */}
            <Breadcrumbs
                separator={<ChevronRight size={16} />}
                sx={{ mb: 2 }}
            >
                <JoyLink
                    component={Link}
                    to="/blogify/list"
                    color="neutral"
                    fontSize="sm"
                >
                    Blogs
                </JoyLink>
                <Typography fontSize="sm" textColor="text.tertiary">
                    {blog.title}
                </Typography>
            </Breadcrumbs>

            {/* Cover Image */}
            <AspectRatio ratio="2">
                <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    style={{ objectFit: 'cover' }}
                />
            </AspectRatio>

            <Box sx={{ p: { xs: 2, md: 4 } }}>
                {/* Title and Tags */}
                <Stack spacing={2}>
                    <Typography level="h2">
                        {blog.title}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                    >
                        {blog.tags.map((tag) => (
                            <Chip
                                key={tag}
                                size="sm"
                                variant="soft"
                                color="neutral"
                            >
                                {tag}
                            </Chip>
                        ))}
                    </Stack>

                    {/* Author Info */}
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        <Avatar
                            size="lg"
                            variant="soft"
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author}`}
                        >
                            {blog.author.charAt(0)}
                        </Avatar>
                        <Box>
                            <JoyLink
                                component={Link}
                                to={`/blogify/list/${blog.author}`}
                                level="title-md"
                                sx={{
                                    color: 'text.primary',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                {blog.author}
                            </JoyLink>
                            <Typography level="body-sm">
                                {formatDate(blog.createdAt)}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>

                <Divider sx={{ my: 4 }} />

                {/* Blog Content */}
                <StyledBlogContent htmlContent={blog.blogContent} />
            </Box>

            <Divider />
            {relatedBlogs.length > 0 && (
                <>
                    <Typography
                        level="h4"
                        sx={{ my: 2 }}
                    >
                        Related Blogs
                    </Typography>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 1, md: 2, xl: 3 }}>
                        {relatedBlogs.map((relatedBlog) => (
                            <Grid key={relatedBlog.id} xs={1}>
                                <BlogCard
                                    blog={relatedBlog}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default BlogDetail;