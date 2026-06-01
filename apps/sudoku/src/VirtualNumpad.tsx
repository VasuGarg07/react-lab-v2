import { Eraser } from 'lucide-react';

interface VirtualNumpadProps {
    onNumberSelect: (num: number) => void;
    onClear: () => void;
    disabled?: boolean;
}

export default function VirtualNumpad({ onNumberSelect, onClear, disabled }: VirtualNumpadProps) {
    return (
        <div
            className="md:hidden w-full border-t py-3 px-4"
            style={{ backgroundColor: '#F9F9ED', borderColor: '#D9DBF1' }}
        >
            <div className="max-w-md mx-auto grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                        key={num}
                        type="button"
                        onClick={() => onNumberSelect(num)}
                        disabled={disabled}
                        className="h-12 flex items-center justify-center rounded-xl text-base transition active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                        style={{ backgroundColor: '#EEEEF8', border: '1px solid #D9DBF1', color: '#4a5080', fontWeight: 700 }}
                        onMouseEnter={e => !disabled && (e.currentTarget.style.backgroundColor = '#D9DBF1')}
                        onMouseLeave={e => !disabled && (e.currentTarget.style.backgroundColor = '#EEEEF8')}
                    >
                        {num}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={onClear}
                    disabled={disabled}
                    aria-label="Clear cell"
                    className="h-12 flex items-center justify-center rounded-xl transition active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                    style={{ backgroundColor: '#EEEEF8', border: '1px solid #D9DBF1', color: '#7D84B2' }}
                    onMouseEnter={e => {
                        if (!disabled) {
                            e.currentTarget.style.backgroundColor = '#f5d0e8';
                            e.currentTarget.style.borderColor = '#e8b8d4';
                            e.currentTarget.style.color = '#b5174a';
                        }
                    }}
                    onMouseLeave={e => {
                        if (!disabled) {
                            e.currentTarget.style.backgroundColor = '#EEEEF8';
                            e.currentTarget.style.borderColor = '#D9DBF1';
                            e.currentTarget.style.color = '#7D84B2';
                        }
                    }}
                >
                    <Eraser size={18} />
                </button>
            </div>
        </div>
    );
}
