import * as yup from 'yup';
import { LIMITS } from './constants';

const textFieldSchema = yup.object({
    key: yup.string().required(),
    label: yup.string().required().max(200),
    type: yup.string().oneOf(['text']).required(),
    required: yup.boolean().default(false),
    validation: yup.object({
        minLength: yup.number().min(1).max(LIMITS.TEXT_MAX_LENGTH),
        maxLength: yup.number().min(1).max(LIMITS.TEXT_MAX_LENGTH),
        regex: yup.string(),
    }),
});

const numberFieldSchema = yup.object({
    key: yup.string().required(),
    label: yup.string().required().max(200),
    type: yup.string().oneOf(['number']).required(),
    required: yup.boolean().default(false),
    validation: yup.object({
        minValue: yup.number().min(LIMITS.NUMBER_MIN).max(LIMITS.NUMBER_MAX),
        maxValue: yup.number().min(LIMITS.NUMBER_MIN).max(LIMITS.NUMBER_MAX),
    }),
});

const selectFieldSchema = yup.object({
    key: yup.string().required(),
    label: yup.string().required().max(200),
    type: yup.string().oneOf(['select']).required(),
    required: yup.boolean().default(false),
    options: yup.array().of(yup.string().required()).max(LIMITS.MAX_SELECT_OPTIONS).required(),
});

const multiSelectFieldSchema = yup.object({
    key: yup.string().required(),
    label: yup.string().required().max(200),
    type: yup.string().oneOf(['multi_select']).required(),
    required: yup.boolean().default(false),
    options: yup.array().of(yup.string().required()).max(LIMITS.MAX_MULTI_SELECT_OPTIONS).required(),
});

const booleanFieldSchema = yup.object({
    key: yup.string().required(),
    label: yup.string().required().max(200),
    type: yup.string().oneOf(['boolean']).required(),
    required: yup.boolean().default(false),
});

const rangeFieldSchema = yup.object({
    key: yup.string().required(),
    label: yup.string().required().max(200),
    type: yup.string().oneOf(['range']).required(),
    required: yup.boolean().default(false),
    min: yup.number().min(LIMITS.RANGE_MIN).max(LIMITS.RANGE_MAX).required(),
    max: yup.number().min(LIMITS.RANGE_MIN).max(LIMITS.RANGE_MAX).required(),
});

const fieldSchema = yup.lazy((value) => {
    switch (value?.type) {
        case 'text': return textFieldSchema;
        case 'number': return numberFieldSchema;
        case 'select': return selectFieldSchema;
        case 'multi_select': return multiSelectFieldSchema;
        case 'boolean': return booleanFieldSchema;
        case 'range': return rangeFieldSchema;
        default: return yup.object({ type: yup.string().required() });
    }
});

const sectionSchema = yup.object({
    key: yup.string().required(),
    title: yup.string().required().max(200),
    description: yup.string().max(500),
    fields: yup.array().of(fieldSchema).min(1).max(LIMITS.MAX_FIELDS_PER_SECTION).required(),
});

const stepSchema = yup.object({
    key: yup.string().required(),
    title: yup.string().required().max(200),
    description: yup.string().max(500),
    sections: yup.array().of(sectionSchema).min(1).max(LIMITS.MAX_SECTIONS_PER_STEP).required(),
});

export const formConfigSchema = yup.object({
    title: yup.string().required().max(200),
    description: yup.string().max(500),
    steps: yup.array().of(stepSchema).min(1).max(LIMITS.MAX_STEPS).required(),
});

export async function validateFormConfig(config: unknown): Promise<{ valid: boolean; errors: string[] }> {
    try {
        await formConfigSchema.validate(config, { abortEarly: false });
        return { valid: true, errors: [] };
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            return { valid: false, errors: err.errors };
        }
        return { valid: false, errors: ['Unknown validation error'] };
    }
}
