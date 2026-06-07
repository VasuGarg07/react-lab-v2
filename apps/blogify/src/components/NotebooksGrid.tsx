import { Link } from 'react-router';
import { BLOGIFY_ROUTES, type Notebook } from '../helpers/blog.constants';
import { Plus } from 'lucide-react';
import NotebookVolume from './NotebookVolume';
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
                <div className="w-7 h-7 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7">
                <Link
                    to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                    className="aspect-4/5 rounded-r-lg rounded-l-sm border-2 border-dashed border-stone-300 flex flex-col items-center justify-center gap-2.5 text-stone-400 hover:border-navy hover:text-navy hover:bg-navy/5 transition-all group"
                >
                    <div className="w-11 h-11 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold">New notebook</span>
                </Link>
                {notebooks.map(notebook => (
                    <NotebookVolume key={notebook.id} notebook={notebook} showAuthor={false} />
                ))}
            </div>

            {notebooks.length === 0 && (
                <p className="text-center text-sm text-stone-400 py-4">
                    Create your first notebook to get started
                </p>
            )}

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </div>
    );
}
