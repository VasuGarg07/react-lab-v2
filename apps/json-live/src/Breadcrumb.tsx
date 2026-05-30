import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from './store/useRedux';
import { navigateToBreadcrumb } from './store/jsonViewerSlice';

export default function Breadcrumb() {
    const dispatch = useAppDispatch();
    const currentPath = useAppSelector((state) => state.jsonViewer.currentPath);

    return (
        <div className="flex items-center gap-1 p-2 border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto">
            <button
                onClick={() => dispatch(navigateToBreadcrumb(-1))}
                className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-all duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                aria-label="Go to root"
            >
                <Home size={18} />
            </button>

            {currentPath.length > 0 && (
                <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
            )}

            {currentPath.map((segment, index) => (
                <Fragment key={index}>
                    <button
                        onClick={() => dispatch(navigateToBreadcrumb(index))}
                        className="px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium text-sm whitespace-nowrap shrink-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                        aria-label={`Navigate to ${segment}`}
                    >
                        {segment}
                    </button>
                    {index < currentPath.length - 1 && (
                        <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                    )}
                </Fragment>
            ))}
        </div>
    );
}
