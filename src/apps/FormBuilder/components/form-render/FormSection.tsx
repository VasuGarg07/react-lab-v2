import React, { useMemo } from 'react';
import { cn } from '@/shared/cn';
import { FormSection as FormSectionType, FormField } from '../../helpers/fb.types';
import {
    FormTextField,
    FormNumberField,
    FormRadioField,
    FormCheckboxField,
    FormSwitchField,
    FormRangeField
} from './FormFields';

interface FormSectionProps {
    section: FormSectionType;
    className?: string;
}

// Field rendering helper
const renderField = (field: FormField) => {
    const props = {
        field,
        className: "w-full"
    };

    switch (field.type) {
        case 'text':
            return <FormTextField {...props} />;
        case 'number':
            return <FormNumberField {...props} />;
        case 'select':
            return <FormRadioField {...props} />;
        case 'multi_select':
            return <FormCheckboxField {...props} />;
        case 'boolean':
            return <FormSwitchField {...props} />;
        case 'range':
            return <FormRangeField {...props} />;
        default:
            return null;
    }
};

// Smart layout grouping
const createFieldGroups = (fields: FormField[]) => {
    const groups: FormField[][] = [];
    let currentGroup: FormField[] = [];

    fields.forEach((field, index) => {
        // Short fields that can share space
        const isShortField = field.type === 'boolean' || field.type === 'range' || field.type === 'select';
        // Long fields that need full width
        const isLongField = field.type === 'text' || field.type === 'multi_select';

        if (isLongField) {
            // Push current group if it has items
            if (currentGroup.length > 0) {
                groups.push([...currentGroup]);
                currentGroup = [];
            }
            // Add long field as its own group
            groups.push([field]);
        } else if (isShortField) {
            currentGroup.push(field);
            // If we have 2 short fields or this is the last field, close the group
            if (currentGroup.length === 2 || index === fields.length - 1) {
                groups.push([...currentGroup]);
                currentGroup = [];
            }
        } else {
            // Number fields - can be short or long depending on context
            if (currentGroup.length === 0) {
                currentGroup.push(field);
            } else {
                groups.push([...currentGroup]);
                currentGroup = [field];
            }
        }
    });

    // Push any remaining fields
    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    return groups;
};

export const FormSection: React.FC<FormSectionProps> = ({
    section,
    className
}) => {
    // Create smart field groups
    const fieldGroups = useMemo(() => createFieldGroups(section.fields), [section.fields]);

    return (
        <div className={cn("w-full", className)}>
            {/* Section Card */}
            <div className={cn(
                "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl",
                "border border-gray-200/50 dark:border-gray-700/50",
                "rounded-2xl px-4 py-3"
            )}>
                {/* Section Header */}
                <div className="text-left pb-2 mb-2 border-b border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                        {section.title}
                    </h3>
                    {section.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                            {section.description}
                        </p>
                    )}
                </div>

                {/* Section Content */}
                <div className="space-y-3">
                    {fieldGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className='space-y-3'>
                            {group.map((field) => (
                                <div
                                    key={field.key}
                                    className={cn(
                                        // Base styling
                                        "flex-1 min-w-0",
                                        // Minimum width for short fields on mobile
                                        group.length > 1 && "sm:min-w-[240px]"
                                    )}
                                >
                                    {renderField(field)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {section.fields.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            No fields in this section
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};