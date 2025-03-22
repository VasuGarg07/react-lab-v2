import BlogGallery from '@/apps/Blogify/components/BlogGallery';
import { BlogListResponse } from '@/apps/Blogify/helpers/blog.constants';
import { useLoaderData, useNavigation, useSearchParams } from 'react-router';

const BlogListPage = () => {
    const response = useLoaderData() as BlogListResponse;
    const [_, setPage] = useSearchParams();
    const navigation = useNavigation();

    const handlePageChange = (page: number) => {
        setPage(prev => {
            prev.set('page', page.toString());
            return prev;
        });
    };

    if (navigation.state === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-2 md:p-4">
            <BlogGallery
                blogListResponse={response}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BlogListPage;