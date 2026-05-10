interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
}

export default function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
                {Array.from({ length: totalSteps }, (_, i) => {
                    const stepIndex = i;
                    const isCompleted = stepIndex < currentStep;
                    const isCurrent = stepIndex === currentStep;

                    return (
                        <div
                            key={i}
                            className={`
                                w-2.5 h-2.5 rounded-full transition-all duration-300
                                ${isCompleted
                                    ? 'bg-blue-600 dark:bg-blue-500'
                                    : isCurrent
                                        ? 'bg-blue-600 dark:bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/50'
                                        : 'bg-neutral-200 dark:bg-neutral-700'
                                }
                            `}
                        />
                    );
                })}
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Step {currentStep + 1} of {totalSteps}
            </p>
        </div>
    );
}