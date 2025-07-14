// Form Structure Limits
export const FORM_LIMITS = {
    MAX_STEPS: 6,
    MAX_SECTIONS_PER_STEP: 5,
    MAX_FIELDS_PER_SECTION: 10,
    MIN_CHAR_LENGTH: 1,
    MAX_CHAR_LENGTH: 200,
    MAX_RADIO_OPTIONS: 4,
    MAX_CHECKBOX_OPTIONS: 6,
    RANGE_MIN: 1,
    RANGE_MAX: 100,
} as const;

// Field Validation Limits
export const VALIDATION_LIMITS = {
    TEXT_MIN_LENGTH: 1,
    TEXT_MAX_LENGTH: 500,
    NUMBER_MIN_VALUE: -999999,
    NUMBER_MAX_VALUE: 999999,
} as const;

// Field Types
export const FIELD_TYPES = {
    TEXT: 'text',
    NUMBER: 'number',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    BOOLEAN: 'boolean',
    RANGE: 'range',
} as const;