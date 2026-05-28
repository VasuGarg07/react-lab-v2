import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { BLOG_CONSTANTS, type BlogRequest, type Notebook } from '../helpers/blog.constants';
import { TextInput, Select, LoadingButton } from '@react-lab/ui';
import RichTextEditor from './RichTextEditor';

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

    const addTag = () => {
        const trimmed = tagInput.trim();
        if (!trimmed || tags.length >= BLOG_CONSTANTS.MAX_TAGS || tags.includes(trimmed)) return;
        setValue('tags', [...tags, trimmed]);
        setTagInput('');
    };

    const removeTag = (tag: string) => setValue('tags', tags.filter(t => t !== tag));

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') { e.preventDefault(); addTag(); }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-7">
            {!isEditMode && (
                <Controller
                    name="notebookId"
                    control={control}
                    rules={{ required: 'Please select a notebook' }}
                    render={({ field }) => (
                        <Select
                            label="Notebook"
                            placeholder="Select a notebook"
                            options={notebooks.map(n => ({ label: n.title, value: n.id }))}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.notebookId?.message}
                            required
                        />
                    )}
                />
            )}

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

            <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-600 dark:text-stone-400">
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

            <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                    <label className="text-sm font-medium text-stone-600 dark:text-stone-400">
                        Tags
                    </label>
                    <span className="text-xs text-stone-400 dark:text-stone-500">
                        {tags.length}/{BLOG_CONSTANTS.MAX_TAGS}
                    </span>
                </div>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="hover:text-red-500 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="Add a tag..."
                        disabled={tags.length >= BLOG_CONSTANTS.MAX_TAGS}
                        className="flex-1 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-stone-400 dark:focus:border-stone-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    />
                    <button
                        type="button"
                        onClick={addTag}
                        disabled={tags.length >= BLOG_CONSTANTS.MAX_TAGS || !tagInput.trim()}
                        className="px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-xs text-stone-400 dark:text-stone-500">
                    Press Enter or + to add
                </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                    type="button"
                    onClick={handleDraftSubmit}
                    disabled={isLoading || !notebookId}
                    className="px-4 py-2.5 text-sm font-medium rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    Save draft
                </button>
                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading || !notebookId}
                >
                    {isEditMode ? 'Update' : 'Publish'}
                </LoadingButton>
            </div>
        </form>
    );
}