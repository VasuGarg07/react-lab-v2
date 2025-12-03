import { ChevronRight } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link } from 'react-router';

interface ScrollSectionProps {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    actionHref?: string;
    children: ReactNode;
}

export default function ScrollSection({
    title,
    subtitle,
    actionLabel,
    actionHref,
    children,
}: ScrollSectionProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {subtitle}
                        </p>
                    )}
                </div>
                {actionLabel && actionHref && (
                    <Link
                        to={actionHref}
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 shrink-0 transition-colors"
                    >
                        {actionLabel}
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                )}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
                {children}
            </div>
        </section>
    );
}