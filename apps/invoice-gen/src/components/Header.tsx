import { FileText } from 'lucide-react';

export const Header = () => (
    <header className="border-b border-hairline bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
            <a href="/" className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-bronze text-card">
                    <FileText size={18} strokeWidth={2.25} />
                </span>
                <span className="font-display text-xl font-600 tracking-tight text-ink">
                    Invoice <span className="text-bronze">Studio</span>
                </span>
            </a>
            <a
                href="https://github.com/vasugarg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
                Vasu Garg Labs
            </a>
        </div>
    </header>
);
