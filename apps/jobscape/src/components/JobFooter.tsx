import { Briefcase } from 'lucide-react';

export default function JobFooter() {
    return (
        <footer className="border-t border-neutral-200/70 bg-sand/40">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Briefcase className="h-4 w-4 text-spruce" strokeWidth={2.25} />
                    <span className="font-display font-semibold text-ink">Jobscape</span>
                    <span className="text-neutral-300">·</span>
                    <span>Where work finds people.</span>
                </div>
                <p className="text-xs text-neutral-400">© {new Date().getFullYear()} Vasu Garg</p>
            </div>
        </footer>
    );
}
