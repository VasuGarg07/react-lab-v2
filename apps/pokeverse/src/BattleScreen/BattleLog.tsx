import { useEffect, useRef } from "react";

export default function BattleLog({ logs, turn }: { logs: string[]; turn: number }) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div
            className="rounded-2xl shadow-xl overflow-hidden flex flex-col h-full"
            style={{
                background: 'linear-gradient(160deg, #f8efdc 0%, #e8d9be 100%)',
                border: '3px solid #a8926a',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-2 border-b-2"
                style={{ borderColor: '#a8926a', background: 'linear-gradient(90deg, #c8a870, #b8986a)' }}
            >
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#f8efdc' }}>
                    Battle Log
                </span>
                <span
                    className="text-[10px] font-black px-2 py-0.5 rounded-lg"
                    style={{ background: '#2a1a08', color: '#f8efdc' }}
                >
                    Turn {turn}
                </span>
            </div>

            {/* Log body */}
            <div className="p-3 space-y-1.5 overflow-y-auto flex-1" style={{ maxHeight: 120 }}>
                {logs.slice(-12).map((log, i, arr) => {
                    const isLatest = i === arr.length - 1;
                    return (
                        <p
                            key={i}
                            className="text-xs leading-snug transition-all"
                            style={{ color: isLatest ? '#2a1a08' : '#8a7050', fontWeight: isLatest ? 700 : 400 }}
                        >
                            {isLatest && (
                                <span style={{ color: '#c08030', marginRight: 4 }}>&#9658;</span>
                            )}
                            {log}
                        </p>
                    );
                })}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
