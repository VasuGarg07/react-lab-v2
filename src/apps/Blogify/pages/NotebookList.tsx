import { useParams, Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import { generateAvatarUrl } from '../helpers/blog.utils';
import { useNotebooksByAuthor } from '../hooks/useBlogQuery';
import { usePagination } from '../hooks/usePagination';
import NotebookGallery from '../components/NotebookGallery';

export default function NotebookList() {
    const { author } = useParams<{ author: string }>();
    const { currentPage, setPage } = usePagination();

    const { data: notebooksData, isLoading } = useNotebooksByAuthor(author!, currentPage, 12);

    const notebooks = notebooksData?.data ?? [];
    const totalPages = notebooksData?.pagination.totalPages ?? 1;

    return (
        <div className="space-y-6">
            {/* Header */}
            <header>
                <Link
                    to={BLOGIFY_ROUTES.DISCOVER}
                    className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-4"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Discover
                </Link>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                        <img
                            src={generateAvatarUrl(author!)}
                            alt={author}
                            className="w-full h-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                            {author}
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            {notebooksData?.pagination.totalItems ?? 0} notebooks
                        </p>
                    </div>
                </div>
            </header>

            {/* Notebooks Gallery */}
            <NotebookGallery
                notebooks={notebooks}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
                isLoading={isLoading}
                emptyMessage={`${author} hasn't created any notebooks yet`}
                emptyDescription="Check back later"
            />
        </div>
    );
}