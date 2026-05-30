import { useParams, Link } from 'react-router';
import { ChevronLeft, Plus } from 'lucide-react';
import { useAuthSelector } from '@react-lab/auth';
import { BLOGIFY_ROUTES, type BlogRequest } from '../helpers/blog.constants';
import { useUserNotebooks, useBlog } from '../hooks/useBlogQuery';
import { usePublishBlog, useUpdateBlog } from '../hooks/useBlogMutations';
import BlogForm from '../components/BlogForm';

export default function WriteBlog() {
    const { blogId } = useParams<{ blogId: string }>();
    const user = useAuthSelector(state => state.auth.user);
    const isEditMode = !!blogId;

    const { data: notebooksData, isLoading: notebooksLoading } = useUserNotebooks(1, 100);
    const { data: existingBlog, isLoading: blogLoading } = useBlog(blogId!);
    const publishMutation = usePublishBlog();
    const updateMutation = useUpdateBlog();

    const notebooks = notebooksData?.data ?? [];
    const isLoading = notebooksLoading || (isEditMode && blogLoading);
    const isSaving = publishMutation.isPending || updateMutation.isPending;
    const hasNoNotebooks = !notebooksLoading && notebooks.length === 0 && !isEditMode;

    const handleSubmit = (data: BlogRequest, notebookId: string) => {
        isEditMode && blogId
            ? updateMutation.mutate({ id: blogId, data })
            : publishMutation.mutate({ notebookId, data });
    };

    const handleSaveDraft = (data: BlogRequest, notebookId: string) => {
        const draftData = { ...data, isArchived: true };
        isEditMode && blogId
            ? updateMutation.mutate({ id: blogId, data: draftData })
            : publishMutation.mutate({ notebookId, data: draftData });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-7 h-7 border-2 border-stone-200 dark:border-stone-700 border-t-stone-600 dark:border-t-stone-300 rounded-full animate-spin" />
            </div>
        );
    }

    if (hasNoNotebooks) {
        return (
            <div className="max-w-xl mx-auto space-y-8">
                <header className="pt-2">
                    <Link to={BLOGIFY_ROUTES.HOME} className="inline-flex items-center gap-1 text-sm text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors mb-3">
                        <ChevronLeft className="w-4 h-4" />Back
                    </Link>
                    <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100">Write</h1>
                </header>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
                        <Plus className="w-5 h-5 text-stone-400" />
                    </div>
                    <p className="font-serif text-xl text-stone-800 dark:text-stone-200 mb-2">Create a notebook first</p>
                    <p className="text-sm text-stone-400 dark:text-stone-500 mb-8 max-w-xs">
                        You need at least one notebook to start writing.
                    </p>
                    <Link
                        to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />Create notebook
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <header className="space-y-1 pt-2">
                <Link to={BLOGIFY_ROUTES.LIBRARY} className="inline-flex items-center gap-1 text-sm text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors mb-3">
                    <ChevronLeft className="w-4 h-4" />Back to library
                </Link>
                <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100">{isEditMode ? 'Edit blog' : 'Write'}</h1>
                <p className="text-sm text-stone-400 dark:text-stone-500">
                    {isEditMode ? 'Update your blog post' : 'Share your story with the world'}
                </p>
            </header>

            <BlogForm
                notebooks={notebooks}
                defaultValues={
                    isEditMode && existingBlog ? {
                        notebookId: existingBlog.notebookId,
                        author: existingBlog.author,
                        title: existingBlog.title,
                        blogContent: existingBlog.blogContent,
                        tags: existingBlog.tags,
                        isArchived: existingBlog.isArchived,
                    } : { author: user?.username ?? '' }
                }
                isEditMode={isEditMode}
                isLoading={isSaving}
                onSubmit={handleSubmit}
                onSaveDraft={handleSaveDraft}
            />
        </div>
    );
}
