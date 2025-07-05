import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/shared/cn';

interface StepperProps {
    steps: { label: string }[];
    activeStep: number;
    onStepClick?: (stepIndex: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep, onStepClick }) => {
    return (
        <div
            className="flex items-center justify-between mb-6 overflow-x-auto pb-2"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={steps.length - 1}
            aria-valuenow={activeStep}
            aria-label={`Step ${activeStep + 1} of ${steps.length}: ${steps[activeStep]?.label}`}
        >
            {steps.map((step, index) => {
                // Determine step status
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                const isClickable = onStepClick && (isCompleted || index <= activeStep + 1);

                // Conditionally add the connector line between steps
                const hasConnector = index < steps.length - 1;

                return (
                    <React.Fragment key={step.label}>
                        <div
                            className={cn(
                                "flex flex-col items-center flex-shrink-0 mt-2",
                                isClickable ? "cursor-pointer" : ""
                            )}
                            onClick={() => isClickable && onStepClick?.(index)}
                            role="button"
                            tabIndex={isClickable ? 0 : -1}
                            aria-current={isActive ? "step" : undefined}
                            aria-label={`${isCompleted ? 'Completed' : isActive ? 'Current' : 'Upcoming'} step ${index + 1}: ${step.label}`}
                            onKeyDown={(e) => {
                                if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                                    e.preventDefault();
                                    onStepClick?.(index);
                                }
                            }}
                        >
                            {/* Step indicator */}
                            <div
                                className={cn(
                                    "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                                    isActive
                                        ? "border-blue-500 bg-blue-500 text-white scale-110 shadow-md"
                                        : isCompleted
                                            ? "border-green-500 bg-green-500 text-white"
                                            : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800",
                                    isClickable && "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                )}
                            >
                                {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-sm">{index + 1}</span>}
                            </div>

                            {/* Step label */}
                            <span
                                className={cn(
                                    "text-xs mt-2 text-center font-medium transition-colors duration-300",
                                    isActive
                                        ? "text-blue-600 dark:text-blue-400"
                                        : isCompleted
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-gray-500 dark:text-gray-400"
                                )}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Connector line between steps */}
                        {hasConnector && (
                            <div
                                className={cn(
                                    "flex-grow h-px mx-1 transition-colors duration-300",
                                    index < activeStep
                                        ? "bg-green-500 dark:bg-green-500"
                                        : "bg-gray-300 dark:bg-gray-600"
                                )}
                                aria-hidden="true"
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Stepper;