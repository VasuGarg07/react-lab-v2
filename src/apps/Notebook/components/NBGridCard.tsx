import { Link } from "react-router";
import { Lock, Globe, FileText, MoreVertical, Calendar } from "lucide-react";
import { Notebook } from "../helpers/notebook.constants";
import { useAuth } from "@/auth/AuthProvider";

interface Props {
    notebook: Notebook;
}

const NBGridCard: React.FC<Props> = ({ notebook }) => {
    const { user } = useAuth();
    const { id, title, coverImage, visibility, updatedAt, chapterCount, author } = notebook;
    const isOwner = user?.id === author?.userId;
    const placeholderImage = '/nocover.png';

    // Format date as month/day
    const formattedDate = new Date(updatedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="relative overflow-hidden rounded-lg shadow-sm bg-white dark:bg-zinc-900 h-75 group">
            {/* Image with tilt effect */}
            <div className="absolute inset-0 transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-105 z-0">
                <img
                    src={coverImage || placeholderImage}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            {/* Status badge - fixed positioning */}
            <div className="absolute top-2 left-2 z-20">
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs">
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
            </div>

            {/* Content overlay - FIXED position (doesn't tilt) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10 bg-gradient-to-t from-black/90 to-transparent">
                {/* Title */}
                <h3 className="text-white font-semibold truncate text-sm">{title}</h3>

                {/* Info bar */}
                <div className="flex items-center gap-3 mt-1 text-xs text-zinc-200">
                    <div className="flex items-center gap-1">
                        <FileText size={11} />
                        <span>{chapterCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={11} />
                        <span>{formattedDate}</span>
                    </div>
                </div>

                {/* Author with border separator */}
                {author && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/40">
                            <img
                                src={author.avatar}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-xs text-white truncate">{author.name}</span>
                    </div>
                )}
            </div>

            {/* Options button */}
            {isOwner && (
                <div className="absolute top-2 right-2 z-30">
                    <button className="p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors">
                        <MoreVertical size={14} />
                    </button>
                </div>
            )}

            {/* Decorative corner fold */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-white/30 via-white/10 to-transparent transform rotate-[-10deg] translate-x-2 -translate-y-2 z-0"></div>

            {/* Link overlay */}
            <Link
                to={`/archivra/notebook/${id}`}
                className="absolute inset-0 z-10"
                aria-label={`View notebook: ${title}`}
            />
        </div>
    );
};

export default NBGridCard;