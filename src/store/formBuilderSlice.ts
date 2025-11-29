import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormConfig, FieldType, FormField } from '../apps/Formlyst/helpers/types';
import { createEmptyForm, getAllKeys, createStep, createSection, createField } from '../apps/Formlyst/helpers/utils';

// ============================================
// STATE
// ============================================

export interface FormBuilderState {
    formConfig: FormConfig;
    path: string[];
    isDirty: boolean;
}

const initialState: FormBuilderState = {
    formConfig: createEmptyForm(),
    path: [],
    isDirty: false,
};

// ============================================
// SLICE
// ============================================

const formBuilderSlice = createSlice({
    name: 'formBuilder',
    initialState,
    reducers: {
        loadForm(state, { payload }: PayloadAction<FormConfig>) {
            state.formConfig = payload;
            state.path = [];
            state.isDirty = false;
        },
        resetForm: () => initialState,

        navigate(state, { payload }: PayloadAction<string[]>) {
            state.path = payload;
        },
        markClean(state) {
            state.isDirty = false;
        },

        // Form
        updateForm(state, { payload }: PayloadAction<{ title?: string; description?: string }>) {
            Object.assign(state.formConfig, payload);
            state.isDirty = true;
        },

        // Step
        addStep(state, { payload: title }: PayloadAction<string>) {
            const keys = getAllKeys(state.formConfig, 'step');
            state.formConfig.steps.push(createStep(title, keys));
            state.isDirty = true;
        },
        updateStep(state, { payload }: PayloadAction<{ key: string; title?: string; description?: string }>) {
            const step = state.formConfig.steps.find(s => s.key === payload.key);
            if (step) {
                if (payload.title !== undefined) step.title = payload.title;
                if (payload.description !== undefined) step.description = payload.description;
                state.isDirty = true;
            }
        },
        removeStep(state, { payload: key }: PayloadAction<string>) {
            state.formConfig.steps = state.formConfig.steps.filter(s => s.key !== key);
            if (state.path[0] === key) state.path = [];
            state.isDirty = true;
        },

        // Section
        addSection(state, { payload }: PayloadAction<{ stepKey: string; title: string }>) {
            const step = state.formConfig.steps.find(s => s.key === payload.stepKey);
            if (!step) return;
            const keys = getAllKeys(state.formConfig, 'section');
            step.sections.push(createSection(payload.title, keys));
            state.isDirty = true;
        },
        updateSection(state, { payload }: PayloadAction<{ stepKey: string; sectionKey: string; title?: string; description?: string }>) {
            const step = state.formConfig.steps.find(s => s.key === payload.stepKey);
            const section = step?.sections.find(s => s.key === payload.sectionKey);
            if (section) {
                if (payload.title !== undefined) section.title = payload.title;
                if (payload.description !== undefined) section.description = payload.description;
                state.isDirty = true;
            }
        },
        removeSection(state, { payload }: PayloadAction<{ stepKey: string; sectionKey: string }>) {
            const step = state.formConfig.steps.find(s => s.key === payload.stepKey);
            if (!step) return;
            step.sections = step.sections.filter(s => s.key !== payload.sectionKey);
            if (state.path[1] === payload.sectionKey) state.path = [payload.stepKey];
            state.isDirty = true;
        },

        // Field
        addField(state, { payload }: PayloadAction<{ stepKey: string; sectionKey: string; type: FieldType; label: string }>) {
            const step = state.formConfig.steps.find(s => s.key === payload.stepKey);
            const section = step?.sections.find(s => s.key === payload.sectionKey);
            if (!section) return;
            const keys = getAllKeys(state.formConfig, 'field');
            section.fields.push(createField(payload.type, payload.label, keys));
            state.isDirty = true;
        },
        updateField(state, { payload }: PayloadAction<{ stepKey: string; sectionKey: string; fieldKey: string; updates: Partial<FormField> }>) {
            const step = state.formConfig.steps.find(s => s.key === payload.stepKey);
            const section = step?.sections.find(s => s.key === payload.sectionKey);
            if (!section) return;
            const idx = section.fields.findIndex(f => f.key === payload.fieldKey);
            if (idx !== -1) section.fields[idx] = { ...section.fields[idx], ...payload.updates } as FormField;
            state.isDirty = true;
        },
        removeField(state, { payload }: PayloadAction<{ stepKey: string; sectionKey: string; fieldKey: string }>) {
            const step = state.formConfig.steps.find(s => s.key === payload.stepKey);
            const section = step?.sections.find(s => s.key === payload.sectionKey);
            if (!section) return;
            section.fields = section.fields.filter(f => f.key !== payload.fieldKey);
            if (state.path[2] === payload.fieldKey) state.path = [payload.stepKey, payload.sectionKey];
            state.isDirty = true;
        },

        reorderSteps(state, { payload }: PayloadAction<{ fromIndex: number; toIndex: number }>) {
            const [moved] = state.formConfig.steps.splice(payload.fromIndex, 1);
            state.formConfig.steps.splice(payload.toIndex, 0, moved);
            state.isDirty = true;
        },

        reorderSections(state, { payload }: PayloadAction<{ stepKey: string; fromIndex: number; toIndex: number }>) {
            const step = state.formConfig.steps.find(s => s.key === payload.stepKey);
            if (!step) return;
            const [moved] = step.sections.splice(payload.fromIndex, 1);
            step.sections.splice(payload.toIndex, 0, moved);
            state.isDirty = true;
        },

        reorderFields(state, { payload }: PayloadAction<{ stepKey: string; sectionKey: string; fromIndex: number; toIndex: number }>) {
            const step = state.formConfig.steps.find(s => s.key === payload.stepKey);
            const section = step?.sections.find(s => s.key === payload.sectionKey);
            if (!section) return;
            const [moved] = section.fields.splice(payload.fromIndex, 1);
            section.fields.splice(payload.toIndex, 0, moved);
            state.isDirty = true;
        },
    },
});

export const {
    loadForm,
    resetForm,
    navigate,
    markClean,
    updateForm,
    addStep,
    updateStep,
    removeStep,
    addSection,
    updateSection,
    removeSection,
    addField,
    updateField,
    removeField,
    reorderFields,
    reorderSections,
    reorderSteps
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;