import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

interface ShelfProps {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    actionHref?: string;
    children: ReactNode;
}

/**
 * A titled shelf: a row of notebook volumes resting on a wooden shelf rule.
 * Volumes scroll horizontally on small screens, settle into a row on wide ones.
 */
export default function Shelf({ title, subtitle, actionLabel, actionHref, children }: ShelfProps) {
    return (
        <section>
            <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                    <h2 className="font-serif text-xl font-semibold text-stone-900 leading-tight">{title}</h2>
                    {subtitle && <p className="text-sm text-stone-500 mt-0.5">{subtitle}</p>}
                </div>
                {actionLabel && actionHref && (
                    <Link
                        to={actionHref}
                        className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-navy hover:gap-2 transition-all"
                    >
                        {actionLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                )}
            </div>

            <div className="relative">
                <div className="flex gap-5 overflow-x-auto pb-4 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {children}
                </div>
                <div className="shelf-rule -mt-2" />
            </div>
        </section>
    );
}
