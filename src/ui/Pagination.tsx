import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    // Calculate which page numbers to show
    const getPageNumbers = () => {
        // For small number of pages, show all
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // For larger number of pages, show current page with neighbors and ellipsis
        let pages = [1];

        if (currentPage > 3) {
            pages.push(-1); // Represent ellipsis
        }

        // Add pages around current page
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push(-2); // Represent ellipsis
        }

        pages.push(totalPages);

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="flex justify-center items-center space-x-1" aria-label="Pagination">
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                aria-label="Previous page"
            >
                ‹
            </button>

            {pageNumbers.map((pageNumber, index) => (
                pageNumber < 0 ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-slate-500">...</span>
                ) : (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`px-3 py-2 rounded-md border transition-colors text-sm ${currentPage === pageNumber
                            ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600'
                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                        aria-current={currentPage === pageNumber ? 'page' : undefined}
                    >
                        {pageNumber}
                    </button>
                )
            ))}

            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                aria-label="Next page"
            >
                ›
            </button>
        </nav>
    );
};

export default Pagination;