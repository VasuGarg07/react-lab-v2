import { useState } from "react";
import { Dialog } from "@/ui/Dialog";
import { Loader2, Search } from "lucide-react";
import { useNotebookData } from "../helpers/useNotebookData";
import NBListCard from "./NBListCard";

interface Props {
    isOpen: boolean;
    onClose: () => void
}

const SearchDialog: React.FC<Props> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");
    const { searchNotebooks, notebooks, loading, error } = useNotebookData();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            await searchNotebooks(query.trim());
        }
    };

    const handleClose = () => {
        setQuery('');
        onClose();
    }

    return (
        <Dialog isOpen={isOpen} onClose={handleClose} title="Search Notebooks" size="sm">
            <form onSubmit={handleSearch} className="p-4 space-y-4 dark:text-neutral-100">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        placeholder="Press Enter to search"
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
                    />
                    <button
                        type="submit"
                        className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    >
                        <Search size={18} />
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center py-4">
                        <Loader2 className="animate-spin text-zinc-500" />
                    </div>
                )}

                {!loading && error && (
                    <div className="text-sm text-red-500 text-center">{error}</div>
                )}

                {!loading && notebooks && notebooks.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {notebooks.map((notebook) => (
                            <NBListCard key={notebook.id} notebook={notebook} />
                        ))}
                    </div>
                )}

                {!loading && notebooks && notebooks.length === 0 && (
                    <div className="text-sm text-center text-zinc-500">
                        No notebooks found for "{query}"
                    </div>
                )}
            </form>
        </Dialog>
    );
};

export default SearchDialog;
