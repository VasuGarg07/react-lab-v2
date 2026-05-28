import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { SAMPLE_INPUT } from './sample';
import { toastService, markdownToHtml } from '@react-lab/shared';

function MarkdownLive() {
    const [markdown, setMarkdown] = useState(SAMPLE_INPUT);
    const htmlContent = markdownToHtml(markdown);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            toastService.info("Content copied to clipboard!")
        } catch (err) {
            toastService.error("Failed to Copy!")
            console.error('Failed to copy:', err);
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
        <div className="relative w-full h-[calc(100vh-120px)]">
            <div className="flex flex-col lg:flex-row h-full">
                {/* Editor Pane */}
                <div className="relative w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-700 h-1/2 lg:h-full bg-white dark:bg-neutral-900">
                    <div className="absolute top-4 left-4 right-8 z-10 flex items-center justify-between">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                            Editor
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center px-3 py-1.5 gap-1.5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-full transition-colors text-xs font-medium backdrop-blur-sm shadow-sm"
                                title="Copy to clipboard"
                            >
                                <Copy className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Copy</span>
                            </button>
                            <button
                                onClick={downloadMarkdown}
                                className="flex items-center px-3 py-1.5 gap-1.5 bg-green-600/90 hover:bg-green-600 text-white rounded-full transition-colors text-xs font-medium backdrop-blur-sm shadow-sm"
                                title="Download as .md file"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Download</span>
                            </button>
                        </div>
                    </div>

                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="w-full h-full p-4 pt-16 sm:p-6 sm:pt-16 bg-transparent text-neutral-900 dark:text-neutral-100 resize-none focus:outline-none font-mono text-sm leading-relaxed border-none"
                        placeholder="Type your markdown here..."
                    />
                </div>

                {/* Preview Pane */}
                <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full bg-white dark:bg-neutral-900">
                    <div className="absolute top-4 left-4 z-10">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                            Preview
                        </span>
                    </div>

                    <div
                        className="markdown max-w-none p-4 pt-16 sm:p-6 sm:pt-16 h-full overflow-auto"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MarkdownLive;