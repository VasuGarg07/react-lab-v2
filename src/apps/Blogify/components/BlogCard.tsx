import { Blog } from '@/apps/Blogify/helpers/blog.constants';
import { archiveBlog } from '@/apps/Blogify/helpers/blog.service';
import { useAuth } from '@/auth/AuthProvider';
import DropdownMenu from '@/ui/DropdownMenu';
import { Archive, MoreVertical, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { cn } from '@/shared/cn';

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

    // Dropdown menu items
    const dropdownItems = [
        {
            label: 'Edit',
            icon: <Pencil size={14} />,
            onClick: handleEdit,
            variant: 'default' as const
        },
        {
            label: blog.isArchived ? 'Unarchive' : 'Archive',
            icon: <Archive size={14} />,
            onClick: handleArchive,
            variant: 'warning' as const
        }
    ];

    return (
        <div className="w-full h-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            {/* Cover Image */}
            <div className="w-full aspect-[2/1] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                            <img
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author}`}
                                alt={blog.author}
                                className="w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                {blog.author}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {formatDate(blog.createdAt)}
                            </p>
                        </div>
                    </div>

                    {isOwner && (
                        <DropdownMenu
                            trigger={
                                <button
                                    className={cn(
                                        "p-1.5 rounded-full transition-colors",
                                        "text-slate-500 dark:text-slate-400",
                                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                                        "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    )}
                                    aria-label="More options"
                                >
                                    <MoreVertical size={16} />
                                </button>
                            }
                            items={dropdownItems}
                            align="end"
                            sideOffset={5}
                        />
                    )}
                </div>

                <div className="h-px w-full bg-slate-200 dark:bg-slate-700 mb-3"></div>

                {/* Content */}
                <Link
                    to={`/blogify/blog/${blog.id}`}
                    className="block no-underline text-inherit"
                >
                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {blog.title}
                    </h3>
                </Link>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {blog.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        >
                            {tag}
                        </span>
                    ))}
                    {blog.isArchived && (
                        <span className="px-2 py-1 text-xs font-medium rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                            Draft
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;