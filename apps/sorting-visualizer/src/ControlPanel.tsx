import { Play, Pause, RefreshCw, RotateCcw, ChevronDown } from 'lucide-react';

const ALGORITHMS = [
    { value: 'bubbleSort',    label: 'Bubble Sort' },
    { value: 'selectionSort', label: 'Selection Sort' },
    { value: 'insertionSort', label: 'Insertion Sort' },
    { value: 'cocktailSort',  label: 'Cocktail Sort' },
    { value: 'shellSort',     label: 'Shell Sort' },
    { value: 'mergeSort',     label: 'Merge Sort' },
    { value: 'quickSort',     label: 'Quick Sort' },
    { value: 'heapSort',      label: 'Heap Sort' },
];

interface ControlPanelProps {
    algorithm: string;
    setAlgorithm: (v: string) => void;
    arraySize: number;
    setArraySize: (v: number) => void;
    animationSpeed: number;
    setAnimationSpeed: (v: number) => void;
    onNewArray: () => void;
    onReset: () => void;
    sorting: boolean;
    startSorting: () => void;
    stopSorting: () => void;
}

export default function ControlPanel({
    algorithm, setAlgorithm,
    arraySize, setArraySize,
    animationSpeed, setAnimationSpeed,
    onNewArray, onReset,
    sorting, startSorting, stopSorting,
}: ControlPanelProps) {
    return (
        <div className="px-3 py-2.5 rounded-xl bg-surface border border-border flex flex-col gap-2.5">

            {/* Row 1: select + actions */}
            <div className="flex items-center justify-between gap-2">
                {/* Algorithm select */}
                <div className="relative flex-1 min-w-0 max-w-48">
                    <select
                        value={algorithm}
                        onChange={e => setAlgorithm(e.target.value)}
                        disabled={sorting}
                        className="w-full appearance-none text-xs font-semibold pl-2.5 pr-7 py-1.5 rounded-lg outline-none cursor-pointer
                            bg-base border border-border text-text
                            focus:ring-2 focus:ring-blue/30
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {ALGORITHMS.map(a => (
                            <option key={a.value} value={a.value}>{a.label}</option>
                        ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted" />
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1 shrink-0">
                    <IconBtn onClick={onNewArray} disabled={sorting} title="New Array">
                        <RefreshCw size={13} />
                    </IconBtn>
                    <IconBtn onClick={onReset} disabled={sorting} title="Reset colours">
                        <RotateCcw size={13} />
                    </IconBtn>
                    <button
                        onClick={sorting ? stopSorting : startSorting}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity
                            ${sorting
                                ? 'bg-red/20 text-red border border-red/30 hover:bg-red/30'
                                : 'bg-blue/20 text-blue border border-blue/30 hover:bg-blue/30'
                            }`}
                    >
                        {sorting ? <><Pause size={12} /><span className="hidden sm:inline">Stop</span></> : <><Play size={12} /><span className="hidden sm:inline">Start</span></>}
                    </button>
                </div>
            </div>

            {/* Row 2: sliders — full width, side-by-side on sm+ */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <InlineSlider
                    label="Size" value={arraySize}
                    min={10} max={100} step={1}
                    onChange={setArraySize} disabled={sorting}
                />
                <InlineSlider
                    label="Speed" value={animationSpeed}
                    min={10} max={1000} step={10}
                    onChange={setAnimationSpeed} disabled={sorting}
                />
            </div>

        </div>
    );
}

function InlineSlider({ label, value, min, max, step, onChange, disabled }: {
    label: string; value: number; min: number; max: number; step: number;
    onChange: (v: number) => void; disabled: boolean;
}) {
    return (
        <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-[11px] font-semibold text-subtext shrink-0 uppercase tracking-wide w-9">
                {label}
            </span>
            <input
                type="range"
                min={min} max={max} step={step} value={value}
                onChange={e => onChange(Number(e.target.value))}
                disabled={disabled}
                className="flex-1 h-1 rounded-full appearance-none cursor-pointer min-w-0
                    bg-border accent-blue
                    disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-[11px] font-semibold tabular-nums text-blue shrink-0 w-8 text-right">
                {value}
            </span>
        </div>
    );
}

function IconBtn({ onClick, disabled, title, children }: {
    onClick: () => void; disabled: boolean; title: string; children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={title}
            className="p-1.5 rounded-lg text-subtext hover:bg-white/8 hover:text-text
                disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
            {children}
        </button>
    );
}
