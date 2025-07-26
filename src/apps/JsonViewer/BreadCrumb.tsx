import { ChevronRight, Home } from "lucide-react";
import { useJsonViewerStore } from "./json.store";
import { Fragment } from "react";

const Breadcrumb: React.FC = () => {
    // Use separate selectors to avoid object creation on each render
    const currentPath = useJsonViewerStore(state => state.currentPath);
    const navigateToBreadcrumb = useJsonViewerStore(state => state.navigateToBreadcrumb);

    return (
        <div className="flex items-center p-4 border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
            <button
                onClick={() => navigateToBreadcrumb(-1)}
                className="mr-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 flex-shrink-0"
                title="Go to root"
            >
                <Home size={20} />
            </button>

            {currentPath.length > 0 && (
                <ChevronRight size={20} className="mx-1 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            )}

            {currentPath.map((segment, index) => (
                <Fragment key={index}>
                    <button
                        onClick={() => navigateToBreadcrumb(index)}
                        className="px-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm whitespace-nowrap flex-shrink-0"
                        title={`Navigate to ${segment}`}
                    >
                        {segment}
                    </button>
                    {index < currentPath.length - 1 && (
                        <ChevronRight size={20} className="mx-1 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;