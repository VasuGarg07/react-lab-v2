import { useEffect, useRef, useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { useModal } from '@react-lab/ui';

interface ShareDialogProps {
    formTitle: string;
    shareUrl: string;
}

export default function ShareDialog({ formTitle, shareUrl }: ShareDialogProps) {
    const { close } = useModal();
    const [copied, setCopied] = useState(false);
    const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fullUrl = `${window.location.origin}/formlyst/fill/${shareUrl}`;

    useEffect(() => {
        return () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current); };
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    };

    const handleOpen = () => {
        window.open(fullUrl, '_blank');
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Share Form
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
                Share "{formTitle}" with others using this link
            </p>

            {/* URL Display */}
            <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg mb-5">
                <input
                    type="text"
                    value={fullUrl}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-neutral-700 dark:text-neutral-300 outline-none truncate"
                />
                <button
                    onClick={handleCopy}
                    className={`
                        shrink-0 p-2 rounded-md transition-all duration-200
                        ${copied
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                            : 'hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                        }
                    `}
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={close}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                    Close
                </button>
                <button
                    onClick={handleOpen}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                    Open Form
                </button>
            </div>
        </div>
    );
}