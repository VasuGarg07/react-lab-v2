import { z } from 'zod';
import { FormConfig } from './fb.types';
import { FORM_LIMITS, VALIDATION_LIMITS } from './fb.constants';

// Optimized Zod schemas - no refinements in discriminated union
const baseFieldSchema = z.object({
    key: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_]+$/),
    label: z.string().min(1).max(FORM_LIMITS.MAX_CHAR_LENGTH),
    type: z.enum(['text', 'number', 'select', 'multi_select', 'boolean', 'range']),
    required: z.boolean()
});

const textFieldSchema = baseFieldSchema.extend({
    type: z.literal('text'),
    validation: z.object({
        minLength: z.number().min(VALIDATION_LIMITS.TEXT_MIN_LENGTH).max(VALIDATION_LIMITS.TEXT_MAX_LENGTH).optional(),
        maxLength: z.number().min(VALIDATION_LIMITS.TEXT_MIN_LENGTH).max(VALIDATION_LIMITS.TEXT_MAX_LENGTH).optional(),
        regex: z.string().optional()
    }).optional()
});

const numberFieldSchema = baseFieldSchema.extend({
    type: z.literal('number'),
    validation: z.object({
        minValue: z.number().min(VALIDATION_LIMITS.NUMBER_MIN_VALUE).max(VALIDATION_LIMITS.NUMBER_MAX_VALUE).optional(),
        maxValue: z.number().min(VALIDATION_LIMITS.NUMBER_MIN_VALUE).max(VALIDATION_LIMITS.NUMBER_MAX_VALUE).optional()
    }).optional()
});

const selectFieldSchema = baseFieldSchema.extend({
    type: z.literal('select'),
    options: z.array(z.string().min(1)).min(1).max(FORM_LIMITS.MAX_RADIO_OPTIONS)
});

const multiSelectFieldSchema = baseFieldSchema.extend({
    type: z.literal('multi_select'),
    options: z.array(z.string().min(1)).min(1).max(FORM_LIMITS.MAX_CHECKBOX_OPTIONS)
});

const booleanFieldSchema = baseFieldSchema.extend({
    type: z.literal('boolean')
});

const rangeFieldSchema = baseFieldSchema.extend({
    type: z.literal('range'),
    min: z.number().min(FORM_LIMITS.RANGE_MIN).max(FORM_LIMITS.RANGE_MAX),
    max: z.number().min(FORM_LIMITS.RANGE_MIN).max(FORM_LIMITS.RANGE_MAX)
});

// Field union - no refinements here for performance
const fieldSchema = z.discriminatedUnion('type', [
    textFieldSchema,
    numberFieldSchema,
    selectFieldSchema,
    multiSelectFieldSchema,
    booleanFieldSchema,
    rangeFieldSchema
]);

const sectionSchema = z.object({
    key: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_]+$/),
    title: z.string().min(1).max(FORM_LIMITS.MAX_CHAR_LENGTH),
    description: z.string().max(500).optional(),
    fields: z.array(fieldSchema).min(1).max(FORM_LIMITS.MAX_FIELDS_PER_SECTION)
});

const stepSchema = z.object({
    key: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_]+$/),
    title: z.string().min(1).max(FORM_LIMITS.MAX_CHAR_LENGTH),
    description: z.string().max(500).optional(),
    sections: z.array(sectionSchema).min(1).max(FORM_LIMITS.MAX_SECTIONS_PER_STEP)
});

const formConfigSchema = z.object({
    title: z.string().min(1).max(FORM_LIMITS.MAX_CHAR_LENGTH),
    description: z.string().max(500).optional(),
    steps: z.array(stepSchema).min(1).max(FORM_LIMITS.MAX_STEPS)
});

// Additional validation functions for business logic
const validateUniqueKeys = (formConfig: FormConfig): boolean => {
    const allKeys: string[] = [];

    // Collect all keys
    for (const step of formConfig.steps) {
        allKeys.push(step.key);
        for (const section of step.sections) {
            allKeys.push(section.key);
            for (const field of section.fields) {
                allKeys.push(field.key);
            }
        }
    }

    // Check uniqueness
    return new Set(allKeys).size === allKeys.length;
};

