import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Notebook } from "../helpers/notebook.constants";
import NBGridCard from "./NBGridCard";
import NBListCard from "./NBListCard";

interface Props {
    notebooks: Notebook[];
}

const NBGallery: React.FC<Props> = ({ notebooks }) => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    if (!notebooks.length) {
        return (
            <div className="text-center text-zinc-500 py-10">
                You don't have any notebooks yet.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-zinc-200 dark:bg-zinc-700" : ""}`}
                >
                    <LayoutGrid size={18} />
                </button>
                <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-zinc-200 dark:bg-zinc-700" : ""}`}
                >
                    <List size={18} />
                </button>
            </div>

            {viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notebooks.map((notebook) => (
                        <NBGridCard key={notebook.id} notebook={notebook} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {notebooks.map((notebook) => (
                        <NBListCard key={notebook.id} notebook={notebook} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NBGallery;
