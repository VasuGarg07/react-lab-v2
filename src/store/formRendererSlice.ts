import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormConfig } from '../apps/Formlyst/helpers/types';

// ============================================
// STATE
// ============================================

export interface FormResponseState {
    formConfig: FormConfig | null;
    responses: Record<string, unknown>;
    currentStepIndex: number;
}

const initialState: FormResponseState = {
    formConfig: null,
    responses: {},
    currentStepIndex: 0,
};

// ============================================
// SLICE
// ================dont ============================

const formResponseSlice = createSlice({
    name: 'formResponse',
    initialState,
    reducers: {
        loadForm(state, { payload }: PayloadAction<FormConfig>) {
            state.formConfig = payload;
            state.responses = {};
            state.currentStepIndex = 0;
        },
        resetForm: () => initialState,

        setResponse(state, { payload }: PayloadAction<{ key: string; value: unknown }>) {
            state.responses[payload.key] = payload.value;
        },
        setResponses(state, { payload }: PayloadAction<Record<string, unknown>>) {
            Object.assign(state.responses, payload);
        },

        nextStep(state) {
            if (!state.formConfig) return;
            if (state.currentStepIndex < state.formConfig.steps.length - 1) {
                state.currentStepIndex++;
            }
        },
        prevStep(state) {
            if (state.currentStepIndex > 0) {
                state.currentStepIndex--;
            }
        },
        goToStep(state, { payload }: PayloadAction<number>) {
            if (!state.formConfig) return;
            if (payload >= 0 && payload < state.formConfig.steps.length) {
                state.currentStepIndex = payload;
            }
        },
    },
});

export const {
    loadForm,
    resetForm,
    setResponse,
    setResponses,
    nextStep,
    prevStep,
    goToStep,
} = formResponseSlice.actions;

export default formResponseSlice.reducer;