import { Archive, Plus, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useAppSelector } from '../../../store/useRedux';
import { type BlogRequest, BLOG_CONSTANTS } from '../helpers/blog.constants';
import { usePublishBlog, useUpdateBlog } from '../hooks/useBlogMutations';
import { useBlogDetail } from '../hooks/useBlogQuery';
import TextInput from '../../../ui/TextInput';
import ImageUploader from '../../../components/ImageUploader';
import RichTextEditor from '../../../components/RichTextEditor';
import LoadingButton from '../../../ui/LoadingButton';

type BlogFormData = BlogRequest;

const PublishBlog = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const user = useAppSelector(state => state.auth.user);
    const isEditMode = !!blogId;

    // Query existing blog if editing
    const { data: existingBlog, isLoading: loadingBlog } = useBlogDetail(blogId!);

    // Mutations
    const publishMutation = usePublishBlog();
    const updateMutation = useUpdateBlog(blogId!);

    // Form state
    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<BlogFormData>({
        defaultValues: {
            author: user?.username || '',
            title: '',
            coverImageUrl: '',
            blogContent: '',
            tags: [],
            isArchived: false,
        },
    });

    const [tagInput, setTagInput] = useState('');
    const tags = watch('tags');

    // Load existing blog data in edit mode
    useEffect(() => {
        if (existingBlog) {
            setValue('author', existingBlog.author);
            setValue('title', existingBlog.title);
            setValue('coverImageUrl', existingBlog.coverImageUrl);
            setValue('blogContent', existingBlog.blogContent);
            setValue('tags', existingBlog.tags);
            setValue('isArchived', existingBlog.isArchived);
        }
    }, [existingBlog, setValue]);

    // Handle form submission
    const onSubmit = async (data: BlogFormData, saveAsDraft: boolean = false) => {
        const blogData = { ...data, isArchived: saveAsDraft };

        if (isEditMode) {
            await updateMutation.mutateAsync(blogData);
        } else {
            await publishMutation.mutateAsync(blogData);
        }
    };

    // Tag management
    const handleAddTag = () => {
        const trimmedTag = tagInput.trim();
        if (!trimmedTag) return;

        if (tags.length >= BLOG_CONSTANTS.MAX_TAGS) {
            alert(`Maximum ${BLOG_CONSTANTS.MAX_TAGS} tags allowed`);
            return;
        }

        if (tags.includes(trimmedTag)) {
            alert('Tag already exists');
            return;
        }

        setValue('tags', [...tags, trimmedTag]);
        setTagInput('');
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setValue('tags', tags.filter(tag => tag !== tagToRemove));
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    // Loading state
    if (loadingBlog) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const isSaving = publishMutation.isPending || updateMutation.isPending;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {isEditMode ? 'Edit Blog' : 'Create New Blog'}
                    </h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {isEditMode ? 'Update your blog post' : 'Share your story with the world'}
                    </p>
                </div>

                <form onSubmit={handleSubmit((data) => onSubmit(data, false))} className="space-y-6">
                    {/* Title */}
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: 'Title is required',
                            minLength: { value: BLOG_CONSTANTS.MIN_TITLE_LENGTH, message: `Minimum ${BLOG_CONSTANTS.MIN_TITLE_LENGTH} characters` },
                            maxLength: { value: BLOG_CONSTANTS.MAX_TITLE_LENGTH, message: `Maximum ${BLOG_CONSTANTS.MAX_TITLE_LENGTH} characters` },
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                label="Blog Title"
                                placeholder="Enter an engaging title..."
                                error={errors.title?.message}
                            />
                        )}
                    />

                    {/* Author Name */}
                    <Controller
                        name="author"
                        control={control}
                        rules={{ required: 'Author name is required' }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                label="Author's Pen Name"
                                placeholder="Your pen name"
                                error={errors.author?.message}
                            />
                        )}
                    />

                    {/* Cover Image */}
                    <div>
                        <Controller
                            name="coverImageUrl"
                            control={control}
                            rules={{ required: 'Cover image is required' }}
                            render={({ field }) => (
                                <ImageUploader
                                    onUpload={field.onChange}
                                    existingUrl={field.value}
                                    aspectRatio="video"
                                    label="Cover Image"
                                    helperText="Recommended: 1920x1080px, max 5MB"
                                />
                            )}
                        />
                        {errors.coverImageUrl && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                                {errors.coverImageUrl.message}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Content
                        </label>
                        <Controller
                            name="blogContent"
                            control={control}
                            rules={{
                                required: 'Content is required',
                                minLength: { value: BLOG_CONSTANTS.MIN_CONTENT_LENGTH, message: `Minimum ${BLOG_CONSTANTS.MIN_CONTENT_LENGTH} characters` },
                            }}
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={isSaving}
                                />
                            )}
                        />
                        {errors.blogContent && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                                {errors.blogContent.message}
                            </p>
                        )}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Tags {tags.length > 0 && <span className="text-neutral-500 dark:text-neutral-400">({tags.length}/{BLOG_CONSTANTS.MAX_TAGS})</span>}
                        </label>

                        {/* Tag List */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Tag Input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInputKeyDown}
                                placeholder="Add a tag..."
                                disabled={tags.length >= BLOG_CONSTANTS.MAX_TAGS}
                                className="flex-1 px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                disabled={tags.length >= BLOG_CONSTANTS.MAX_TAGS || !tagInput.trim()}
                                className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                            Press Enter or click + to add tags (max {BLOG_CONSTANTS.MAX_TAGS})
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <button
                            type="button"
                            onClick={() => handleSubmit((data) => onSubmit(data, true))()}
                            disabled={isSaving}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Archive className="w-4 h-4" />
                            Save as Draft
                        </button>

                        <LoadingButton
                            type="submit"
                            isLoading={isSaving}
                            loadingText="Publishing..."
                            disabled={isSaving}
                        >
                            <Save className="w-4 h-4" />
                            {isEditMode ? 'Update Blog' : 'Publish Blog'}
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PublishBlog;