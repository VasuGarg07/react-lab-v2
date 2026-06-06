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
        <div className="h-dvh flex flex-col" style={{ backgroundColor: '#0d1117' }}>

            {/* Header — branding left, actions right */}
            <header className="shrink-0 border-b" style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}>
                <div className="px-4 sm:px-6 h-13 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: '#484f58' }}>React Lab</span>
                        <span style={{ color: '#30363d' }}>·</span>
                        <h1 className="text-sm font-bold" style={{ color: '#e6edf3' }}>Markdown Live</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                            style={{ backgroundColor: '#21262d', color: '#58a6ff', border: '1px solid #30363d' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#30363d')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#21262d')}
                        >
                            <Copy size={13} /> Copy
                        </button>
                        <button
                            onClick={downloadMarkdown}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                            style={{ backgroundColor: '#21262d', color: '#3fb950', border: '1px solid #30363d' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#30363d')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#21262d')}
                        >
                            <Download size={13} /> Download
                        </button>
                    </div>
                </div>
            </header>

            {/* Split panes */}
            <div className="flex flex-col lg:flex-row flex-1 min-h-0">

                {/* Editor */}
                <div className="flex flex-col w-full lg:w-1/2 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r" style={{ borderColor: '#30363d', backgroundColor: '#0d1117' }}>
                    <div className="shrink-0 flex items-center px-4 py-2 border-b" style={{ borderColor: '#21262d' }}>
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#484f58' }}>Editor</span>
                    </div>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none text-sm leading-relaxed"
                        style={{
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            color: '#c9d1d9',
                            caretColor: '#58a6ff',
                            border: 'none',
                            outline: 'none',
                        }}
                        placeholder="Type your markdown here..."
                        spellCheck={false}
                    />
                </div>

                {/* Preview */}
                <div className="flex flex-col w-full lg:w-1/2 h-1/2 lg:h-full" style={{ backgroundColor: '#161b22' }}>
                    <div className="shrink-0 flex items-center px-4 py-2 border-b" style={{ borderColor: '#21262d' }}>
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#484f58' }}>Preview</span>
                    </div>
                    <div
                        className="markdown flex-1 overflow-y-auto px-8 py-6"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>

            </div>

            {/* Footer — copyright left, socials right */}
            <footer className="shrink-0 border-t px-4 sm:px-6 py-2.5 flex items-center justify-between" style={{ backgroundColor: '#161b22', borderColor: '#30363d' }}>
                <p className="text-xs" style={{ color: '#484f58' }}>© {new Date().getFullYear()} Vasu Garg · React Lab</p>
                <div className="flex items-center gap-0.5">
                    {SOCIALS.map(({ href, icon, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                            className="w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150"
                            style={{ opacity: 0.35 }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.backgroundColor = '#21262d'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '0.35'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            <img src={icon} alt={label} className="w-3.5 h-3.5 invert" />
                        </a>
                    ))}
                </div>
            </footer>

        </div>
    );
}
