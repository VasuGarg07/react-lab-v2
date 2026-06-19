import type { ReactNode } from 'react';

export function FormSection({
    title,
    hint,
    children,
}: {
    title: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card sm:p-6">
            <div className="mb-4">
                <h2 className="font-display text-base font-bold text-ink">{title}</h2>
                {hint && <p className="mt-0.5 text-sm text-neutral-500">{hint}</p>}
            </div>
            {children}
        </section>
    );
}
