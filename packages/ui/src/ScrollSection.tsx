import { ChevronRight } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link } from 'react-router';

interface ScrollSectionProps {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    actionHref?: string;
    children: ReactNode;
    itemWidth?: string;
}

export function ScrollSection({
    title,
    subtitle,
    actionLabel,
    actionHref,
    children,
    itemWidth = 'w-40',
}: ScrollSectionProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-lg text-stone-900 dark:text-stone-100">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                            {subtitle}
                        </p>
                    )}
                </div>
                {actionLabel && actionHref && (
                    <Link
                        to={actionHref}
                        className="text-xs text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 flex items-center gap-0.5 shrink-0 transition-colors"
                    >
                        {actionLabel}
                        <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                )}
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {Array.isArray(children)
                    ? children.map((child, i) => (
                        <div key={i} className={`${itemWidth} shrink-0`}>
                            {child}
                        </div>
                    ))
                    : <div className={`${itemWidth} shrink-0`}>{children}</div>
                }
            </div>
        </section>
    );
}