import { useParams, Link } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { useAppSelector } from '../../../store/useRedux';
import { BLOGIFY_ROUTES, BLOG_CONSTANTS, type NotebookRequest } from '../helpers/blog.constants';
import { isValidImageUrl } from '../helpers/blog.utils';
import { useNotebook } from '../hooks/useBlogQuery';
import { useCreateNotebook, useUpdateNotebook } from '../hooks/useBlogMutations';
import TextInput from '../../../ui/TextInput';
import Textarea from '../../../ui/Textarea';
import Switch from '../../../ui/Switch';
import LoadingButton from '../../../ui/LoadingButton';

export default function NotebookForm() {
    const { notebookId } = useParams<{ notebookId: string }>();
    const user = useAppSelector(state => state.auth.user);

    const isEditMode = !!notebookId;

    // Fetch existing notebook if edit mode
    const { data: existingNotebook, isLoading: notebookLoading } = useNotebook(notebookId!);

    // Mutations
    const createMutation = useCreateNotebook();
    const updateMutation = useUpdateNotebook();

    const isLoading = isEditMode && notebookLoading;
    const isSaving = createMutation.isPending || updateMutation.isPending;

    const { control, handleSubmit, watch, formState: { errors } } = useForm<NotebookRequest>({
        defaultValues: {
            author: existingNotebook?.author ?? user?.username ?? '',
            title: existingNotebook?.title ?? '',
            description: existingNotebook?.description ?? '',
            coverImageUrl: existingNotebook?.coverImageUrl ?? '',
            isPublic: existingNotebook?.isPublic ?? true,
        },
        values: isEditMode && existingNotebook ? {
            author: existingNotebook.author,
            title: existingNotebook.title,
            description: existingNotebook.description ?? '',
            coverImageUrl: existingNotebook.coverImageUrl,
            isPublic: existingNotebook.isPublic,
        } : undefined,
    });

    const coverImageUrl = watch('coverImageUrl');

    const onSubmit = (data: NotebookRequest) => {
        if (isEditMode && notebookId) {
            updateMutation.mutate({ id: notebookId, data });
        } else {
            createMutation.mutate(data);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <header>
                <Link
                    to={BLOGIFY_ROUTES.LIBRARY}
                    className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-4"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Library
                </Link>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    {isEditMode ? 'Edit Notebook' : 'Create Notebook'}
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                    {isEditMode ? 'Update your notebook details' : 'Create a new collection for your blogs'}
                </p>
            </header>

            {/* Form Card */}
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Cover Image Preview */}
                    {coverImageUrl && isValidImageUrl(coverImageUrl) && (
                        <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                            <img
                                src={coverImageUrl}
                                alt="Cover preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Cover Image URL */}
                    <Controller
                        name="coverImageUrl"
                        control={control}
                        rules={{
                            required: 'Cover image is required',
                            validate: (value) => isValidImageUrl(value) || 'Must be a valid image URL (.jpg, .png, .webp, .gif)',
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                label="Cover Image URL"
                                placeholder="https://example.com/image.jpg"
                                error={errors.coverImageUrl?.message}
                            />
                        )}
                    />

                    {/* Title */}
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: 'Title is required',
                            minLength: { value: 3, message: 'Minimum 3 characters' },
                            maxLength: { value: 100, message: 'Maximum 100 characters' },
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                label="Title"
                                placeholder="My Awesome Notebook"
                                error={errors.title?.message}
                            />
                        )}
                    />

                    {/* Author */}
                    <Controller
                        name="author"
                        control={control}
                        rules={{
                            required: 'Author is required',
                            minLength: { value: 3, message: 'Minimum 3 characters' },
                            maxLength: { value: 100, message: 'Maximum 100 characters' },
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                label="Author"
                                placeholder="Your pen name"
                                error={errors.author?.message}
                            />
                        )}
                    />

                    {/* Description */}
                    <Controller
                        name="description"
                        control={control}
                        rules={{
                            maxLength: { value: BLOG_CONSTANTS.MAX_DESCRIPTION_LENGTH, message: `Maximum ${BLOG_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters` },
                        }}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                label="Description"
                                placeholder="What's this notebook about? (optional)"
                                rows={3}
                                error={errors.description?.message}
                            />
                        )}
                    />

                    {/* Public Toggle */}
                    <Controller
                        name="isPublic"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                        Public Notebook
                                    </p>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        Anyone can discover and read your blogs
                                    </p>
                                </div>
                                <Switch
                                    checked={field.value ?? true}
                                    onChange={field.onChange}
                                />
                            </div>
                        )}
                    />

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <Link
                            to={BLOGIFY_ROUTES.LIBRARY}
                            className="px-4 py-2.5 text-sm font-medium rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                        >
                            Cancel
                        </Link>
                        <LoadingButton
                            type="submit"
                            isLoading={isSaving}
                            disabled={isSaving}
                        >
                            {isEditMode ? 'Update Notebook' : 'Create Notebook'}
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
}