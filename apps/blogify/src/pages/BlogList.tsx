import { useParams, Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { BLOGIFY_ROUTES } from '../helpers/blog.constants';
import { generateAvatarUrl } from '../helpers/blog.utils';
import { useBlogsByAuthor } from '../hooks/useBlogQuery';
import { usePagination } from '../hooks/usePagination';
import BlogGallery from '../components/BlogGallery';

export default function BlogList() {
    const { author } = useParams<{ author: string }>();
    const { currentPage, setPage } = usePagination();
    const { data: blogsData, isLoading } = useBlogsByAuthor(author!, currentPage, 10);

    const blogs = blogsData?.data ?? [];
    const totalPages = blogsData?.pagination.totalPages ?? 1;
    const totalItems = blogsData?.pagination.totalItems ?? 0;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Link to={BLOGIFY_ROUTES.DISCOVER} className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors">
                <ChevronLeft className="w-4 h-4" />Back to discover
            </Link>

            <header className="flex items-center gap-4 pb-6 border-b border-stone-100">
                <div className="w-14 h-14 rounded-full bg-stone-200 overflow-hidden ring-2 ring-stone-100 shrink-0">
                    <img src={generateAvatarUrl(author!)} alt={author} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="font-serif text-2xl text-stone-900">{author}</h1>
                    <p className="text-sm text-stone-400 mt-0.5">{totalItems} {totalItems === 1 ? 'blog' : 'blogs'}</p>
                </div>
            </header>

            <BlogGallery
                blogs={blogs}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
                isLoading={isLoading}
                emptyMessage={`${author} hasn't published anything yet`}
                emptyDescription="Check back later"
            />
        </div>
    );
}
