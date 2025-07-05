import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FormConfig, FormResponseStore } from './fb.types';
import { persist } from 'zustand/middleware';
import createDebouncedStorage from '@/shared/debouncedStorage';

// Create the minimal store
export const useFormResponseStore = create<FormResponseStore>()(
    persist(
        immer((set, _) => ({
            // Initial state
            formConfig: null,
            responses: {},
            currentStep: 0,
            isLoading: false,
            isSubmitting: false,
            submitError: null,

            // Core actions
            setFormConfig: (config: FormConfig) => {
                set((state) => {
                    state.formConfig = config;
                    state.currentStep = 0;
                    state.responses = {};
                    state.submitError = null;
                });
            },

            updateResponse: (fieldKey: string, value: any) => {
                set((state) => {
                    state.responses[fieldKey] = value;
                });
            },

            setCurrentStep: (step: number) => {
                set((state) => {
                    const maxStep = (state.formConfig?.steps.length || 1) - 1;
                    state.currentStep = Math.max(0, Math.min(step, maxStep));
                });
            },

            nextStep: () => {
                set((state) => {
                    const maxStep = (state.formConfig?.steps.length || 1) - 1;
                    if (state.currentStep < maxStep) {
                        state.currentStep += 1;
                    }
                });
            },

            prevStep: () => {
                set((state) => {
                    if (state.currentStep > 0) {
                        state.currentStep -= 1;
                    }
                });
            },

            // UI actions
            setLoading: (loading: boolean) => {
                set((state) => {
                    state.isLoading = loading;
                });
            },

            setSubmitting: (submitting: boolean) => {
                set((state) => {
                    state.isSubmitting = submitting;
                });
            },

            setSubmitError: (error: string | null) => {
                set((state) => {
                    state.submitError = error;
                });
            },

            // Reset
            resetForm: () => {
                set((state) => {
                    state.formConfig = null;
                    state.responses = {};
                    state.currentStep = 0;
                    state.isLoading = false;
                    state.isSubmitting = false;
                    state.submitError = null;
                });
            },
        })),
        {
            name: 'form-response-storage', // localStorage key
            storage: createDebouncedStorage(3000), // 3 second debounce
            partialize: (state) => ({
                formConfig: state.formConfig,
                responses: state.responses
            }), // Only persist formConfig and responses
        }
    )
);

// Minimal selector hooks
export const useResponseFormConfig = () => useFormResponseStore(state => state.formConfig);
export const useFormResponses = () => useFormResponseStore(state => state.responses);
export const useResponseCurrentStep = () => useFormResponseStore(state => state.currentStep);
export const useIsResponseLoading = () => useFormResponseStore(state => state.isLoading);
export const useIsResponseSubmitting = () => useFormResponseStore(state => state.isSubmitting);
export const useResponseSubmitError = () => useFormResponseStore(state => state.submitError);

// Minimal action hooks
export const useResponseActions = () => {
    const setFormConfig = useFormResponseStore(state => state.setFormConfig);
    const updateResponse = useFormResponseStore(state => state.updateResponse);
    const resetForm = useFormResponseStore(state => state.resetForm);

    return {
        setFormConfig,
        updateResponse,
        resetForm
    };
};

export const useResponseNavigation = () => {
    const currentStep = useFormResponseStore(state => state.currentStep);
    const setCurrentStep = useFormResponseStore(state => state.setCurrentStep);
    const nextStep = useFormResponseStore(state => state.nextStep);
    const prevStep = useFormResponseStore(state => state.prevStep);

    return {
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep
    };
};

export const useResponseUI = () => {
    const isLoading = useFormResponseStore(state => state.isLoading);
    const isSubmitting = useFormResponseStore(state => state.isSubmitting);
    const submitError = useFormResponseStore(state => state.submitError);
    const setLoading = useFormResponseStore(state => state.setLoading);
    const setSubmitting = useFormResponseStore(state => state.setSubmitting);
    const setSubmitError = useFormResponseStore(state => state.setSubmitError);

    return {
        isLoading,
        isSubmitting,
        submitError,
        setLoading,
        setSubmitting,
        setSubmitError
    };
};

// Simple field hook
export const useResponseFormField = (fieldKey: string) => {
    const value = useFormResponseStore(state => state.responses[fieldKey]);
    const updateResponse = useFormResponseStore(state => state.updateResponse);

    return {
        value,
        updateValue: (newValue: any) => updateResponse(fieldKey, newValue)
    };
};