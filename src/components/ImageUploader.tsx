import { useState } from 'react';
import { X, ImageIcon, Loader2 } from 'lucide-react';

const UPLOAD_KEY = import.meta.env.VITE_IMGBB_API_KEY;

interface ImageUploaderProps {
    onUpload: (url: string) => void;
    existingUrl?: string;
    aspectRatio?: 'square' | 'video' | 'wide' | 'portrait';
    maxSizeMB?: number;
    label?: string;
    helperText?: string;
    showPreview?: boolean;
    disabled?: boolean;
    className?: string;
}

export default function ImageUploader({
    onUpload,
    existingUrl,
    aspectRatio = 'video',
    maxSizeMB = 5,
    label,
    helperText,
    showPreview = true,
    disabled = false,
    className = '',
}: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(existingUrl || null);
    const [error, setError] = useState<string | null>(null);

    // Aspect ratio classes
    const aspectRatioClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        wide: 'aspect-21/9',
        portrait: 'aspect-3/4',
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setError(null);

        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            setError(`Image size must be less than ${maxSizeMB}MB`);
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload image
        handleImageUpload(file);
    };

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${UPLOAD_KEY}`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.success) {
                onUpload(data.data.url);
                setPreviewUrl(data.data.url);
            } else {
                setError('Failed to upload image. Please try again.');
                setPreviewUrl(null);
            }
        } catch (error) {
            console.error('Image upload error:', error);
            setError('An error occurred while uploading. Please try again.');
            setPreviewUrl(null);
        } finally {
            setUploading(false);
        }
    };

    const handleClearImage = () => {
        setPreviewUrl(null);
        setError(null);
        onUpload('');
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {label}
                </label>
            )}

            {/* Upload Area */}
            <div className="relative">
                {!previewUrl && !uploading ? (
                    // Empty state - Upload prompt
                    <label
                        className={`
              ${aspectRatioClasses[aspectRatio]} w-full
              flex flex-col items-center justify-center gap-3
              border-2 border-dashed rounded-lg
              cursor-pointer transition-all duration-200
              ${disabled
                                ? 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 cursor-not-allowed opacity-60'
                                : 'border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 bg-white dark:bg-neutral-800'
                            }
            `}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            disabled={disabled || uploading}
                            className="hidden"
                        />

                        <div className="flex flex-col items-center gap-2 text-center px-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-neutral-500 dark:text-neutral-400" />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                    {helperText || `PNG, JPG, GIF up to ${maxSizeMB}MB`}
                                </p>
                            </div>
                        </div>
                    </label>
                ) : (
                    // Preview state
                    <div className={`${aspectRatioClasses[aspectRatio]} w-full relative rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700`}>
                        {showPreview && previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Loading overlay */}
                        {uploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                                    <p className="text-sm text-white font-medium">Uploading...</p>
                                </div>
                            </div>
                        )}

                        {/* Clear button */}
                        {!uploading && previewUrl && (
                            <button
                                type="button"
                                onClick={handleClearImage}
                                disabled={disabled}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 disabled:opacity-50"
                                aria-label="Remove image"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Error message */}
            {error && (
                <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <span>⚠</span> {error}
                </p>
            )}

            {/* Helper text when not in error state */}
            {!error && !label && helperText && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {helperText}
                </p>
            )}
        </div>
    );
}
