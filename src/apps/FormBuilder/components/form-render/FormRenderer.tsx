import React, { useState } from 'react';
import { Tabs } from '@base-ui-components/react/tabs';
import { cn } from '@/shared/cn';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { FormStep } from './FormStep';
import { FormConfig } from '../../helpers/fb.types';
import { useNavigate } from 'react-router';

interface FormRendererProps {
    shareUrl: string;
    formConfig: FormConfig;
    className?: string;
}

const FormRenderer: React.FC<FormRendererProps> = ({
    shareUrl,
    formConfig,
    className
}) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(formConfig.steps[0]?.key || '');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const currentStepIndex = formConfig.steps.findIndex(step => step.key === currentStep);
    const currentStepData = formConfig.steps[currentStepIndex];

    const handlePreview = () => {
        navigate(`/formlyst-public/${shareUrl}/review`);
    };

    const handleStepChange = (stepKey: string) => {
        setCurrentStep(stepKey);
        setIsMobileMenuOpen(false);
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStep(formConfig.steps[currentStepIndex - 1].key);
        }
    };

    const handleNext = () => {
        if (currentStepIndex < formConfig.steps.length - 1) {
            setCurrentStep(formConfig.steps[currentStepIndex + 1].key);
        }
    };

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    if (!formConfig.steps || formConfig.steps.length === 0) {
        return (
            <div className={cn("w-full max-w-4xl mx-auto p-6", className)}>
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No steps available in this form</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("w-full max-w-6xl mx-auto p-4 sm:p-6", className)}>
            {/* Form Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {formConfig.title}
                </h1>
                {formConfig.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-md sm:text-lg">
                        {formConfig.description}
                    </p>
                )}
            </div>

            <Tabs.Root value={currentStep} onValueChange={handleStepChange}>
                {/* Desktop Tabs */}
                <div className="hidden md:block mb-4">
                    <Tabs.List className={cn(
                        "flex bg-gray-100 dark:bg-gray-800/80 backdrop-blur-xl",
                        "border border-gray-200/50 dark:border-gray-700/50",
                        "rounded-2xl p-2 relative overflow-hidden"
                    )}>
                        {formConfig.steps.map((step, index) => (
                            <Tabs.Tab
                                key={step.key}
                                value={step.key}
                                className={cn(
                                    "flex-1 relative px-4 py-2 text-sm font-medium text-center",
                                    "hover:text-gray-900 dark:hover:text-white",
                                    "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                                    "data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400",
                                    "data-[selected]:bg-white dark:data-[selected]:bg-gray-700/90",
                                    "data-[selected]:rounded-xl",
                                    "text-gray-600 dark:text-gray-400"
                                )}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xs font-bold bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 data-[selected]:bg-blue-100 dark:data-[selected]:bg-blue-900/50 data-[selected]:text-blue-700 dark:data-[selected]:text-blue-300 rounded-full size-6 flex items-center justify-center">
                                        {index + 1}
                                    </span>
                                    <span className="hidden lg:inline">{step.title}</span>
                                    <span className="lg:hidden">{truncateText(step.title, 12)}</span>
                                </div>
                            </Tabs.Tab>
                        ))}
                        <Tabs.Indicator className="absolute inset-0 z-0" />
                    </Tabs.List>
                </div>

                {/* Mobile Dropdown */}
                <div className="md:hidden mb-4 relative">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "w-full flex items-center justify-between px-4 py-3",
                            "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl",
                            "border border-gray-200/50 dark:border-gray-700/50",
                            "rounded-2xl text-left",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full size-6 flex items-center justify-center">
                                {currentStepIndex + 1}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                                {currentStepData?.title}
                            </span>
                        </div>
                        <ChevronDown className={cn(
                            "size-5 text-gray-400 transition-transform duration-200",
                            isMobileMenuOpen && "rotate-180"
                        )} />
                    </button>

                    {isMobileMenuOpen && (
                        <div className={cn(
                            "absolute top-full left-0 right-0 mt-2 z-50",
                            "bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl",
                            "border border-gray-200/50 dark:border-gray-700/50",
                            "rounded-2xl shadow-sm dark:shadow-lg overflow-hidden"
                        )}>
                            {formConfig.steps.map((step, index) => (
                                <button
                                    key={step.key}
                                    onClick={() => handleStepChange(step.key)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 text-left",
                                        "hover:bg-gray-50/80 dark:hover:bg-gray-700/80",
                                        step.key === currentStep && "bg-blue-50/80 dark:bg-blue-900/20"
                                    )}
                                >
                                    <span className={cn(
                                        "text-xs font-bold rounded-full size-6 flex items-center justify-center",
                                        step.key === currentStep
                                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                    )}>
                                        {index + 1}
                                    </span>
                                    <span className={cn(
                                        "font-medium",
                                        step.key === currentStep
                                            ? "text-blue-700 dark:text-blue-300"
                                            : "text-gray-900 dark:text-white"
                                    )}>
                                        {step.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Step Content */}
                {formConfig.steps.map((step) => (
                    <Tabs.Panel key={step.key} value={step.key} className="focus:outline-none">
                        <FormStep step={step} />
                    </Tabs.Panel>
                ))}
            </Tabs.Root>

            {/* Navigation Footer */}
            <div className={cn(
                "flex items-center justify-between mt-4 py-3 px-4",
                "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl",
                "border border-gray-200/50 dark:border-gray-700/50",
                "rounded-2xl"
            )}>
                <button
                    onClick={handlePrevious}
                    disabled={currentStepIndex === 0}
                    className={cn(
                        "flex items-center gap-2 px-2 py-1 rounded-lg font-medium",
                        "border border-gray-200 dark:border-gray-700",
                        currentStepIndex === 0
                            ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:text-gray-900 dark:hover:text-white"
                    )}
                >
                    <ChevronLeft className="size-4" />
                    Previous
                </button>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Step {currentStepIndex + 1} of {formConfig.steps.length}
                </div>

                {currentStepIndex === formConfig.steps.length - 1 ? (
                    <button
                        onClick={handlePreview}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1 rounded-lg font-medium",
                            "bg-blue-600 hover:bg-blue-700 text-white",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            "shadow-sm hover:shadow-md"
                        )}
                    >
                        Review
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className={cn(
                            "flex items-center gap-2 px-2 py-1 rounded-lg font-medium",
                            "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
                        )}
                    >
                        Next
                        <ChevronRight className="size-4" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default FormRenderer;