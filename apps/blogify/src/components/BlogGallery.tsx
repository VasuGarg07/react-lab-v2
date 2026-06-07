import { FileText } from 'lucide-react';
import type { Blog } from '../helpers/blog.constants';
import PieceRow from './PieceRow';
import { Pagination } from '@react-lab/ui';

interface BlogGalleryProps {
    blogs: Blog[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
    emptyMessage?: string;
    emptyDescription?: string;
}

export default function BlogGallery({
    blogs, currentPage, totalPages, onPageChange,
    isLoading = false,
    emptyMessage = 'No blogs yet',
    emptyDescription = 'Check back later for new content',
}: BlogGalleryProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-75">
                <div className="w-7 h-7 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-75 text-center px-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
                    <FileText className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-lg text-stone-700 mb-1">{emptyMessage}</p>
                <p className="text-sm text-stone-400">{emptyDescription}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                {blogs.map((blog, i) => <PieceRow key={blog.id} blog={blog} index={i + 1} />)}
            </div>
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </div>
    );
}
