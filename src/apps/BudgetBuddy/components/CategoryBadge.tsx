import { CATEGORY_COLORS } from '../helpers/expense.constants';

interface CategoryBadgeProps {
    category: string;
    className?: string;
}

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
    const color = CATEGORY_COLORS[category] || '#6b7280';

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 ${className}`}
        >
            {/* Color indicator dot */}
            <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
                aria-hidden="true"
            />
            {category}
        </span>
    );
}
