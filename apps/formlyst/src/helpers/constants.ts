import type { FieldType, EntityType } from './types';

export const LIMITS = {
    MAX_STEPS: 6,
    MAX_SECTIONS_PER_STEP: 5,
    MAX_FIELDS_PER_SECTION: 10,
    MAX_SELECT_OPTIONS: 4,
    MAX_MULTI_SELECT_OPTIONS: 6,
    TEXT_MAX_LENGTH: 500,
    NUMBER_MIN: -999999,
    NUMBER_MAX: 999999,
    RANGE_MIN: 1,
    RANGE_MAX: 100,
} as const;

export const FIELD_TYPE_OPTIONS: { value: FieldType; label: string }[] = [
    { value: 'text', label: 'Text Field' },
    { value: 'number', label: 'Number Field' },
    { value: 'select', label: 'Single Select' },
    { value: 'multi_select', label: 'Multi Select' },
    { value: 'boolean', label: 'Yes/No Toggle' },
    { value: 'range', label: 'Range Slider' },
];

export const ENTITY_COLORS: Record<EntityType, { bg: string; text: string; border: string }> = {
    form: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800',
    },
    step: {
        bg: 'bg-violet-50 dark:bg-violet-900/20',
        text: 'text-violet-700 dark:text-violet-300',
        border: 'border-violet-200 dark:border-violet-800',
    },
    section: {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-200 dark:border-emerald-800',
    },
    field: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-200 dark:border-amber-800',
    },
};

export const formQueryKeys = {
    forms: ['forms'] as const,
    form: (id: string) => ['forms', id] as const,
    publicForm: (shareUrl: string) => ['publicForm', shareUrl] as const,
    responses: (formId: string) => ['responses', formId] as const,
    response: (responseId: string) => ['response', responseId] as const,
};
