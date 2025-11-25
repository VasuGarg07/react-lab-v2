// ============================================
// PRIMITIVE TYPES
// ============================================

export type FieldType = 'text' | 'number' | 'select' | 'multi_select' | 'boolean' | 'range';

export type EntityType = 'form' | 'step' | 'section' | 'field';

// ============================================
// FIELD DEFINITIONS
// ============================================

interface BaseField {
    key: string;
    label: string;
    type: FieldType;
    required: boolean;
}

export interface TextField extends BaseField {
    type: 'text';
    validation?: {
        minLength?: number;
        maxLength?: number;
        regex?: string;
    };
}

export interface NumberField extends BaseField {
    type: 'number';
    validation?: {
        minValue?: number;
        maxValue?: number;
    };
}

export interface SelectField extends BaseField {
    type: 'select';
    options: string[];
}

export interface MultiSelectField extends BaseField {
    type: 'multi_select';
    options: string[];
}

export interface BooleanField extends BaseField {
    type: 'boolean';
}

export interface RangeField extends BaseField {
    type: 'range';
    min: number;
    max: number;
}

export type FormField =
    | TextField
    | NumberField
    | SelectField
    | MultiSelectField
    | BooleanField
    | RangeField;

// ============================================
// FORM STRUCTURE
// ============================================

export interface FormSection {
    key: string;
    title: string;
    description?: string;
    fields: FormField[];
}

export interface FormStep {
    key: string;
    title: string;
    description?: string;
    sections: FormSection[];
}

export interface FormConfig {
    title: string;
    description?: string;
    steps: FormStep[];
}

// ============================================
// API TYPES
// ============================================

export interface Form extends FormConfig {
    id: string;
    shareUrl: string;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    responseCount: number;
}

export interface FormResponse {
    id: string;
    formId: string;
    responses: Record<string, unknown>;
    ipAddress: string;
    submittedAt: string;
    userAgent?: string;
}

// ============================================
// NAVIGATION
// ============================================

export interface BreadcrumbItem {
    key: string;
    label: string;
    type: EntityType;
    path: string[];
}

export interface TreeNode {
    key: string;
    label: string;
    type: EntityType;
    children?: TreeNode[];
}