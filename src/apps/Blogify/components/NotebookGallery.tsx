import { BookOpen } from 'lucide-react';
import type { Notebook } from '../helpers/blog.constants';
import NotebookCard from './NotebookCard';
import Pagination from '../../../ui/Pagination';

interface NotebookGalleryProps {
    notebooks: Notebook[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
    emptyMessage?: string;
    emptyDescription?: string;
}

export default function NotebookGallery({
    notebooks,
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false,
    emptyMessage = 'No notebooks found',
    emptyDescription = 'Check back later for new content',
}: NotebookGalleryProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="w-7 h-7 border-2 border-stone-200 dark:border-stone-700 border-t-stone-600 dark:border-t-stone-300 rounded-full animate-spin" />
            </div>
        );
    }

    if (notebooks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-base text-stone-700 dark:text-stone-300 mb-1">
                    {emptyMessage}
                </p>
                <p className="text-sm text-stone-400 dark:text-stone-500">
                    {emptyDescription}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {notebooks.map(notebook => (
                    <NotebookCard key={notebook.id} notebook={notebook} />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </div>
    );
}