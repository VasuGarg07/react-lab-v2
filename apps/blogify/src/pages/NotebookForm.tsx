import { useParams, Link } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { useAuthSelector } from '@react-lab/auth';
import { BLOGIFY_ROUTES, BLOG_CONSTANTS, type NotebookRequest } from '../helpers/blog.constants';
import { isValidImageUrl } from '../helpers/blog.utils';
import { useNotebook } from '../hooks/useBlogQuery';
import { useCreateNotebook, useUpdateNotebook } from '../hooks/useBlogMutations';
import { TextInput, Textarea, Switch, LoadingButton } from '@react-lab/ui';

export default function NotebookForm() {
    const { notebookId } = useParams<{ notebookId: string }>();
    const user = useAuthSelector(state => state.auth.user);
    const isEditMode = !!notebookId;

    const { data: existingNotebook, isLoading: notebookLoading } = useNotebook(notebookId!);
    const createMutation = useCreateNotebook();
    const updateMutation = useUpdateNotebook();

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
        isEditMode && notebookId
            ? updateMutation.mutate({ id: notebookId, data })
            : createMutation.mutate(data);
    };

    if (isEditMode && notebookLoading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="w-7 h-7 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <header className="space-y-1 pt-2">
                <Link to={BLOGIFY_ROUTES.LIBRARY} className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors mb-3">
                    <ChevronLeft className="w-4 h-4" />Back to library
                </Link>
                <h1 className="font-serif text-3xl text-stone-900">{isEditMode ? 'Edit notebook' : 'New notebook'}</h1>
                <p className="text-sm text-stone-400">
                    {isEditMode ? 'Update your notebook details' : 'Create a new collection for your blogs'}
                </p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {coverImageUrl && isValidImageUrl(coverImageUrl) && (
                    <div className="aspect-21/9 w-full rounded-2xl overflow-hidden bg-stone-100">
                        <img src={coverImageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                    </div>
                )}

                <Controller
                    name="coverImageUrl"
                    control={control}
                    rules={{
                        required: 'Cover image is required',
                        validate: v => isValidImageUrl(v) || 'Must be a valid image URL (.jpg, .png, .webp, .gif)',
                    }}
                    render={({ field }) => (
                        <TextInput {...field} label="Cover image URL" placeholder="https://example.com/image.jpg" error={errors.coverImageUrl?.message} />
                    )}
                />

                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: 'Title is required',
                        minLength: { value: 3, message: 'Minimum 3 characters' },
                        maxLength: { value: 100, message: 'Maximum 100 characters' },
                    }}
                    render={({ field }) => (
                        <TextInput {...field} label="Title" placeholder="My awesome notebook" error={errors.title?.message} />
                    )}
                />

                <Controller
                    name="author"
                    control={control}
                    rules={{
                        required: 'Author is required',
                        minLength: { value: 3, message: 'Minimum 3 characters' },
                        maxLength: { value: 100, message: 'Maximum 100 characters' },
                    }}
                    render={({ field }) => (
                        <TextInput {...field} label="Author" placeholder="Your pen name" error={errors.author?.message} />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    rules={{ maxLength: { value: BLOG_CONSTANTS.MAX_DESCRIPTION_LENGTH, message: `Maximum ${BLOG_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters` } }}
                    render={({ field }) => (
                        <Textarea {...field} label="Description" placeholder="What's this notebook about? (optional)" rows={3} error={errors.description?.message} />
                    )}
                />

                <Controller
                    name="isPublic"
                    control={control}
                    render={({ field }) => (
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200">
                            <div>
                                <p className="text-sm font-medium text-stone-800">Public notebook</p>
                                <p className="text-xs text-stone-400 mt-0.5">Anyone can discover and read your blogs</p>
                            </div>
                            <Switch checked={field.value ?? true} onChange={field.onChange} />
                        </div>
                    )}
                />

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                    <Link to={BLOGIFY_ROUTES.LIBRARY} className="px-4 py-2.5 text-sm font-medium rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors">
                        Cancel
                    </Link>
                    <LoadingButton type="submit" isLoading={isSaving} disabled={isSaving}>
                        {isEditMode ? 'Update notebook' : 'Create notebook'}
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
}
