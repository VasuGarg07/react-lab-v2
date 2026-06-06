import type { BattlePokemon } from "../helpers/types";

interface TeamPartyStatusProps {
    team: BattlePokemon[];
    playerName: string;
    isOpponent: boolean;
}

export default function TeamPartyStatus({ team, playerName, isOpponent }: TeamPartyStatusProps) {
    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl shadow-md ${isOpponent ? 'flex-row-reverse' : ''}`}
            style={{
                background: 'linear-gradient(135deg, #f8efdc, #e8d9be)',
                border: '2px solid #a8926a',
                boxShadow: '0 3px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
        >
            <span className="text-[10px] font-black uppercase tracking-wide whitespace-nowrap" style={{ color: '#2a1a08' }}>
                {playerName}
            </span>
            <div className={`flex gap-1 items-center ${isOpponent ? 'flex-row-reverse' : ''}`}>
                {team.map((pokemon, idx) => (
                    <div
                        key={idx}
                        title={`${pokemon.name} — ${pokemon.currentHP}/${pokemon.calculatedStats.hp} HP`}
                        className="rounded-full border-2 transition-all duration-300"
                        style={{
                            width: 10,
                            height: 10,
                            backgroundColor: pokemon.currentHP > 0 ? '#2ea02e' : '#c03020',
                            borderColor: pokemon.currentHP > 0 ? '#1a7a1a' : '#8a1a1a',
                            boxShadow: pokemon.currentHP > 0 ? '0 0 5px #2ea02e80' : '0 0 4px #c0302060',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
