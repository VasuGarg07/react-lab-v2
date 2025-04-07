import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useNotebookData } from "../helpers/useNotebookData";
import NBGallery from "../components/NBGallery";

const PublicNotebooks = () => {
    const {
        notebooks,
        loading,
        error,
        fetchPublicNotebooks,
    } = useNotebookData();

    useEffect(() => {
        fetchPublicNotebooks();
    }, [fetchPublicNotebooks]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="animate-spin text-zinc-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                Failed to load public notebooks. Please try again.
            </div>
        );
    }

    return (
        <div className="space-y-4 relative dark:text-neutral-100">
            <h2 className="text-xl font-semibold tracking-tight">Public Notebooks</h2>
            <NBGallery notebooks={notebooks || []} />
        </div>
    );
};

export default PublicNotebooks;
