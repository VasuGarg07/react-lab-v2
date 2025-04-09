import { Link } from "react-router";
import { Lock, Globe, FileText, MoreVertical, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Notebook } from "../helpers/notebook.constants";
import { useAuth } from "@/auth/AuthProvider";

interface Props {
    notebook: Notebook;
}

const NBListCard: React.FC<Props> = ({ notebook }) => {
    const { user } = useAuth();
    const { id, title, coverImageUrl: coverImage, visibility, updatedAt, chapterCount, author, userId } = notebook;
    const isOwner = user?.id === userId;
    const placeholderImage = '/nocover.png';
    const relativeDate = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });

    return (
        <div className="relative group flex items-center justify-between gap-4 rounded-lg p-2 shadow-md transition bg-white dark:bg-zinc-900 hover:shadow-lg">
            {/* Left: Cover + Badge */}
            <div className="relative w-14 h-20 shrink-0 rounded overflow-hidden shadow-sm">
                <img
                    src={coverImage || placeholderImage}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute top-1.5 left-1.5 w-4 h-4 rounded-full flex items-center justify-center ${visibility === "public"
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                    }`}>
                    {visibility === "public" ? <Globe size={10} /> : <Lock size={10} />}
                </div>
            </div>

            {/* Middle: Title + Info */}
            <div className="flex flex-col justify-center min-w-0 flex-grow">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium truncate text-zinc-900 dark:text-zinc-100">{title}</h3>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
                            <Bookmark size={14} className="text-zinc-500" />
                        </button>
                        {isOwner && (
                            <button className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                <MoreVertical size={15} className="text-zinc-500" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-1 gap-4">
                    <div className="flex items-center">
                        <FileText size={13} className="mr-1" />
                        <span>{chapterCount || 0} chapters</span>
                    </div>
                    <span>{relativeDate}</span>
                </div>
            </div>

            {/* Author */}
            {author && (
                <div className="hidden md:flex items-center gap-2 border-l pl-4 border-zinc-200 dark:border-zinc-700 min-w-[120px]">
                    <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-7 h-7 rounded-full object-cover border dark:border-zinc-700"
                    />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">
                        {author.name}
                    </span>
                </div>
            )}

            <Link
                to={`/archivra/notebook/${id}`}
                className="absolute inset-0 z-10"
                aria-label={`View notebook: ${title}`}
            />
        </div>
    );
};

export default NBListCard;