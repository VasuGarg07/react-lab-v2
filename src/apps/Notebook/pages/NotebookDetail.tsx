import { Bookmark, Edit2, EyeOff, Globe, Lock, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Author, Chapter, Notebook } from "../helpers/notebook.constants";
import { useAuth } from "@/auth/AuthProvider";

interface LoaderData {
    notebook: Notebook;
    author: Author;
    chapters: Chapter[];
}

const NotebookDetail: React.FC = () => {
    const [isBookmarked, setBookmarked] = useState(false);
    const { notebook, chapters, author } = useLoaderData() as LoaderData;
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!notebook) {
        return <div className="text-center text-zinc-500 py-10">Loading...</div>;
    }

    const isOwner = notebook.userId === user?.id;
    const formattedDate = new Date(notebook.updatedAt).toLocaleDateString();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Cover */}
                <div className="relative w-full md:w-60 h-40 md:h-48 overflow-hidden rounded-lg shadow-md">
                    <img
                        src={notebook.coverImageUrl || "/nocover.png"}
                        alt="Notebook Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs rounded-full flex items-center gap-1 bg-black/50 text-white">
                        {notebook.visibility === "public" ? <Globe size={12} /> : <Lock size={12} />}
                        <span className="capitalize">{notebook.visibility}</span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                            {notebook.title}
                        </h1>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setBookmarked((b) => !b)}
                                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            >
                                <Bookmark size={18} className={isBookmarked ? "fill-current text-blue-500" : "text-zinc-500"} />
                            </button>
                            {isOwner && (
                                <>
                                    <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700">
                                        <Edit2 size={18} className="text-zinc-500" />
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-zinc-700">
                                        <Trash2 size={18} className="text-red-500" />
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700">
                                        {notebook.visibility === "public" ? <EyeOff size={18} /> : <Globe size={18} />}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-7 h-7 rounded-full object-cover border"
                        />
                        <span>{author.name}</span>
                        <span>&middot;</span>
                        <span>{notebook.chapterCount || 0} chapters</span>
                        <span>&middot;</span>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>

            {/* Chapters */}
            <div className="mt-10">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Chapters</h2>
                    {isOwner && (
                        <button
                            onClick={() => navigate(`/archivra/notebook/${notebook.id}/new`)}
                            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
                        >
                            <Pencil size={14} /> Write
                        </button>
                    )}
                </div>
                {chapters.length === 0 ? (
                    <p className="text-sm text-zinc-500">No chapters available.</p>
                ) : (
                    <ul className="space-y-2">
                        {chapters.map((ch) => (
                            <li
                                key={ch.id}
                                className="p-3 rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 flex justify-between"
                            >
                                <span className="truncate text-zinc-800 dark:text-zinc-100">{ch.title}</span>
                                <span className="text-sm text-zinc-400">#{ch.order}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NotebookDetail;
