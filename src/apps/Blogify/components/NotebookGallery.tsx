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
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (notebooks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
                <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                    <BookOpen className="w-7 h-7 text-neutral-400 dark:text-neutral-500" />
                </div>
                <p className="text-base font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {emptyMessage}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
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
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}