const validateRangeFields = (formConfig: FormConfig): boolean => {
    for (const step of formConfig.steps) {
        for (const section of step.sections) {
            for (const field of section.fields) {
                if (field.type === 'range') {
                    if (field.min >= field.max) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};

const validateTextFieldValidation = (formConfig: FormConfig): boolean => {
    for (const step of formConfig.steps) {
        for (const section of step.sections) {
            for (const field of section.fields) {
                if (field.type === 'text' && field.validation) {
                    const { minLength, maxLength } = field.validation;
                    if (minLength !== undefined && maxLength !== undefined && minLength > maxLength) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};

const validateNumberFieldValidation = (formConfig: FormConfig): boolean => {
    for (const step of formConfig.steps) {
        for (const section of step.sections) {
            for (const field of section.fields) {
                if (field.type === 'number' && field.validation) {
                    const { minValue, maxValue } = field.validation;
                    if (minValue !== undefined && maxValue !== undefined && minValue > maxValue) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};

const validateSelectOptions = (formConfig: FormConfig): boolean => {
    for (const step of formConfig.steps) {
        for (const section of step.sections) {
            for (const field of section.fields) {
                if (field.type === 'select' || field.type === 'multi_select') {
                    // Check for unique options
                    const uniqueOptions = new Set(field.options);
                    if (uniqueOptions.size !== field.options.length) {
                        return false;
                    }
                    // Check for empty options
                    if (field.options.some(option => !option || option.trim().length === 0)) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};

const validateRegexPatterns = (formConfig: FormConfig): boolean => {
    for (const step of formConfig.steps) {
        for (const section of step.sections) {
            for (const field of section.fields) {
                if (field.type === 'text' && field.validation?.regex) {
                    try {
                        new RegExp(field.validation.regex);
                    } catch {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};

/**
 * Validate JSON import - only basic structure checks, allows invalid values
 * @param formConfig - The form configuration to validate for import
 * @returns object with validation result and error details
 */
export const validateFormForImport = (formConfig: FormConfig): {
    isValid: boolean;
    errors: string[]
} => {
    const errors: string[] = [];

    try {
        // Only check basic structure - required fields and types
        if (!formConfig.title || typeof formConfig.title !== 'string') {
            errors.push('Form title is required and must be a string');
        }

        if (!formConfig.steps || !Array.isArray(formConfig.steps) || formConfig.steps.length === 0) {
            errors.push('Form must have at least one step');
        }

        // Check steps structure
        formConfig.steps?.forEach((step, stepIndex) => {
            if (!step.key || typeof step.key !== 'string') {
                errors.push(`Step ${stepIndex + 1}: key is required and must be a string`);
            }
            if (!step.title || typeof step.title !== 'string') {
                errors.push(`Step ${stepIndex + 1}: title is required and must be a string`);
            }
            if (!step.sections || !Array.isArray(step.sections) || step.sections.length === 0) {
                errors.push(`Step ${stepIndex + 1}: must have at least one section`);
            }

            // Check sections structure
            step.sections?.forEach((section, sectionIndex) => {
                if (!section.key || typeof section.key !== 'string') {
                    errors.push(`Step ${stepIndex + 1}, Section ${sectionIndex + 1}: key is required and must be a string`);
                }
                if (!section.title || typeof section.title !== 'string') {
                    errors.push(`Step ${stepIndex + 1}, Section ${sectionIndex + 1}: title is required and must be a string`);
                }
                if (!section.fields || !Array.isArray(section.fields) || section.fields.length === 0) {
                    errors.push(`Step ${stepIndex + 1}, Section ${sectionIndex + 1}: must have at least one field`);
                }

                // Check fields structure
                section.fields?.forEach((field, fieldIndex) => {
                    if (!field.key || typeof field.key !== 'string') {
                        errors.push(`Step ${stepIndex + 1}, Section ${sectionIndex + 1}, Field ${fieldIndex + 1}: key is required and must be a string`);
                    }
                    if (!field.label || typeof field.label !== 'string') {
                        errors.push(`Step ${stepIndex + 1}, Section ${sectionIndex + 1}, Field ${fieldIndex + 1}: label is required and must be a string`);
                    }
                    if (!field.type || typeof field.type !== 'string') {
                        errors.push(`Step ${stepIndex + 1}, Section ${sectionIndex + 1}, Field ${fieldIndex + 1}: type is required and must be a string`);
                    }
                    if (typeof field.required !== 'boolean') {
                        errors.push(`Step ${stepIndex + 1}, Section ${sectionIndex + 1}, Field ${fieldIndex + 1}: required must be a boolean`);
                    }

                    // Check field-specific required properties (but not their values)
                    if (field.type === 'select' || field.type === 'multi_select') {
                        if (!field.options || !Array.isArray(field.options)) {
                            errors.push(`Step ${stepIndex + 1}, Section ${sectionIndex + 1}, Field ${fieldIndex + 1}: options array is required for ${field.type} fields`);
                        }
                    }

                    if (field.type === 'range') {
                        if (typeof field.min !== 'number' || typeof field.max !== 'number') {
                            errors.push(`Step ${stepIndex + 1}, Section ${sectionIndex + 1}, Field ${fieldIndex + 1}: min and max numbers are required for range fields`);
                        }
                    }
                });
            });
        });

        return {
            isValid: errors.length === 0,
            errors
        };
    } catch (error) {
        console.error(error);
        return {
            isValid: false,
            errors: ['Import validation failed with unexpected error']
        };
    }
};

/**
 * Optional: Get validation details for debugging
 * @param formConfig - The form configuration to validate
 * @returns object with validation result and error details
 */
export const validateFormWithDetails = (formConfig: FormConfig): {
    isValid: boolean;
    errors: string[]
} => {
    const errors: string[] = [];

    try {
        // Validate basic structure
        const result = formConfigSchema.safeParse(formConfig);
        if (!result.success) {
            errors.push(...result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`));
        }

        // Validate business logic
        if (!validateUniqueKeys(formConfig)) {
            errors.push('Duplicate keys found across form entities');
        }

        if (!validateRangeFields(formConfig)) {
            errors.push('Range field min must be less than max');
        }

        if (!validateTextFieldValidation(formConfig)) {
            errors.push('Text field minLength must be less than or equal to maxLength');
        }

        if (!validateNumberFieldValidation(formConfig)) {
            errors.push('Number field minValue must be less than or equal to maxValue');
        }

        if (!validateSelectOptions(formConfig)) {
            errors.push('Select/Multi-select fields must have unique, non-empty options');
        }

        if (!validateRegexPatterns(formConfig)) {
            errors.push('Invalid regex pattern in text field validation');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    } catch (error) {
        console.error(error);
        return {
            isValid: false,
            errors: ['Validation failed with unexpected error']
        };
    }
};

// Export the schema for potential reuse
export { formConfigSchema };