import { useState } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/joy";
import { Upload, X } from "lucide-react";
import { CONFIG } from "../../../shared/config";
import { ErrorMessage } from "../../../components/ErrorMessage";

interface UploadImageProps {
    onUpload: (url: string) => void;
    onRemove?: () => void;  // Added to handle image removal
    imageUrl?: string;      // Changed from existingUrl to imageUrl for clarity
    width?: number;         // Optional width/height props for customization
    height?: number;
}

const UploadImage = ({
    onUpload,
    onRemove,
    imageUrl,
    width = 400,
    height = 400
}: UploadImageProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (file.size > 2 * 1024 * 1024) { // 2MB
            setError("Image size should be less than 2MB");
            return;
        }

        handleImageUpload(file);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        } else {
            setError("Please drop an image file");
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
                setError("Failed to upload image");
            }
        } catch (error) {
            setError("Upload failed. Please try again");
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        if (onRemove) {
            onRemove();
        }
    };

    return (
        <Box sx={{ width: width, height: height }}>
            <Box
                component="label"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed',
                    bgcolor: dragActive ? 'background.level1' : 'transparent',
                    borderColor: dragActive ? 'primary.500' : 'neutral.outlinedBorder',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s',
                    '&:hover': {
                        borderColor: 'primary.500',
                        bgcolor: 'background.level1'
                    }
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                />

                {imageUrl ? (
                    // Image view state
                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                        <IconButton
                            size="sm"
                            variant="solid"
                            color="danger"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRemove();
                            }}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                            }}
                        >
                            <X size={14} />
                        </IconButton>
                    </Box>
                ) : (
                    // Empty state
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <Upload size={24} />
                        <Typography level="body-sm">
                            Browse photo or drop here
                        </Typography>
                        <Typography level="body-xs" color="neutral">
                            A photo larger than 400 pixels work best. Max photo size 2 MB.
                        </Typography>
                    </Box>
                )}

                {uploading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 'md'
                        }}
                    >
                        <CircularProgress size="sm" />
                    </Box>
                )}
            </Box>

            {error && <ErrorMessage message={error} />}
        </Box>
    );
};

export default UploadImage;