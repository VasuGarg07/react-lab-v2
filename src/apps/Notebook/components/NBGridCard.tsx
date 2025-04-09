import { Link } from "react-router";
import { Lock, Globe, FileText, Calendar, MoreVertical, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Notebook } from "../helpers/notebook.constants";
import { useAuth } from "@/auth/AuthProvider";

interface Props {
    notebook: Notebook;
}

const NBGridCard: React.FC<Props> = ({ notebook }) => {
    const { user } = useAuth();
    const { id, title, coverImageUrl: coverImage, visibility, updatedAt, chapterCount, author, userId } = notebook;
    const isOwner = user?.id === userId;
    const placeholderImage = '/nocover.png';
    const relativeDate = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });
    console.log(user?.id, notebook)

    return (
        <div className="relative group rounded-xl overflow-hidden shadow-md bg-white dark:bg-zinc-900 transition hover:shadow-lg">
            <div className="relative aspect-[3/2] overflow-hidden">
                <img
                    src={coverImage || placeholderImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>

            <div className="absolute top-2 left-2 z-20 text-xs px-2 py-1 rounded-full backdrop-blur-sm text-white bg-black/40 flex items-center gap-1">
                {visibility === "public" ? (
                    <>
                        <Globe size={12} className="text-green-400" />
                        <span>Public</span>
                    </>
                ) : (
                    <>
                        <Lock size={12} className="text-amber-400" />
                        <span>Private</span>
                    </>
                )}
            </div>

            {/* Top-right action icons */}
            <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
                <button className="p-1 bg-black/30 hover:bg-black/50 text-white rounded-full">
                    <Bookmark size={14} />
                </button>
                {isOwner && (
                    <button className="p-1 bg-black/30 hover:bg-black/50 text-white rounded-full">
                        <MoreVertical size={14} />
                    </button>
                )}
            </div>

            <div className="p-3 z-10 relative bg-white dark:bg-zinc-900">
                <h3 className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm truncate">{title}</h3>

                <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1">
                        <FileText size={11} />
                        <span>{chapterCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={11} />
                        <span>{relativeDate}</span>
                    </div>
                </div>

                {author && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                        <img
                            src={author.avatar}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover border"
                        />
                        <span className="text-xs text-zinc-800 dark:text-zinc-300 truncate">{author.name}</span>
                    </div>
                )}
            </div>

            <Link
                to={`/archivra/notebook/${id}`}
                className="absolute inset-0 z-10"
                aria-label={`View notebook: ${title}`}
            />
        </div>
    );
};

export default NBGridCard;