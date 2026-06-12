import { FileText } from 'lucide-react';

export const Header = () => (
    <header className="border-b border-hairline bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
            <a href="/" className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-card">
                    <FileText size={18} strokeWidth={2.25} />
                </span>
                <span className="font-display text-xl font-semibold tracking-tight text-ink">
                    Invoice <span className="text-accent">Studio</span>
                </span>
            </a>
        </div>
    </header>
);
