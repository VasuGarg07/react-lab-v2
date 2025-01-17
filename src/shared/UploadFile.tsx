import { Box, Typography } from "@mui/joy";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { CONFIG } from "./config";

interface FileUploaderProps {
    onUpload: (url: string) => void;
    onRemove?: () => void;
    fileUrl?: string;
    label: string;
    acceptedTypes?: string;    // e.g. ".pdf,.doc,.docx"
    helperText?: string;      // e.g. "only pdf"
}

const FileUploader = ({
    onUpload,
    onRemove,
    fileUrl,
    label,
    acceptedTypes = ".pdf",
    helperText = "only pdf"
}: FileUploaderProps) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        handleFileUpload(file);
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

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        // Check if file type matches accepted types
        const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
        if (!acceptedTypes.includes(fileExtension)) {
            setError(`Invalid file type. Please upload ${helperText}`);
            return;
        }

        handleFileUpload(file);
    };

    const handleFileUpload = async (file: File) => {
        setUploading(true);
        setError(null);

        try {
            // Replace this with your Uploadcare API implementation
            const formData = new FormData();
            formData.append('file', file);
            formData.append('UPLOADCARE_PUB_KEY', CONFIG.UPLOADCARE_PUBLIC_KEY);

            const response = await fetch('https://upload.uploadcare.com/base/', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.file) {
                onUpload(`https://ucarecdn.com/${data.file}/`);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('File upload error:', error);
            setError('Failed to upload file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onRemove) {
            onRemove();
        }
    };

    const getFileName = (url: string) => {
        // Extract filename from URL or return truncated URL
        const segments = url.split('/');
        return segments[segments.length - 1] || url;
    };

    return (
        <Box
            component="label"
            sx={{
                width: '100%',
                cursor: 'pointer',
                borderRadius: 'md',
                border: '1px dashed',
                borderColor: dragActive ? 'primary.500' : 'neutral.outlinedBorder',
                bgcolor: dragActive ? 'background.level1' : 'transparent',
                transition: 'all 0.2s',
                '&:hover': {
                    borderColor: 'primary.500',
                    bgcolor: 'background.level1'
                }
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept={acceptedTypes}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />

            <Box sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
            }}>
                {fileUrl ? (
                    <>
                        <Plus size={20} style={{ transform: 'rotate(45deg)' }} />
                        <Typography level="body-sm" sx={{ flex: 1 }}>
                            {getFileName(fileUrl)}
                        </Typography>
                        <Box
                            component="button"
                            onClick={handleRemove}
                            sx={{
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                p: 0,
                                display: 'flex'
                            }}
                        >
                            <X size={20} />
                        </Box>
                    </>
                ) : (
                    <>
                        <Plus size={20} />
                        <Box sx={{ flex: 1 }}>
                            <Typography level="body-sm">
                                {label}
                            </Typography>
                            <Typography level="body-xs" color="neutral">
                                Browse file or drop here, {helperText}
                            </Typography>
                        </Box>
                        {uploading && <Loader2 size={20} className="animate-spin" />}
                    </>
                )}
            </Box>

            {error && (
                <Typography
                    level="body-sm"
                    color="danger"
                    sx={{ mt: 1, px: 2, pb: 2 }}
                >
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default FileUploader;