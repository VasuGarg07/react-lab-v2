import { CATEGORY_COLORS } from '../helpers/expense.constants';

interface CategoryBadgeProps {
    category: string;
    className?: string;
}

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
    const color = CATEGORY_COLORS[category] || '#6b7280';

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            {category}
        </span>
    );
}
