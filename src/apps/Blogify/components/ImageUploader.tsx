import { useState } from "react";
import { Upload, X } from "lucide-react";
import { CONFIG } from "@/shared/config";

interface UploadImageProps {
    onUpload: (url: string) => void;
    existingUrl?: string;
}

const UploadImage = ({ onUpload, existingUrl }: UploadImageProps) => {
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setError(null);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            handleImageUpload(file);
        }
    };

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        setError(null);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${CONFIG.IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();

            if (data.success) {
                onUpload(data.data.url);
            } else {
                setError("Failed to upload image. Please try again.");
                setPreviewUrl(null);
            }
        } catch (error) {
            console.error("Image upload error:", error);
            setError("An error occurred while uploading. Please try again.");
            setPreviewUrl(null);
        } finally {
            setUploading(false);
        }
    };

    const handleClearImage = () => {
        setPreviewUrl(null);
        setError(null);
    };

    return (
        <div className="flex flex-row items-start gap-2">
            <div className="flex-1 relative">
                {!previewUrl && !uploading ? (
                    <label className="w-full h-[120px] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                        />
                        <Upload size={18} className="text-gray-500 dark:text-gray-400" />
                        <div className="text-center">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Drop an image here or click to upload
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Supported formats: JPG, PNG, GIF
                            </p>
                        </div>
                    </label>
                ) : (
                    <div className="w-full h-[120px] relative rounded-md overflow-hidden">
                        {previewUrl && (
                            <>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    onClick={handleClearImage}
                                >
                                    <X size={14} />
                                </button>
                            </>
                        )}
                        {uploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                )}
                {error && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        {error}
                    </p>
                )}
            </div>

            {/* Existing image preview */}
            {existingUrl && !previewUrl && !uploading && (
                <div className="w-[120px] h-[120px] rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                        src={existingUrl}
                        alt="Current cover"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </div>
    );
};

export default UploadImage;