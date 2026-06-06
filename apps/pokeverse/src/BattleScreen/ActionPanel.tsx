import { Swords, ArrowLeftRight, Flag } from "lucide-react";

interface ActionPanelProps {
    playerName: string;
    isP0Turn: boolean;
    onFight: () => void;
    onSwitch: () => void;
    onForfeit: () => void;
}

export default function ActionPanel({ playerName, onFight, onSwitch, onForfeit }: ActionPanelProps) {
    return (
        <div
            className="rounded-2xl shadow-xl overflow-hidden"
            style={{
                background: 'linear-gradient(160deg, #f8efdc 0%, #e8d9be 100%)',
                border: '3px solid #a8926a',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
        >
            <div
                className="px-4 py-2 border-b-2"
                style={{ borderColor: '#a8926a', background: 'linear-gradient(90deg, #c8a870, #b8986a)' }}
            >
                <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#f8efdc' }}>
                    {playerName} — what will you do?
                </p>
            </div>

            <div className="p-3 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={onFight}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase text-white transition-all duration-100 hover:brightness-110 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #c02828, #e03838)',
                            border: '2px solid #8a1a1a',
                            boxShadow: '0 3px 0 #8a1a1a, 0 4px 10px rgba(192,40,40,0.4)',
                        }}
                    >
                        <Swords className="w-4 h-4" />
                        Fight
                    </button>
                    <button
                        onClick={onSwitch}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase text-white transition-all duration-100 hover:brightness-110 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #2860c0, #3878e0)',
                            border: '2px solid #1a408a',
                            boxShadow: '0 3px 0 #1a408a, 0 4px 10px rgba(40,96,192,0.4)',
                        }}
                    >
                        <ArrowLeftRight className="w-4 h-4" />
                        Switch
                    </button>
                </div>
                <button
                    onClick={onForfeit}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl font-bold text-xs uppercase transition-all duration-100 hover:brightness-110 active:scale-95"
                    style={{
                        background: '#e8d9be',
                        border: '2px solid #a8926a',
                        color: '#8a7050',
                    }}
                >
                    <Flag className="w-3 h-3" />
                    Forfeit
                </button>
            </div>
        </div>
    );
}
