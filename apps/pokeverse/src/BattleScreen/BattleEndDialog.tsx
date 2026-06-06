import { Trophy, RotateCcw } from 'lucide-react';

interface BattleEndDialogProps {
    winner: string;
    onPlayAgain: () => void;
}

export default function BattleEndDialog({ winner, onPlayAgain }: BattleEndDialogProps) {
    return (
        <div className="flex items-center gap-4 sm:gap-8 py-1">
            {/* Pikachu */}
            <img src="/pikachu.png" alt="Victory" className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg shrink-0" />

            {/* Winner info */}
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: '#8a7050' }}>Winner</p>
                <h2 className="text-xl sm:text-2xl font-black truncate" style={{ color: '#2a1a08' }}>{winner}</h2>
                <p className="text-xs sm:text-sm mt-0.5" style={{ color: '#7a5a38' }}>has won the battle!</p>
            </div>

            {/* Trophy + button */}
            <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="relative">
                    <Trophy size={36} style={{ color: '#c08030', filter: 'drop-shadow(0 2px 6px rgba(192,128,48,0.5))' }} />
                    <div className="absolute inset-0 animate-ping opacity-20">
                        <Trophy size={36} style={{ color: '#c08030' }} />
                    </div>
                </div>
                <button
                    onClick={onPlayAgain}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm text-white uppercase tracking-wide transition-all duration-100 hover:brightness-110 active:scale-95 whitespace-nowrap"
                    style={{
                        background: 'linear-gradient(135deg, #c02828, #e03838)',
                        border: '2px solid #8a1a1a',
                        boxShadow: '0 3px 0 #8a1a1a, 0 4px 14px rgba(192,40,40,0.4)',
                    }}
                >
                    <RotateCcw size={13} />
                    Play Again
                </button>
            </div>
        </div>
    );
}
