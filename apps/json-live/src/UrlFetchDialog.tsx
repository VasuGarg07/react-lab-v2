import { useState } from 'react';
import { useFetchJson } from './useFetchJson';

interface UrlFetchDialogProps {
    onJsonLoaded: (json: string) => void;
    onClose: () => void;
}

export default function UrlFetchDialog({ onJsonLoaded, onClose }: UrlFetchDialogProps) {
    const [url, setUrl] = useState('');
    const { isLoading, error, fetchJson, clearError } = useFetchJson();

    const handleSubmit = async () => {
        const data = await fetchJson(url);
        if (data) {
            onJsonLoaded(data);
            handleClose();
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            onClose();
            setUrl('');
            clearError();
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Load External URL
            </h2>

            <div>
                <label
                    htmlFor="url-input"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                    URL
                </label>
                <input
                    id="url-input"
                    type="url"
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); clearError(); }}
                    placeholder="https://api.example.com/data"
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg
                        bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100
                        focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0 focus:border-blue-500
                        placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-200"
                    disabled={isLoading}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                {error && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
            </div>

            <div className="flex items-center justify-between text-sm">
                <button
                    type="button"
                    onClick={() => { setUrl('https://jsonplaceholder.typicode.com/posts/1'); clearError(); }}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300
                        transition-all duration-200 underline focus:outline-none focus:ring-2 focus:ring-blue-500/30
                        focus:ring-offset-0 rounded px-1"
                    disabled={isLoading}
                >
                    Sample URL
                </button>
                <button
                    type="button"
                    onClick={() => { setUrl(''); clearError(); }}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300
                        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30
                        focus:ring-offset-0 rounded px-1"
                    disabled={isLoading}
                >
                    Clear
                </button>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300
                        hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0
                        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!url.trim() || isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700
                        dark:bg-emerald-700 dark:hover:bg-emerald-800 rounded-lg transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-0 shadow-sm"
                >
                    {isLoading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    )}
                    Submit
                </button>
            </div>
        </div>
    );
}
