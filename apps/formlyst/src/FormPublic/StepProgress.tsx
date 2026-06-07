interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
}

export default function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
    return (
        <div className="flex flex-col items-center gap-2.5">
            <div className="flex items-center gap-1.5 w-full max-w-xs">
                {Array.from({ length: totalSteps }, (_, i) => {
                    const done = i <= currentStep;
                    return (
                        <div key={i} className="flex-1 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                            <div
                                className={`h-full rounded-full bg-plum transition-all duration-500 ${done ? 'w-full' : 'w-0'}`}
                            />
                        </div>
                    );
                })}
            </div>
            <p className="text-xs font-semibold text-neutral-500 tabular-nums">
                Step {currentStep + 1} <span className="text-neutral-400">of {totalSteps}</span>
            </p>
        </div>
    );
}
