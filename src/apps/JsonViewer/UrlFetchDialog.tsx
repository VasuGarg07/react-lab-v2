import { useState } from 'react';
import { Dialog } from '@/ui/Dialog';

interface UrlFetchDialogProps {
    open: boolean;
    onClose: () => void;
    onJsonLoaded: (json: string) => void;
    onError: (error: string) => void;
    onLoadingChange: (loading: boolean) => void;
}

const UrlFetchDialog: React.FC<UrlFetchDialogProps> = ({
    open,
    onClose,
    onJsonLoaded,
    onError,
    onLoadingChange
}) => {
    const [url, setUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!url.trim()) {
            onError('Please enter a valid URL');
            return;
        }

        setIsSubmitting(true);
        onLoadingChange(true);

        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                },
                signal: AbortSignal.timeout(10000), // 10 second timeout
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.text();

            // Try to parse as JSON to validate
            try {
                JSON.parse(data);
                onJsonLoaded(data);
                handleClose();
            } catch {
                onError('Response is not valid JSON');
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'TimeoutError') {
                    onError('Request timeout. Please try again.');
                } else if (error.message.includes('Failed to fetch')) {
                    onError('Network error. Please check your connection and CORS settings.');
                } else {
                    onError(error.message);
                }
            } else {
                onError('An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false);
            onLoadingChange(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            onClose();
            setUrl('');
        }
    };

    const handleSampleUrl = () => {
        setUrl('https://jsonplaceholder.typicode.com/posts/1');
    };

    const handleClear = () => {
        setUrl('');
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            title="Load External URL"
            size="md"
            className="sm:max-w-lg"
        >
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="url-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        URL
                    </label>
                    <input
                        id="url-input"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://api.example.com/data"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                     bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-slate-400 dark:placeholder-slate-500"
                        disabled={isSubmitting}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                </div>

                <div className="flex items-center justify-between text-sm">
                    <button
                        type="button"
                        onClick={handleSampleUrl}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                     transition-colors underline"
                        disabled={isSubmitting}
                    >
                        Sample URL
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 
                     transition-colors"
                        disabled={isSubmitting}
                    >
                        Clear
                    </button>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 
                     hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!url.trim() || isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
                     dark:bg-emerald-700 dark:hover:bg-emerald-800 rounded-md transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {isSubmitting && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        )}
                        Submit
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default UrlFetchDialog;