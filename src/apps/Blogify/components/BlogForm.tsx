import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { BLOG_CONSTANTS, type BlogRequest, type Notebook } from '../helpers/blog.constants';
import TextInput from '../../../ui/TextInput';
import Select from '../../../ui/Select';
import LoadingButton from '../../../ui/LoadingButton';
import RichTextEditor from '../../../components/RichTextEditor';

interface BlogFormProps {
    notebooks: Notebook[];
    defaultValues?: Partial<BlogRequest & { notebookId: string }>;
    isEditMode?: boolean;
    isLoading?: boolean;
    onSubmit: (data: BlogRequest, notebookId: string) => void;
    onSaveDraft: (data: BlogRequest, notebookId: string) => void;
}

export default function BlogForm({
    notebooks,
    defaultValues,
    isEditMode = false,
    isLoading = false,
    onSubmit,
    onSaveDraft,
}: BlogFormProps) {
    const [tagInput, setTagInput] = useState('');

    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<BlogRequest & { notebookId: string }>({
        defaultValues: {
            notebookId: defaultValues?.notebookId ?? '',
            author: defaultValues?.author ?? '',
            title: defaultValues?.title ?? '',
            blogContent: defaultValues?.blogContent ?? '',
            tags: defaultValues?.tags ?? [],
            isArchived: defaultValues?.isArchived ?? false,
        },
    });

    const tags = watch('tags') ?? [];
    const notebookId = watch('notebookId');

    const handleFormSubmit = (data: BlogRequest & { notebookId: string }) => {
        const { notebookId, ...blogData } = data;
        onSubmit(blogData, notebookId);
    };

    const handleDraftSubmit = () => {
        const data = watch();
        const { notebookId, ...blogData } = data;
        onSaveDraft({ ...blogData, isArchived: true }, notebookId);
    };

    // Tag management
    const addTag = () => {
        const trimmed = tagInput.trim();
        if (!trimmed) return;
        if (tags.length >= BLOG_CONSTANTS.MAX_TAGS) return;
        if (tags.includes(trimmed)) return;

        setValue('tags', [...tags, trimmed]);
        setTagInput('');
    };

    const removeTag = (tag: string) => {
        setValue('tags', tags.filter(t => t !== tag));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const notebookOptions = notebooks.map(n => ({ label: n.title, value: n.id }));

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Notebook Selection */}
            {!isEditMode && (
                <Controller
                    name="notebookId"
                    control={control}
                    rules={{ required: 'Please select a notebook' }}
                    render={({ field }) => (
                        <Select
                            label="Notebook"
                            placeholder="Select a notebook"
                            options={notebookOptions}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.notebookId?.message}
                            required
                        />
                    )}
                />
            )}

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
                        label="Title"
                        placeholder="Enter an engaging title..."
                        error={errors.title?.message}
                    />
                )}
            />

            {/* Author */}
            <Controller
                name="author"
                control={control}
                rules={{ required: 'Author is required' }}
                render={({ field }) => (
                    <TextInput
                        {...field}
                        label="Author"
                        placeholder="Your pen name"
                        error={errors.author?.message}
                    />
                )}
            />

            {/* Content */}
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
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
                            disabled={isLoading}
                        />
                    )}
                />
                {errors.blogContent && (
                    <p className="text-xs text-red-500">{errors.blogContent.message}</p>
                )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Tags
                    {tags.length > 0 && (
                        <span className="text-neutral-500 dark:text-neutral-400 font-normal ml-1">
                            ({tags.length}/{BLOG_CONSTANTS.MAX_TAGS})
                        </span>
                    )}
                </label>

                {/* Tag List */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="hover:text-red-500 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
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
                        onKeyDown={handleTagKeyDown}
                        placeholder="Add a tag..."
                        disabled={tags.length >= BLOG_CONSTANTS.MAX_TAGS}
                        className="flex-1 px-3 py-2.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                    <button
                        type="button"
                        onClick={addTag}
                        disabled={tags.length >= BLOG_CONSTANTS.MAX_TAGS || !tagInput.trim()}
                        className="px-3 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Press Enter or click + to add (max {BLOG_CONSTANTS.MAX_TAGS})
                </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <button
                    type="button"
                    onClick={handleDraftSubmit}
                    disabled={isLoading || !notebookId}
                    className="px-4 py-2.5 text-sm font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Save as Draft
                </button>
                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading || !notebookId}
                >
                    {isEditMode ? 'Update Blog' : 'Publish Blog'}
                </LoadingButton>
            </div>
        </form>
    );
}