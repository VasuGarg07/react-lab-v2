import { Check } from 'lucide-react';

export interface Step {
    key: string;
    label: string;
}

interface Props {
    steps: Step[];
    current: number;
    onSelect: (index: number) => void;
}

export const Stepper = ({ steps, current, onSelect }: Props) => (
    <nav aria-label="Invoice steps">
        <ol className="flex items-center">
            {steps.map((step, i) => {
                const done = i < current;
                const active = i === current;
                return (
                    <li key={step.key} className="flex flex-1 items-center last:flex-none">
                        <button
                            type="button"
                            onClick={() => onSelect(i)}
                            className="flex items-center gap-2 outline-none"
                        >
                            <span
                                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors ${
                                    active
                                        ? 'bg-accent text-card'
                                        : done
                                          ? 'bg-accent-soft text-accent'
                                          : 'bg-panel text-faint'
                                }`}
                            >
                                {done ? <Check size={14} strokeWidth={2.5} /> : i + 1}
                            </span>
                            <span
                                className={`hidden text-sm font-medium transition-colors sm:inline ${
                                    active ? 'text-ink' : done ? 'text-muted' : 'text-faint'
                                }`}
                            >
                                {step.label}
                            </span>
                        </button>
                        {i < steps.length - 1 && (
                            <span
                                className={`mx-2 h-px flex-1 transition-colors sm:mx-3 ${
                                    done ? 'bg-accent/40' : 'bg-hairline'
                                }`}
                            />
                        )}
                    </li>
                );
            })}
        </ol>
    </nav>
);
