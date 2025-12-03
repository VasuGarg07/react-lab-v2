import { useParams, Link } from 'react-router';
import { ChevronLeft, Plus } from 'lucide-react';
import { useAppSelector } from '../../../store/useRedux';
import { BLOGIFY_ROUTES, type BlogRequest } from '../helpers/blog.constants';
import { useUserNotebooks, useBlog } from '../hooks/useBlogQuery';
import { usePublishBlog, useUpdateBlog } from '../hooks/useBlogMutations';
import BlogForm from '../components/BlogForm';

export default function WriteBlog() {
    const { blogId } = useParams<{ blogId: string }>();
    const user = useAppSelector(state => state.auth.user);

    const isEditMode = !!blogId;

    // Fetch user's notebooks
    const { data: notebooksData, isLoading: notebooksLoading } = useUserNotebooks(1, 100);
    const notebooks = notebooksData?.data ?? [];

    // Fetch existing blog if edit mode
    const { data: existingBlog, isLoading: blogLoading } = useBlog(blogId!);

    // Mutations
    const publishMutation = usePublishBlog();
    const updateMutation = useUpdateBlog();

    const isLoading = notebooksLoading || (isEditMode && blogLoading);
    const isSaving = publishMutation.isPending || updateMutation.isPending;

    // No notebooks exist (for create mode)
    const hasNoNotebooks = !notebooksLoading && notebooks.length === 0 && !isEditMode;

    const handleSubmit = (data: BlogRequest, notebookId: string) => {
        if (isEditMode && blogId) {
            updateMutation.mutate({ id: blogId, data });
        } else {
            publishMutation.mutate({ notebookId, data });
        }
    };

    const handleSaveDraft = (data: BlogRequest, notebookId: string) => {
        const draftData = { ...data, isArchived: true };
        if (isEditMode && blogId) {
            updateMutation.mutate({ id: blogId, data: draftData });
        } else {
            publishMutation.mutate({ notebookId, data: draftData });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // No notebooks - prompt to create one
    if (hasNoNotebooks) {
        return (
            <div className="space-y-6">
                <header>
                    <Link
                        to={BLOGIFY_ROUTES.HOME}
                        className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-4"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </Link>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        Write
                    </h1>
                </header>

                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Create a notebook first
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm">
                        You need at least one notebook to start writing. Notebooks help you organize your blogs.
                    </p>
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Notebook
                    </Link>
                </div>
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
                    {isEditMode ? 'Edit Blog' : 'Write'}
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                    {isEditMode ? 'Update your blog post' : 'Share your story with the world'}
                </p>
            </header>

            {/* Form Card */}
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 sm:p-6">
                <BlogForm
                    notebooks={notebooks}
                    defaultValues={
                        isEditMode && existingBlog
                            ? {
                                notebookId: existingBlog.notebookId,
                                author: existingBlog.author,
                                title: existingBlog.title,
                                blogContent: existingBlog.blogContent,
                                tags: existingBlog.tags,
                                isArchived: existingBlog.isArchived,
                            }
                            : { author: user?.username ?? '' }
                    }
                    isEditMode={isEditMode}
                    isLoading={isSaving}
                    onSubmit={handleSubmit}
                    onSaveDraft={handleSaveDraft}
                />
            </div>
        </div>
    );
}