import BlogGallery from '@/apps/Blogify/components/BlogGallery';
import { BlogListResponse } from '@/apps/Blogify/helpers/blog.constants';
import { useAuth } from '@/auth/AuthProvider';
import { useLoaderData, useNavigation, useSearchParams } from 'react-router';

const MyBlogs = () => {
    const response = useLoaderData() as BlogListResponse;
    const [_, setPage] = useSearchParams();
    const navigation = useNavigation();
    const { user } = useAuth();

    const handlePageChange = (page: number) => {
        setPage(prev => {
            prev.set('page', page.toString());
            return prev;
        });
    };

    const publishedCount = response.data.filter(blog => !blog.isArchived).length;
    const draftCount = response.data.filter(blog => blog.isArchived).length;

    if (navigation.state === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-2 md:p-4 space-y-6">
            {/* Author Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center text-lg font-medium">
                    <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}`}
                        alt={user?.username}
                        className="w-full h-full"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Your Stories
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Welcome back, {user?.username}
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 text-center shadow-sm">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {response.pagination.totalItems}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Stories
                    </p>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 text-center shadow-sm">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {publishedCount}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Published
                    </p>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 text-center shadow-sm">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {draftCount}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Drafts
                    </p>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 text-center shadow-sm">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {response.data.reduce((acc, blog) => acc + blog.tags.length, 0)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Tags
                    </p>
                </div>
            </div>

            {/* Blog Gallery */}
            <BlogGallery
                blogListResponse={response}
                onPageChange={handlePageChange}
                emptyMessage="Start writing your first blog!"
            />
        </div>
    );
};

export default MyBlogs;