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

// Entity accent families — cohesive plum → violet → berry → champagne.
// (blue/violet/emerald/amber utility names are remapped to these hues in index.css)
export const ENTITY_COLORS: Record<EntityType, { bg: string; text: string; border: string; solid: string; ring: string }> = {
    form: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        solid: 'bg-blue-600',
        ring: 'ring-blue-500/20',
    },
    step: {
        bg: 'bg-violet-50',
        text: 'text-violet-700',
        border: 'border-violet-200',
        solid: 'bg-violet-600',
        ring: 'ring-violet-500/20',
    },
    section: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        solid: 'bg-emerald-600',
        ring: 'ring-emerald-500/20',
    },
    field: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        solid: 'bg-amber-500',
        ring: 'ring-amber-500/20',
    },
};

export const formQueryKeys = {
    forms: ['forms'] as const,
    form: (id: string) => ['forms', id] as const,
    publicForm: (shareUrl: string) => ['publicForm', shareUrl] as const,
    responses: (formId: string) => ['responses', formId] as const,
    response: (responseId: string) => ['response', responseId] as const,
};
