import { Link } from 'react-router';
import { Sparkles } from 'lucide-react';
import { UserMenu } from '@react-lab/auth';

interface AppHeaderProps {
    /** Optional center/right content (e.g. page actions). */
    children?: React.ReactNode;
}

export default function AppHeader({ children }: AppHeaderProps) {
    return (
        <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-canvas/85 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
                    <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-ink text-white shadow-sm">
                        <Sparkles className="w-4 h-4" strokeWidth={2.25} />
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight text-ink">
                        Formlyst
                    </span>
                </Link>
                {children && <div className="flex items-center gap-2 min-w-0">{children}</div>}
                <div className="flex items-center shrink-0">
                    <UserMenu accentColor="#1768AC" accentFg="#FFFFFF" />
                </div>
            </div>
        </header>
    );
}
