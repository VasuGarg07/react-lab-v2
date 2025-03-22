import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { CONFIG } from '@/shared/config';
import { toastService } from '@/shared/toastr';

interface UploadImageProps {
    onUpload: (url: string) => void;
    onRemove?: () => void;
    imageUrl?: string;
    width?: number;
    height?: number;
}

const UploadImage = ({
    onUpload,
    onRemove,
    imageUrl,
    width = 400,
    height = 400,
}: UploadImageProps) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            toastService.error('Image size should be less than 2MB');
            return;
        }
        handleImageUpload(file);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        } else {
            toastService.error('Please drop an image file');
        }
    };

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${CONFIG.IMGBB_API_KEY}`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const data = await response.json();
            if (data.success) {
                onUpload(data.data.url);
            } else {
                toastService.error('Failed to upload image');
            }
        } catch {
            toastService.error('Upload failed. Please try again');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ width, height }}>
            <label
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative w-full h-full border-2 border-dashed rounded-md flex items-center justify-center transition-colors cursor-pointer ${dragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-zinc-800'
                        : 'border-gray-300 dark:border-zinc-600'
                    } hover:border-blue-500`}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                />

                {imageUrl ? (
                    <div className="relative w-full h-full">
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded-md"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onRemove?.();
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center gap-1 px-4">
                        <Upload size={24} className="text-gray-500 dark:text-gray-300" />
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                            Browse photo or drop here
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            A photo larger than 400px works best. Max size 2MB.
                        </p>
                    </div>
                )}

                {uploading && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-md">
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </label>
        </div>
    );
};

export default UploadImage;
