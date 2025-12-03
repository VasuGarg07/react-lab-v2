import { Link } from "react-router";
import { BLOGIFY_ROUTES, type Notebook } from "../helpers/blog.constants";
import { Plus } from "lucide-react";
import NotebookCard from "../components/NotebookCard";
import Pagination from "../../../ui/Pagination";

interface NotebooksGridProps {
    notebooks: Notebook[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading: boolean;
}

export default function NotebooksGrid({ notebooks, currentPage, totalPages, onPageChange, isLoading }: NotebooksGridProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Create New Card */}
                <Link
                    to={BLOGIFY_ROUTES.NOTEBOOK_CREATE}
                    className="aspect-square rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex flex-col items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all"
                >
                    <Plus className="w-8 h-8" />
                    <span className="text-sm font-medium">Create</span>
                </Link>

                {/* Notebook Cards */}
                {notebooks.map(notebook => (
                    <NotebookCard key={notebook.id} notebook={notebook} showAuthor={false} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}

            {notebooks.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Create your first notebook to get started
                    </p>
                </div>
            )}
        </div>
    );
}