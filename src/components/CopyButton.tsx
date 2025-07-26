
import { Copy, Check } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { cn } from '@/shared/cn';
import { copyToClipboard } from '@/shared/utilities';

interface CopyButtonProps {
    value: any;
    size?: number;
    className?: string;
    title?: string;
    showFeedback?: boolean;
    feedbackDuration?: number;
    onCopySuccess?: () => void;
    onCopyError?: (error: string) => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({
    value,
    size = 12,
    className,
    title = "Copy to clipboard",
    showFeedback = true,
    feedbackDuration = 1000,
    onCopySuccess,
    onCopyError,
}) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCopy = useCallback(async (event?: React.MouseEvent) => {
        event?.stopPropagation();

        if (isLoading || isCopied) return;

        setIsLoading(true);

        try {
            const textToCopy = typeof value === 'string' ? value : JSON.stringify(value);
            const success = await copyToClipboard(textToCopy);

            if (success) {
                if (showFeedback) {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), feedbackDuration);
                }
                onCopySuccess?.();
            } else {
                onCopyError?.('Failed to copy to clipboard');
            }
        } catch (error) {
            onCopyError?.(error instanceof Error ? error.message : 'Copy failed');
        } finally {
            setIsLoading(false);
        }
    }, [value, isLoading, isCopied, showFeedback, feedbackDuration, onCopySuccess, onCopyError]);

    const buttonTitle = isCopied ? 'Copied!' : title;
    const IconComponent = isCopied ? Check : Copy;

    return (
        <button
            type="button"
            onClick={handleCopy}
            disabled={isLoading}
            className={cn(
                "transition-all duration-200 focus:outline-none",
                "hover:scale-110 active:scale-95",
                isCopied
                    ? "text-green-500 dark:text-green-400"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            title={buttonTitle}
            aria-label={buttonTitle}
        >
            <IconComponent
                size={size}
                className={cn(
                    "transition-transform duration-200",
                    isCopied && "animate-in zoom-in-75"
                )}
            />
        </button>
    );
};

export default React.memo(CopyButton);

