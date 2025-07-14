// Form Entity Types
export type EntityType = 'step' | 'section' | 'field';

// Field Types (using const assertion instead of enum)
export type FieldType = 'text' | 'number' | 'select' | 'multi_select' | 'boolean' | 'range';

// Base Field Interface
export interface BaseField {
    key: string;
    label: string;
    type: FieldType;
    required: boolean;
}

// Validation Configuration
export interface ValidationConfig {
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    regex?: string;
}

// Specific Field Interfaces
export interface TextField extends BaseField {
    type: 'text';
    validation?: Pick<ValidationConfig, 'minLength' | 'maxLength' | 'regex'>;
}

export interface NumberField extends BaseField {
    type: 'number';
    validation?: Pick<ValidationConfig, 'minValue' | 'maxValue'>;
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

// Union type for all field types
export type FormField = TextField | NumberField | SelectField | MultiSelectField | BooleanField | RangeField;

// Section Interface
export interface FormSection {
    key: string;
    title: string;
    description?: string;
    fields: FormField[];
}

// Step Interface
export interface FormStep {
    key: string;
    title: string;
    description?: string;
    sections: FormSection[];
}

// Form Configuration Interface
export interface FormConfig {
    title: string;
    description?: string;
    steps: FormStep[];
}

// Navigation Types
export type ViewType = 'form' | EntityType;

export interface BreadcrumbItem {
    key: string;
    label: string;
    type: ViewType;
    path: string[];
}

export interface TreeNode {
    key: string;
    label: string;
    type: ViewType;
    children?: TreeNode[];
    isActive?: boolean;
    isExpanded?: boolean;
}

// ---------- BACKEND TYPES ----------

// Form Interface (with sharing URL)
export interface Form extends FormConfig {
    id: string;
    shareUrl: string;
    isActive: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    responseCount: number;
}

// Form Response Interface
export interface FormResponse {
    id: string;
    formId: string;
    responses: Record<string, any>;
    ipAddress: string
    submittedAt: Date;
    userAgent?: string;
}

// ---------- STORE INTERFACE --------

export interface FormBuilderStore {
    // Form State
    formConfig: FormConfig;
    isDirty: boolean;
    lastSaved: Date | null;

    // Navigation state
    currentView: ViewType;
    currentPath: string[];

    // Form actions
    createForm: (title: string, description?: string) => void;
    updateForm: (updates: { title?: string; description?: string }) => void;
    loadForm: (config: FormConfig) => void;
    resetForm: () => void;

    // Step actions
    addStep: (title: string, description?: string) => void;
    removeStep: (stepKey: string) => void;
    updateStep: (stepKey: string, updates: { title?: string; description?: string, key?: string }) => void;

    // Section actions
    addSection: (stepKey: string, title: string, description?: string) => void;
    removeSection: (stepKey: string, sectionKey: string) => void;
    updateSection: (stepKey: string, sectionKey: string, updates: { title?: string; description?: string, key?: string }) => void;

    // Field actions
    addField: (stepKey: string, sectionKey: string, fieldType: FieldType, label: string) => void;
    removeField: (stepKey: string, sectionKey: string, fieldKey: string) => void;
    updateField: (stepKey: string, sectionKey: string, fieldKey: string, updates: Partial<FormField>) => void;

    // Option actions (for select/multi_select fields)
    addOption: (stepKey: string, sectionKey: string, fieldKey: string, option: string) => void;
    removeOption: (stepKey: string, sectionKey: string, fieldKey: string, optionIndex: number) => void;
    updateOption: (stepKey: string, sectionKey: string, fieldKey: string, optionIndex: number, newOption: string) => void;

    // Navigation actions
    navigateToForm: () => void;
    navigateToStep: (stepKey: string) => void;
    navigateToSection: (stepKey: string, sectionKey: string) => void;
    navigateToField: (stepKey: string, sectionKey: string, fieldKey: string) => void;

    // Utility actions
    exportConfig: () => string;
    importConfig: (jsonString: string) => boolean;
    findField: (fieldKey: string) => { stepKey: string; sectionKey: string; field: FormField } | null;
    markSaved: () => void;
    forceSync: () => void; // Force immediate save
}

export interface FormResponseStore {
    // Core State
    formConfig: FormConfig | null;
    responses: Record<string, any>; // fieldKey -> value
    currentStep: number;

    // UI State
    isLoading: boolean;
    isSubmitting: boolean;
    submitError: string | null;

    // Core Actions
    setFormConfig: (config: FormConfig) => void;
    updateResponse: (fieldKey: string, value: any) => void;
    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;

    // UI Actions
    setLoading: (loading: boolean) => void;
    setSubmitting: (submitting: boolean) => void;
    setSubmitError: (error: string | null) => void;

    // Reset
    resetForm: () => void;
}
