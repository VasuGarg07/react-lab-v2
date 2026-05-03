type Variant = 'income' | 'expense' | 'neutral';

const VARIANT_STYLES: Record<Variant, { amount: string; bar: string }> = {
    income:  { amount: 'text-emerald-600 dark:text-emerald-400', bar: 'bg-emerald-500' },
    expense: { amount: 'text-red-600 dark:text-red-400',         bar: 'bg-red-500' },
    neutral: { amount: 'text-neutral-900 dark:text-neutral-100', bar: 'bg-neutral-300 dark:bg-neutral-600' },
};

interface BalanceCardProps {
    label: string;
    amount: number;
    variant?: Variant;
    suffix?: string;
    barPct?: number;
}

export default function BalanceCard({ label, amount, variant = 'neutral', suffix, barPct }: BalanceCardProps) {
    const styles = VARIANT_STYLES[variant];

    const formatted = suffix
        ? `${amount.toFixed(1)}${suffix}`
        : new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(Math.abs(amount));

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-sm p-5 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors">
            <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
                {label}
            </p>
            <p className={`text-3xl font-medium tracking-tight ${styles.amount}`}>
                {formatted}
            </p>
            {barPct !== undefined && (
                <div className="mt-4 h-0.5 bg-neutral-100 dark:bg-neutral-700">
                    <div
                        className={`h-0.5 ${styles.bar} transition-all duration-500`}
                        style={{ width: `${Math.min(barPct, 100)}%` }}
                    />
                </div>
            )}
        </div>
    );
}