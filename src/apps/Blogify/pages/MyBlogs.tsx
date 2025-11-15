import { FileText, FileCheck, FileClock, Tags } from 'lucide-react';
import { useAppSelector } from '../../../store/useRedux';
import { usePagination } from '../hooks/usePagination';
import { useUserBlogs } from '../hooks/useBlogQuery';
import { generateAvatarUrl } from '../helpers/blog.utils';
import BlogGallery from '../components/BlogGallery';

export default function MyBlogs() {
    const { currentPage, setPage } = usePagination();
    const { data: blogListResponse, isLoading } = useUserBlogs(currentPage);
    const user = useAppSelector(state => state.auth.user);

    if (!blogListResponse) return null;

    const { data, pagination } = blogListResponse;
    const publishedCount = data.filter(blog => !blog.isArchived).length;
    const draftCount = data.filter(blog => blog.isArchived).length;
    const totalTags = data.reduce((acc, blog) => acc + blog.tags.length, 0);

    const stats = [
        { label: 'Total Blogs', value: pagination.totalItems, icon: FileText, color: 'blue' },
        { label: 'Published', value: publishedCount, icon: FileCheck, color: 'green' },
        { label: 'Drafts', value: draftCount, icon: FileClock, color: 'amber' },
        { label: 'Tags Used', value: totalTags, icon: Tags, color: 'purple' },
    ];

    const colorMap = {
        blue: { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        green: { text: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
        amber: { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
        purple: { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    };

    return (
        <div className="space-y-6">
            {/* Author Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                    <img src={generateAvatarUrl(user?.username || '')} alt={user?.username} className="w-full h-full" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Your Stories</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Welcome back, {user?.username}</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    const colors = colorMap[stat.color as keyof typeof colorMap];
                    return (
                        <div key={stat.label} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                            <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-2`}>
                                <Icon className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{stat.value}</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Blog Gallery */}
            <BlogGallery
                blogListResponse={blogListResponse}
                isLoading={isLoading}
                onPageChange={setPage}
                emptyMessage="Start writing your first blog!"
            />
        </div>
    );
};