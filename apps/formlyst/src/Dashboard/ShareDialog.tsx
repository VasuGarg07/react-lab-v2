import { useEffect, useRef, useState } from 'react';
import { Copy, Check, ExternalLink, Link2 } from 'lucide-react';
import { useModal } from '@react-lab/ui';

interface ShareDialogProps {
    formTitle: string;
    shareUrl: string;
}

export default function ShareDialog({ formTitle, shareUrl }: ShareDialogProps) {
    const { close } = useModal();
    const [copied, setCopied] = useState(false);
    const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fullUrl = `${window.location.origin}/fill/${shareUrl}`;

    useEffect(() => {
        return () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current); };
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    };

    const handleOpen = () => window.open(fullUrl, '_blank');

    return (
        <div>
            <div className="flex items-center gap-3 mb-5">
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-plum/10 text-plum shrink-0">
                    <Link2 className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-ink leading-tight">Share Form</h3>
                    <p className="text-sm text-neutral-500 truncate">Anyone with the link can fill “{formTitle}”.</p>
                </div>
            </div>

            <div className="flex items-center gap-2 p-2 pl-3.5 bg-neutral-50 border border-neutral-200 rounded-xl mb-5">
                <input
                    type="text"
                    value={fullUrl}
                    readOnly
                    onFocus={(e) => e.target.select()}
                    className="flex-1 bg-transparent text-sm text-neutral-600 outline-none truncate"
                />
                <button
                    onClick={handleCopy}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                        copied ? 'bg-success-50 text-success' : 'bg-ink text-white hover:bg-neutral-800'
                    }`}
                >
                    {copied ? <><Check className="w-3.5 h-3.5" />Copied</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                </button>
            </div>

            <div className="flex gap-3">
                <button onClick={close} className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">
                    Close
                </button>
                <button onClick={handleOpen} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl bg-plum hover:bg-plum-600 text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />Open Form
                </button>
            </div>
        </div>
    );
}
