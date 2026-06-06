import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { SAMPLE_INPUT } from './sample';
import { toastService, markdownToHtml } from '@react-lab/shared';
import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

const iconFilter = 'brightness(0) saturate(100%) invert(98%) sepia(2%) saturate(200%) hue-rotate(200deg) brightness(120%)';

export default function MarkdownLive() {
    const [markdown, setMarkdown] = useState(SAMPLE_INPUT);
    const htmlContent = markdownToHtml(markdown);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            toastService.info('Copied to clipboard');
        } catch {
            toastService.error('Failed to copy');
        }
    };

    const downloadMarkdown = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="h-dvh flex flex-col bg-snow">

            {/* Header */}
            <header className="shrink-0 bg-indigo border-b border-indigo">
                <div className="px-4 sm:px-6 h-13 flex items-center justify-between">
                    <h1 className="text-sm font-bold tracking-tight text-white">
                        Markdown Live
                    </h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={copyToClipboard}
                            title="Copy markdown"
                            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-xs font-semibold bg-banana text-indigo hover:opacity-85 transition-opacity"
                        >
                            <Copy size={13} />
                            <span className="hidden sm:inline">Copy</span>
                        </button>
                        <button
                            onClick={downloadMarkdown}
                            title="Download .md"
                            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-xs font-semibold bg-fizz text-indigo hover:opacity-85 transition-opacity"
                        >
                            <Download size={13} />
                            <span className="hidden sm:inline">Download</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Split panes */}
            <div className="flex flex-col lg:flex-row flex-1 min-h-0">

                {/* Editor */}
                <div className="flex flex-col w-full lg:w-1/2 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-aqua/50">
                    <div className="shrink-0 px-4 py-2 border-b border-aqua/40 bg-snow">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-indigo/40">Editor</span>
                    </div>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="flex-1 w-full p-4 bg-snow resize-none focus:outline-none text-sm leading-relaxed text-indigo placeholder:text-indigo/30"
                        style={{
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            caretColor: '#FF66D8',
                        }}
                        placeholder="Type your markdown here..."
                        spellCheck={false}
                    />
                </div>

                {/* Preview */}
                <div className="flex flex-col w-full lg:w-1/2 h-1/2 lg:h-full bg-snow">
                    <div className="shrink-0 px-4 py-2 border-b border-aqua/40">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-indigo/40">Preview</span>
                    </div>
                    <div
                        className="markdown flex-1 overflow-y-auto px-8 py-6"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>

            </div>

            {/* Footer */}
            <footer className="shrink-0 bg-indigo border-t border-indigo px-4 sm:px-6 py-2.5 flex items-center justify-between">
                <p className="text-xs text-white/60">
                    © {new Date().getFullYear()} Vasu Garg
                </p>
                <div className="flex items-center gap-0.5">
                    {SOCIALS.map(({ href, icon, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                            className="w-7 h-7 rounded-md flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/10 transition-all"
                        >
                            <img src={icon} alt={label} className="w-3.5 h-3.5" style={{ filter: iconFilter }} />
                        </a>
                    ))}
                </div>
            </footer>

        </div>
    );
}
