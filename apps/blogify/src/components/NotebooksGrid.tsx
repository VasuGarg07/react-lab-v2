import { Link } from 'react-router';
import { BLOGIFY_ROUTES, type Notebook } from '../helpers/blog.constants';
import { Plus } from 'lucide-react';
import NotebookCard from './NotebookCard';
import { Pagination } from '@react-lab/ui';

interface NotebooksGridProps {
    notebooks: Notebook[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading: boolean;
}

export default function NotebooksGrid({ notebooks, currentPage, totalPages, onPageChange, isLoading }: NotebooksGridProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-75">
                <div className="w-7 h-7 border-2 border-stone-200 dark:border-stone-700 border-t-stone-600 dark:border-t-stone-300 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <Link
                    to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                    className="aspect-3/4 rounded-2xl border border-dashed border-stone-200 dark:border-stone-700 flex flex-col items-center justify-center gap-2 text-stone-400 dark:text-stone-600 hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-600 dark:hover:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-all group"
                >
                    <div className="w-10 h-10 rounded-full border border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center group-hover:border-stone-400 dark:group-hover:border-stone-500 transition-colors">
                        <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium">New notebook</span>
                </Link>
                {notebooks.map(notebook => (
                    <NotebookCard key={notebook.id} notebook={notebook} showAuthor={false} />
                ))}
            </div>

            {notebooks.length === 0 && (
                <p className="text-center text-sm text-stone-400 dark:text-stone-500 py-4">
                    Create your first notebook to get started
                </p>
            )}

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </div>
    );
}
