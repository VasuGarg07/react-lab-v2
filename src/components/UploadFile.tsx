import { useState } from 'react';
import { File, Loader2, Plus, X } from 'lucide-react';
import { CONFIG } from '@/shared/config';

interface FileUploaderProps {
    onUpload: (url: string) => void;
    onRemove?: () => void;
    fileUrl?: string;
    label: string;
    acceptedTypes?: string;
    helperText?: string;
}

const FileUploader = ({
    onUpload,
    onRemove,
    fileUrl,
    label,
    acceptedTypes = '.pdf',
    helperText = 'only pdf',
}: FileUploaderProps) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        if (e.type === 'dragleave') setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
        if (!acceptedTypes.includes(ext)) {
            setError(`Invalid file type. Please upload ${helperText}`);
            return;
        }

        handleFileUpload(file);
    };

    const handleFileUpload = async (file: File) => {
        setUploading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('UPLOADCARE_PUB_KEY', CONFIG.UPLOADCARE_PUBLIC_KEY);

            const res = await fetch('https://upload.uploadcare.com/base/', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.file) onUpload(`https://ucarecdn.com/${data.file}/`);
            else throw new Error('Upload failed');
        } catch (err) {
            console.error(err);
            setError('Failed to upload file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        onRemove?.();
    };

    const getFileName = (url: string) => url.split('/').pop() || url;

    return (
        <label
            className={`block w-full border-2 border-dashed rounded-md transition-all cursor-pointer ${dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-zinc-800'
                    : 'border-gray-300 dark:border-zinc-600'
                } hover:border-blue-500`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept={acceptedTypes}
                onChange={handleFileSelect}
                className="hidden"
            />

            <div className="flex items-center gap-3 px-4 py-3">
                {fileUrl ? (
                    <>
                        <File className="text-gray-600 dark:text-gray-300" size={20} />
                        <p className="text-sm truncate flex-1 dark:text-white">{getFileName(fileUrl)}</p>
                        <button onClick={handleRemove} className="text-red-500 hover:text-red-700">
                            <X size={20} />
                        </button>
                    </>
                ) : (
                    <>
                        <Plus className="text-gray-500 dark:text-gray-300" size={20} />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Browse file or drop here, {helperText}
                            </p>
                        </div>
                        {uploading && <Loader2 size={20} className="animate-spin text-blue-500" />}
                    </>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500 px-4 pb-2">{error}</p>
            )}
        </label>
    );
};

export default FileUploader;
