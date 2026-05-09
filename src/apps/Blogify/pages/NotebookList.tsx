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
    const totalItems = notebooksData?.pagination.totalItems ?? 0;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Link
                to={BLOGIFY_ROUTES.DISCOVER}
                className="inline-flex items-center gap-1 text-sm text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to discover
            </Link>

            <header className="flex items-center gap-4 pb-6 border-b border-stone-100 dark:border-stone-800">
                <div className="w-14 h-14 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden ring-2 ring-stone-100 dark:ring-stone-800 shrink-0">
                    <img src={generateAvatarUrl(author!)} alt={author} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="font-serif text-2xl text-stone-900 dark:text-stone-100">
                        {author}
                    </h1>
                    <p className="text-sm text-stone-400 dark:text-stone-500 mt-0.5">
                        {totalItems} {totalItems === 1 ? 'notebook' : 'notebooks'}
                    </p>
                </div>
            </header>

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