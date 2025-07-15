import { ChevronRight, Home } from "lucide-react";
import React from "react";

interface BreadcrumbProps {
    path: string[];
    onNavigate: (index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
    return (
        <div className="flex items-center mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button
                onClick={() => onNavigate(-1)}
                className="p-1 mr-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 flex-shrink-0"
            >
                <Home size={16} />
            </button>

            {path.length > 0 && (
                <ChevronRight size={16} className="mx-1 text-gray-400 dark:text-gray-600 flex-shrink-0" />
            )}

            {path.map((segment, index) => (
                <React.Fragment key={index}>
                    <button
                        onClick={() => onNavigate(index)}
                        className="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm whitespace-nowrap flex-shrink-0"
                    >
                        {segment}
                    </button>
                    {index < path.length - 1 && (
                        <ChevronRight size={16} className="mx-1 text-gray-400 dark:text-gray-600 flex-shrink-0" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;