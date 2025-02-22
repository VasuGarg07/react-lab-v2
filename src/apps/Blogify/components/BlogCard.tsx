import {
    AspectRatio,
    Avatar,
    Box,
    Card,
    CardContent,
    CardOverflow,
    Chip,
    Stack,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Dropdown,
    MenuButton,
    Divider,
} from '@mui/joy';
import { MoreVertical, Pencil, Archive } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Blog } from '@/apps/Blogify/helpers/blog.constants';
import { archiveBlog } from '@/apps/Blogify/helpers/blog.service';
import { useAuth } from '@/auth/AuthProvider';

interface BlogCardProps {
    blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const isOwner = user?.id === blog.userId;

    const formatDate = (dateString: string | number) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        navigate(`/blogify/edit/${blog.id}`);
    };

    const handleArchive = async () => {
        try {
            await archiveBlog(blog.id);
            // You might want to trigger a refresh of the blog list here
            // or show a success message
        } catch (error) {
            console.error('Error archiving blog:', error);
            // Handle error (show error message)
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                height: '100%',
                '--Card-radius': '8px',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 'md',
                }
            }}
        >
            {/* Cover Image */}
            <CardOverflow>
                <AspectRatio ratio="2">
                    <img
                        src={blog.coverImageUrl}
                        alt={blog.title}
                        loading="lazy"
                        style={{ objectFit: 'cover' }}
                    />
                </AspectRatio>
            </CardOverflow>

            <CardContent>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            size="sm"
                            variant="soft"
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author}`}
                        >
                            {blog.author.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography level="title-sm">
                                {blog.author}
                            </Typography>
                            <Typography level="body-xs">
                                {formatDate(blog.createdAt)}
                            </Typography>
                        </Box>
                    </Stack>

                    {isOwner && (
                        <Dropdown>
                            <MenuButton
                                slots={{ root: IconButton }}
                                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                            >
                                <MoreVertical size={16} />
                            </MenuButton>
                            <Menu
                                placement="bottom-end"
                                size="sm"
                                sx={{
                                    minWidth: 120,
                                    '--ListItemDecorator-size': '24px'
                                }}
                            >
                                <MenuItem onClick={handleEdit}>
                                    <Pencil size={14} />
                                    <Typography level="body-sm" sx={{ ml: 1 }}>Edit</Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={handleArchive}
                                    sx={{ color: 'warning.plainColor' }}
                                >
                                    <Archive size={14} />
                                    <Typography level="body-sm" sx={{ ml: 1 }}>
                                        {blog.isArchived ? 'Unarchive' : 'Archive'}
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    )}
                </Box>
                <Divider sx={{ mb: 1 }} />

                {/* Content */}
                <Box
                    component={Link}
                    to={`/blogify/blog/${blog.id}`}
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block'
                    }}
                >
                    <Typography
                        level="h4"
                        sx={{
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {blog.title}
                    </Typography>
                </Box>

                {/* Tags */}
                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mt: 'auto' }}
                >
                    {blog.tags.map((tag) => (
                        <Chip
                            key={tag}
                            size="sm"
                            variant="soft"
                            color="neutral"
                            sx={{ '--Chip-radius': '4px' }}
                        >
                            {tag}
                        </Chip>
                    ))}
                    {blog.isArchived && (
                        <Chip
                            size="sm"
                            variant="soft"
                            color="warning"
                            sx={{ '--Chip-radius': '4px' }}
                        >
                            Draft
                        </Chip>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default BlogCard;