import { useState } from "react";
import { Box, Button, CircularProgress, Typography, IconButton, Stack } from "@mui/joy";
import { Upload, X } from "lucide-react";
import { CONFIG } from "../../../shared/config";

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
        <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box sx={{ flex: 1, position: "relative" }}>
                {!previewUrl && !uploading ? (
                    <Button
                        component="label"
                        variant="outlined"
                        color="neutral"
                        startDecorator={<Upload size={18} />}
                        sx={{
                            width: "100%",
                            height: "120px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            border: "2px dashed",
                            borderRadius: "md",
                            "--Button-gap": "1rem",
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            style={{ display: "none" }}
                        />
                        <Typography level="body-sm">
                            Drop an image here or click to upload
                        </Typography>
                        <Typography level="body-xs" color="neutral">
                            Supported formats: JPG, PNG, GIF
                        </Typography>
                    </Button>
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            height: "120px",
                            position: "relative",
                            borderRadius: "md",
                            overflow: "hidden",
                        }}
                    >
                        {previewUrl && (
                            <>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                <IconButton
                                    size="sm"
                                    variant="solid"
                                    color="danger"
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                    }}
                                    onClick={handleClearImage}
                                >
                                    <X size={14} />
                                </IconButton>
                            </>
                        )}
                        {uploading && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <CircularProgress size="sm" color="primary" />
                            </Box>
                        )}
                    </Box>
                )}
                {error && (
                    <Typography
                        level="body-sm"
                        color="danger"
                        sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}
                    >
                        {error}
                    </Typography>
                )}
            </Box>

            {/* Existing image preview */}
            {existingUrl && !previewUrl && !uploading && (
                <Box
                    sx={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "md",
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <img
                        src={existingUrl}
                        alt="Current cover"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            )}
        </Stack>
    );
};

export default UploadImage;