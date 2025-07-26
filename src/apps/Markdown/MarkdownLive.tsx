import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { SAMPLE_INPUT } from './sample';
import { marked } from 'marked';
import { toastService } from '@/shared/toastr';

function MarkdownPreviewer() {
    const [markdown, setMarkdown] = useState(SAMPLE_INPUT);

    const convertMarkdownToHtml = (text: string) => {
        return marked(text, {
            gfm: true,
            breaks: true,
        });
    };

    const htmlContent = convertMarkdownToHtml(markdown);

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
        <div className="relative w-full">
            {/* Header */}
            <header className=" border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 flex items-center justify-between">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Markdown Live Preview
                </h1>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center px-2 sm:px-3 py-2 gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
                    >
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                    </button>
                    <button
                        onClick={downloadMarkdown}
                        className="flex items-center px-2 sm:px-3 py-2 gap-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm font-medium"
                    >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                    </button>
                </div>
            </header>

            {/* Main Content - Split View */}
            <div className="flex flex-col lg:flex-row h-[calc(100vh-124px)]">
                {/* Editor Pane */}
                <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 h-1/2 lg:h-full">
                    <div className="h-full flex flex-col">
                        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Markdown Editor
                        </div>
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className="flex-1 w-full p-4 sm:p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:outline-none font-mono text-sm leading-relaxed border-none"
                            placeholder="Type your markdown here..."
                        />
                    </div>
                </div>

                {/* Preview Pane */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full">
                    <div className="h-full flex flex-col">
                        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Preview
                        </div>
                        <div
                            className="prose dark:prose-invert max-w-none p-4 sm:p-6 bg-white dark:bg-gray-900 overflow-auto"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarkdownPreviewer;