import { Loader2 } from "lucide-react";

export default function WaitingPanel({ playerName }: { playerName: string }) {
    return (
        <div
            className="rounded-2xl shadow-xl overflow-hidden"
            style={{
                background: 'linear-gradient(160deg, #f8efdc 0%, #e8d9be 100%)',
                border: '3px solid #a8926a',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
        >
            {/* Header */}
            <div
                className="px-4 py-2 border-b-2"
                style={{ borderColor: '#a8926a', background: 'linear-gradient(90deg, #c8a870, #b8986a)' }}
            >
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#f8efdc' }}>
                    Waiting…
                </span>
            </div>
            {/* Body */}
            <div className="flex flex-col items-center justify-center gap-2 py-6 px-4 text-center">
                <Loader2 className="w-7 h-7 animate-spin" style={{ color: '#c8a870' }} />
                <p className="text-sm font-black uppercase tracking-wide" style={{ color: '#2a1a08' }}>Opponent's Turn</p>
                <p className="text-xs" style={{ color: '#8a7050' }}>{playerName} has acted — waiting…</p>
            </div>
        </div>
    );
}
