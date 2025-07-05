import React from 'react';
import { Accordion } from '@base-ui-components/react/accordion';
import { cn } from '@/shared/cn';
import { ChevronDown } from 'lucide-react';
import { FormStep as FormStepType } from '../../helpers/fb.types';
import { FormSection } from './FormSection';

interface FormStepProps {
    step: FormStepType;
    className?: string;
}

export const FormStep: React.FC<FormStepProps> = ({
    step,
    className
}) => {
    return (
        <div className={cn("w-full", className)}>
            {/* Step Header */}
            <div className={cn(
                "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl",
                "border border-gray-200/50 dark:border-gray-700/50",
                "rounded-2xl px-4 py-3 mb-3"
            )}>
                <div className="text-left">
                    <h2 className="font-bold text-gray-900 dark:text-white text-xl">
                        {step.title}
                    </h2>
                    {step.description && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {step.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Sections Accordion */}
            <Accordion.Root
                defaultValue={step.sections.map(section => section.key)}
                className="space-y-3"
            >
                {step.sections.map(section => (
                    <Accordion.Item
                        key={section.key}
                        value={section.key}
                        className={cn(
                            "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl",
                            "border border-gray-200/50 dark:border-gray-700/50",
                            "rounded-2xl overflow-hidden"
                        )}
                    >
                        <Accordion.Header>
                            <Accordion.Trigger className={cn(
                                "w-full group flex items-center justify-between px-4 py-3",
                                "hover:bg-white/90 dark:hover:bg-gray-800/90",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50",
                            )}>
                                <div className="flex items-center gap-3">
                                    {/* Section Info */}
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                                            {section.title}
                                        </h3>
                                        {section.description && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                                {section.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Expand Icon */}
                                <ChevronDown className={cn(
                                    "size-5 text-gray-400 transition-transform duration-200",
                                    "group-data-[state=open]:rotate-180"
                                )} />
                            </Accordion.Trigger>
                        </Accordion.Header>

                        <Accordion.Panel className="px-4 pb-3">
                            <div className="space-y-6">
                                {section.fields.length > 0 ? (
                                    <FormSection
                                        section={section}
                                        className="border-0 bg-transparent p-0 mb-0 mt-3"
                                    />
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            No fields in this section
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion.Root>

            {/* Empty State */}
            {step.sections.length === 0 && (
                <div className={cn(
                    "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl",
                    "border border-gray-200/50 dark:border-gray-700/50",
                    "rounded-2xl p-12 text-center"
                )}>
                    <p className="text-gray-500 dark:text-gray-400">
                        No sections in this step
                    </p>
                </div>
            )}
        </div>
    );
};