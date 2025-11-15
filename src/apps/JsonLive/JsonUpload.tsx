import { Upload } from 'lucide-react';
import { useRef } from 'react';

const MAX_FILE_SIZE_MB = 2;

interface JsonUploadProps {
    className?: string;
    disabled?: boolean;
    onJsonLoaded: (json: string) => void;
    onError: (error: string) => void;
    onLoadingChange: (loading: boolean) => void;
}

const JsonUpload = ({
    className = '',
    disabled = false,
    onJsonLoaded,
    onError,
    onLoadingChange
}: JsonUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        event.target.value = '';

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            onError(`File too large. Max size is ${MAX_FILE_SIZE_MB}MB. Your file is ${fileSizeMB.toFixed(2)}MB.`);
            return;
        }

        if (!file.name.toLowerCase().endsWith('.json')) {
            onError('Please select a JSON file (.json extension)');
            return;
        }

        onLoadingChange(true);
        onError('');

        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target?.result as string;
            if (content) {
                onJsonLoaded(content);
            }
            onLoadingChange(false);
        };

        reader.onerror = () => {
            onError('Failed to read file. Please try again.');
            onLoadingChange(false);
        };

        reader.readAsText(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <button
                type="button"
                onClick={handleButtonClick}
                disabled={disabled}
                className={`
                    inline-flex items-center justify-center gap-2 
                    px-4 py-2 text-sm font-medium rounded-lg 
                    border border-neutral-300 dark:border-neutral-700
                    bg-white dark:bg-neutral-800 
                    text-neutral-700 dark:text-neutral-300
                    hover:bg-neutral-50 dark:hover:bg-neutral-700
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                    ${className}
                `}
                title="Upload JSON file"
            >
                <Upload size={16} />
                <span>Upload JSON</span>
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
                disabled={disabled}
            />
        </>
    );
};

export default JsonUpload;