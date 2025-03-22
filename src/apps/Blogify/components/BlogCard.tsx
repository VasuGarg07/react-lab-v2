import { Blog } from '@/apps/Blogify/helpers/blog.constants';
import { archiveBlog } from '@/apps/Blogify/helpers/blog.service';
import { useAuth } from '@/auth/AuthProvider';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Archive, MoreVertical, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

interface BlogCardProps {
    blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const isOwner = user?.id === blog.userId;

    const formatDate = (dateString: string | number) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        navigate(`/blogify/edit/${blog.id}`);
    };

    const handleArchive = async () => {
        try {
            await archiveBlog(blog.id);
            // You might want to trigger a refresh of the blog list here
            // or show a success message
        } catch (error) {
            console.error('Error archiving blog:', error);
            // Handle error (show error message)
        }
    };

    return (
        <div className="w-full h-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            {/* Cover Image */}
            <div className="w-full aspect-[2/1] overflow-hidden">
                <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center text-sm font-medium">
                            <img
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author}`}
                                alt={blog.author}
                                className="w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {blog.author}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(blog.createdAt)}
                            </p>
                        </div>
                    </div>

                    {isOwner && (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button
                                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                    aria-label="More options"
                                >
                                    <MoreVertical size={16} />
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    className="min-w-[160px] bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                                    sideOffset={5}
                                    align="end"
                                    alignOffset={-5}
                                >
                                    <DropdownMenu.Item
                                        className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                                        onSelect={handleEdit}
                                    >
                                        <Pencil size={14} />
                                        <span className="ml-2">Edit</span>
                                    </DropdownMenu.Item>

                                    <DropdownMenu.Item
                                        className="flex items-center px-3 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                                        onSelect={handleArchive}
                                    >
                                        <Archive size={14} />
                                        <span className="ml-2">
                                            {blog.isArchived ? 'Unarchive' : 'Archive'}
                                        </span>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    )}
                </div>

                <div className="h-px w-full bg-gray-200 dark:bg-gray-700 mb-3"></div>

                {/* Content */}
                <Link
                    to={`/blogify/blog/${blog.id}`}
                    className="block no-underline text-inherit"
                >
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100 line-clamp-2">
                        {blog.title}
                    </h3>
                </Link>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                    {blog.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                    {blog.isArchived && (
                        <span className="px-2 py-1 text-xs rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                            Draft
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;