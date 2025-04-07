import { Link } from "react-router";
import { Lock, Globe, FileText, MoreVertical } from "lucide-react";
import { Notebook } from "../helpers/notebook.constants";
import { useAuth } from "@/auth/AuthProvider";

interface Props {
    notebook: Notebook;
}

const NBListCard: React.FC<Props> = ({ notebook }) => {
    const { user } = useAuth();
    const { id, title, coverImage, visibility, updatedAt, chapterCount, author } = notebook;
    const isOwner = user?.id === author?.userId;
    const placeholderImage = '/nocover.png';

    // Format date in a readable format
    const formattedDate = new Date(updatedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="group relative rounded-lg transition duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            {/* Card content */}
            <div className="flex items-stretch overflow-hidden">
                {/* Left sidebar with color coded status */}
                <div className={`w-1 flex-shrink-0 ${visibility === "public"
                    ? "bg-green-400 dark:bg-green-500"
                    : "bg-amber-400 dark:bg-amber-500"
                    }`}></div>

                {/* Cover image with shadow effect */}
                <div className="relative w-14 h-20 flex-shrink-0 ml-2 my-2 overflow-hidden rounded shadow-sm group-hover:shadow">
                    <img
                        src={coverImage || placeholderImage}
                        alt=""
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className={`absolute top-1.5 left-1.5 w-4 h-4 rounded-full flex items-center justify-center ${visibility === "public"
                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                        }`}>
                        {visibility === "public"
                            ? <Globe size={10} />
                            : <Lock size={10} />
                        }
                    </div>
                </div>

                {/* Main content area */}
                <div className="flex flex-col justify-center min-w-0 px-3 py-2.5 flex-grow">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium leading-tight truncate pr-4 text-zinc-900 dark:text-zinc-100">{title}</h3>

                        {/* Only show options for owner */}
                        {isOwner && (
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full">
                                <MoreVertical size={15} className="text-zinc-500" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-1 gap-x-4">
                        <div className="flex items-center">
                            <FileText size={13} className="mr-1" />
                            <span>{chapterCount || 0} chapters</span>
                        </div>

                        <span className="text-zinc-400 dark:text-zinc-500">{formattedDate}</span>
                    </div>
                </div>

                {/* Author section with horizontal divider */}
                {author && (
                    <div className="flex items-center border-l border-zinc-100 dark:border-zinc-700 px-3 min-w-[120px]">
                        <div className="flex items-center">
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-sm"
                            />
                            <span className="ml-2 text-sm font-medium truncate text-zinc-700 dark:text-zinc-300">
                                {author.name}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Link overlay */}
            <Link
                to={`/archivra/notebook/${id}`}
                className="absolute inset-0 z-10"
                aria-label={`View notebook: ${title}`}
            />
        </div>
    );
};

export default NBListCard;