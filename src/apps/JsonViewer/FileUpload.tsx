import { Upload } from 'lucide-react';
import { useRef } from 'react';

const MAX_FILE_SIZE_MB = 2; // Limit to 2MB

interface FileUploadProps {
    className?: string;
    disabled?: boolean;
    onJsonLoaded: (json: string) => void;
    onError: (error: string) => void;
    onLoadingChange: (loading: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
    className,
    disabled = false,
    onJsonLoaded,
    onError,
    onLoadingChange
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Reset the input value so the same file can be selected again
        event.target.value = '';

        // Check file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            onError(`File too large. Max allowed size is ${MAX_FILE_SIZE_MB}MB. Your file is ${fileSizeMB.toFixed(2)}MB.`);
            return;
        }

        // Check file type
        if (!file.name.toLowerCase().endsWith('.json')) {
            onError('Please select a JSON file (.json extension)');
            return;
        }

        onLoadingChange(true);
        onError(''); // Clear any previous errors

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
          inline-flex items-center justify-center px-4 py-2 
          text-sm font-medium rounded-md transition-colors
          border border-slate-300 dark:border-slate-600
          bg-white dark:bg-slate-800 
          text-slate-700 dark:text-slate-300
          hover:bg-slate-50 dark:hover:bg-slate-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
                title="Upload JSON file"
            >
                <Upload size={16} className="mr-2" />
                File
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

export default FileUpload;