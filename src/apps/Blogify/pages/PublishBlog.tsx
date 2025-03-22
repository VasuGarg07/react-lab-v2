import { useState } from 'react';
import { Archive, Plus, Save, X } from 'lucide-react';
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
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="p-2 md:p-4">
            <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div className="p-4 md:p-6">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {blogId ? 'Edit Blog' : 'Create New Blog'}
                    </h1>

                    <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-4"></div>

                    <Form method="post">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Blog Title
                                </label>
                                <input
                                    name="title"
                                    placeholder="Enter blog title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        title: e.target.value
                                    }))}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Author's Pen Name
                                </label>
                                <input
                                    name="author"
                                    placeholder="Enter Author's pen name..."
                                    value={formData.author}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        author: e.target.value
                                    }))}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Cover Image
                                </label>
                                <input
                                    type="hidden"
                                    name="coverImageUrl"
                                    value={formData.coverImageUrl}
                                />
                                <UploadImage
                                    onUpload={handleImageUpload}
                                    existingUrl={blogId ? formData.coverImageUrl : undefined}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Content
                                </label>
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Tags
                                </label>
                                <input
                                    type="hidden"
                                    name="tags"
                                    value={JSON.stringify(formData.tags)}
                                />
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {formData.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleTagDelete(tag)}
                                                className="ml-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                                        <Plus size={16} />
                                    </span>
                                    <input
                                        placeholder="Add tags (press Enter)"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagAdd}
                                        disabled={formData.tags.length >= 5}
                                        className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-zinc-700 text-gray-900 dark:text-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => handleSave(true)}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? (
                                        <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin mr-2"></span>
                                    ) : (
                                        <Archive size={16} className="mr-2" />
                                    )}
                                    Save as Draft
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSave(false)}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? (
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                                    ) : (
                                        <Save size={16} className="mr-2" />
                                    )}
                                    Publish
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default PublishBlog;