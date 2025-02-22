import {
    Box,
    Button,
    Card,
    Chip,
    ChipDelete,
    CircularProgress,
    Divider,
    Input,
    Stack,
    Typography
} from '@mui/joy';
import { Archive, Plus, Save } from 'lucide-react';
import { useState } from 'react';
import {
    Form,
    useLoaderData,
    useNavigation,
    useParams,
    useSubmit
} from 'react-router';
import { useAuth } from '@/auth/AuthProvider';
import RichTextEditor from '@/components/RichTextEditor';
import { Blog, BlogRequest } from '@/apps/Blogify/helpers/blog.constants';
import UploadImage from '@/apps/Blogify/components/ImageUploader';

interface LoaderData {
    blog: Blog | null;
}

const PublishBlog = () => {
    const { blogId } = useParams();
    const submit = useSubmit();
    const navigation = useNavigation();
    const { blog } = useLoaderData() as LoaderData;
    const { user } = useAuth();

    const isSubmitting = navigation.state === 'submitting';

    const [formData, setFormData] = useState<BlogRequest>({
        author: blog?.author || user!.username,
        title: blog?.title || '',
        coverImageUrl: blog?.coverImageUrl || '',
        blogContent: blog?.blogContent || '',
        tags: blog?.tags || [],
        isArchived: blog?.isArchived || false
    });

    const [tagInput, setTagInput] = useState('');

    const handleImageUpload = (url: string) => {
        setFormData(prev => ({ ...prev, coverImageUrl: url }));
    };

    const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };

    const handleTagDelete = (tagToDelete: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToDelete)
        }));
    };

    const handleSave = (archive: boolean = false) => {
        const dataToSubmit = {
            ...formData,
            isArchived: archive,
            tags: JSON.stringify(formData.tags) // FormData can't handle arrays directly
        };

        submit(dataToSubmit, {
            method: 'post',
            action: blogId ? `/blogify/edit/${blogId}` : '/blogify/publish'
        });
    };

    if (navigation.state === 'loading') {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '50vh'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Card variant="outlined">
                <Typography level="h4" component="h1">
                    {blogId ? 'Edit Blog' : 'Create New Blog'}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Form method="post">
                    <Stack spacing={2}>
                        <Box>
                            <Typography level="title-sm" sx={{ mb: 1.5 }}>
                                Blog Title
                            </Typography>
                            <Input
                                name="title"
                                placeholder="Enter blog title..."
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    title: e.target.value
                                }))}
                                required
                            />
                        </Box>

                        <Box>
                            <Typography level="title-sm" sx={{ mb: 1.5 }}>
                                Author's Pen Name
                            </Typography>
                            <Input
                                name="author"
                                placeholder="Enter Author's pen name..."
                                value={formData.author}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    author: e.target.value
                                }))}
                                required
                            />
                        </Box>

                        <Box>
                            <Typography level="title-sm" sx={{ mb: 1.5 }}>
                                Cover Image
                            </Typography>
                            <input
                                type="hidden"
                                name="coverImageUrl"
                                value={formData.coverImageUrl}
                            />
                            <UploadImage
                                onUpload={handleImageUpload}
                                existingUrl={blogId ? formData.coverImageUrl : undefined}
                            />
                        </Box>

                        <Box>
                            <Typography level="title-sm" sx={{ mb: 1.5 }}>
                                Content
                            </Typography>
                            <input
                                type="hidden"
                                name="blogContent"
                                value={formData.blogContent}
                            />
                            <RichTextEditor
                                value={formData.blogContent}
                                onChange={(content) => setFormData(prev => ({
                                    ...prev,
                                    blogContent: content
                                }))}
                            />
                        </Box>

                        <Box>
                            <Typography level="title-sm" sx={{ mb: 1.5 }}>
                                Tags
                            </Typography>
                            <input
                                type="hidden"
                                name="tags"
                                value={JSON.stringify(formData.tags)}
                            />
                            <Stack direction="row" spacing={1} mb={1} flexWrap="wrap" useFlexGap>
                                {formData.tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        size="sm"
                                        variant="soft"
                                        endDecorator={
                                            <ChipDelete onDelete={() => handleTagDelete(tag)} />
                                        }
                                    >
                                        {tag}
                                    </Chip>
                                ))}
                            </Stack>
                            <Input
                                size="sm"
                                placeholder="Add tags (press Enter)"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagAdd}
                                disabled={formData.tags.length >= 5}
                                startDecorator={<Plus size={16} />}
                            />
                        </Box>

                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-end"
                        >
                            <Button
                                variant="soft"
                                color="neutral"
                                startDecorator={<Archive size={16} />}
                                loading={isSubmitting}
                                onClick={() => handleSave(true)}
                                type="button"
                            >
                                Save as Draft
                            </Button>
                            <Button
                                variant="solid"
                                color="primary"
                                startDecorator={<Save size={16} />}
                                loading={isSubmitting}
                                onClick={() => handleSave(false)}
                                type="button"
                            >
                                Publish
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            </Card>
        </Box>
    );
};

export default PublishBlog;