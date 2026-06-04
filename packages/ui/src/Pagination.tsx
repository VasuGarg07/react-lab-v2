import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    // Build page numbers: current ±2
    const pages: number[] = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const buttonBaseClasses = `
    w-9 h-9 flex items-center justify-center rounded-lg
    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    const iconButtonClasses = `
    ${buttonBaseClasses}
    bg-neutral-100 dark:bg-neutral-800
    text-neutral-700 dark:text-neutral-300
    hover:bg-neutral-200 dark:hover:bg-neutral-700
  `;

    const pageButtonClasses = (isActive: boolean) => `
    ${buttonBaseClasses}
    text-sm font-medium
    ${isActive
            ? 'bg-blue-600 dark:bg-blue-600 text-white'
            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
        }
  `;

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            {/* First Page */}
            {currentPage > 2 && (
                <button
                    type="button"
                    onClick={() => onPageChange(1)}
                    className={iconButtonClasses}
                    aria-label="First page"
                >
                    <ChevronsLeft className="w-4 h-4" />
                </button>
            )}

            {/* Previous Page */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={iconButtonClasses}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={pageButtonClasses(currentPage === page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {/* Next Page */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={iconButtonClasses}
                aria-label="Next page"
            >
                <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last Page */}
            {currentPage < totalPages - 1 && (
                <button
                    type="button"
                    onClick={() => onPageChange(totalPages)}
                    className={iconButtonClasses}
                    aria-label="Last page"
                >
                    <ChevronsRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
