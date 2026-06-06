import { BookOpen } from 'lucide-react';
import type { Notebook } from '../helpers/blog.constants';
import NotebookCard from './NotebookCard';
import { Pagination } from '@react-lab/ui';

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
    notebooks, currentPage, totalPages, onPageChange,
    isLoading = false,
    emptyMessage = 'No notebooks found',
    emptyDescription = 'Check back later for new content',
}: NotebookGalleryProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-75">
                <div className="w-7 h-7 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (notebooks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-75 text-center px-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-base text-stone-700 mb-1">{emptyMessage}</p>
                <p className="text-sm text-stone-400">{emptyDescription}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {notebooks.map(notebook => <NotebookCard key={notebook.id} notebook={notebook} />)}
            </div>
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </div>
    );
}
