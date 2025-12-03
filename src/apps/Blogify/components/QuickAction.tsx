import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

interface QuickActionProps {
    icon: LucideIcon;
    label: string;
    sublabel: string;
    to: string;
}

export default function QuickAction({ icon: Icon, label, sublabel, to }: QuickActionProps) {
    return (
        <Link
            to={to}
            className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm transition-all duration-200 group"
        >
            <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">{label}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{sublabel}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400 dark:text-neutral-500 group-hover:translate-x-1 transition-transform" />
        </Link>
    );
}