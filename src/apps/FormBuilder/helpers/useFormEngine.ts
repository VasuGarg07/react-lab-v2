import createDebouncedStorage from '@/shared/debouncedStorage';
import { toastService } from "@/shared/toastr";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { FORM_LIMITS } from './fb.constants';
import { FieldType, FormBuilderStore, FormConfig, FormField, ViewType } from './fb.types';
import { KeyUtils, FormFactory, NavigationUtils } from './fb.utils';
import { useMemo } from 'react';

//  Store
export const useFormBuilderStore = create<FormBuilderStore>()(
    persist(
        immer((set, get) => ({
            // Initial state
            formConfig: FormFactory.createEmptyForm(),
            isDirty: false,
            lastSaved: null,
            currentView: 'form' as ViewType,
            currentPath: [] as string[],

            // Form actions
            createForm: (title: string, description?: string) => {
                set((state) => {
                    state.formConfig = { title, description: description || '', steps: [] };
                    state.isDirty = true;
                });
            },

            updateForm: (updates: { title?: string; description?: string }) => {
                set((state) => {
                    if (updates.title !== undefined) state.formConfig.title = updates.title;
                    if (updates.description !== undefined) state.formConfig.description = updates.description;
                    state.isDirty = true;
                });
            },

            loadForm: (config: FormConfig) => {
                set((state) => {
                    state.formConfig = config;
                    state.isDirty = false;
                });
            },

            resetForm: () => {
                set((state) => {
                    state.formConfig = FormFactory.createEmptyForm();
                    state.isDirty = false;
                    state.lastSaved = null;
                });
            },

            // Step actions
            addStep: (title?: string, description?: string) => {
                set((state) => {
                    if (state.formConfig.steps.length >= FORM_LIMITS.MAX_STEPS) {
                        toastService.error(`Maximum ${FORM_LIMITS.MAX_STEPS} steps allowed`);
                        return;
                    }

                    const stepTitle = title || FormFactory.getDefaultStepLabel(state.formConfig.steps.length);
                    const stepDescription = description || '';
                    const existingKeys = KeyUtils.getAllKeys(state.formConfig, 'step');

                    state.formConfig.steps.push(FormFactory.createStep(stepTitle, stepDescription, existingKeys));
                    state.isDirty = true;
                });
            },

            removeStep: (stepKey: string) => {
                set((state) => {
                    const index = state.formConfig.steps.findIndex(step => step.key === stepKey);
                    if (index !== -1) {
                        state.formConfig.steps.splice(index, 1);
                        state.isDirty = true;
                    }
                });
            },

            updateStep: (stepKey: string, updates: { title?: string; description?: string; key?: string }) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (!step) return; // Early return if step not found

                    // Handle key updates with validation
                    if (updates.key !== undefined && updates.key !== step.key) {
                        const existingKeys = KeyUtils.getAllKeys(state.formConfig, 'step').filter(k => k !== stepKey);
                        if (existingKeys.includes(updates.key)) {
                            toastService.error('Key already exists');
                            return;
                        }
                        step.key = updates.key;
                    }

                    // Handle other updates
                    if (updates.title !== undefined) step.title = updates.title;
                    if (updates.description !== undefined) step.description = updates.description;

                    state.isDirty = true;
                });
            },

            // Section actions
            addSection: (stepKey: string, title?: string, description?: string) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (!step) {
                        toastService.error('Step not found');
                        return;
                    }

                    if (step.sections.length >= FORM_LIMITS.MAX_SECTIONS_PER_STEP) {
                        toastService.error(`Maximum ${FORM_LIMITS.MAX_SECTIONS_PER_STEP} sections allowed per step`);
                        return;
                    }

                    const sectionTitle = title || FormFactory.getDefaultSectionLabel(step.sections.length);
                    const sectionDescription = description || '';
                    const existingKeys = KeyUtils.getAllKeys(state.formConfig, 'section');

                    step.sections.push(FormFactory.createSection(sectionTitle, sectionDescription, existingKeys));
                    state.isDirty = true;
                });
            },

            removeSection: (stepKey: string, sectionKey: string) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (step) {
                        const index = step.sections.findIndex(section => section.key === sectionKey);
                        if (index !== -1) {
                            step.sections.splice(index, 1);
                            state.isDirty = true;
                        }
                    }
                });
            },

            updateSection: (stepKey: string, sectionKey: string, updates: { title?: string; description?: string; key?: string }) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (!step) return;

                    const section = step.sections.find(s => s.key === sectionKey);
                    if (!section) return;

                    // Handle key updates with validation
                    if (updates.key !== undefined && updates.key !== section.key) {
                        const existingKeys = KeyUtils.getAllKeys(state.formConfig, 'section').filter(k => k !== sectionKey);
                        if (existingKeys.includes(updates.key)) {
                            toastService.error('Key already exists');
                            return;
                        }
                        section.key = updates.key;
                    }

                    // Handle other updates
                    if (updates.title !== undefined) section.title = updates.title;
                    if (updates.description !== undefined) section.description = updates.description;

                    state.isDirty = true;
                });
            },

            // Field actions
            addField: (stepKey: string, sectionKey: string, fieldType: FieldType, label?: string) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (!step) {
                        toastService.error('Step not found');
                        return;
                    }

                    const section = step.sections.find(s => s.key === sectionKey);
                    if (!section) {
                        toastService.error('Section not found');
                        return;
                    }

                    if (section.fields.length >= FORM_LIMITS.MAX_FIELDS_PER_SECTION) {
                        toastService.error(`Maximum ${FORM_LIMITS.MAX_FIELDS_PER_SECTION} fields allowed per section`);
                        return;
                    }

                    const fieldLabel = label || FormFactory.getDefaultFieldLabel(fieldType);
                    const existingKeys = KeyUtils.getAllKeys(state.formConfig, 'field');

                    section.fields.push(FormFactory.createField(fieldType, fieldLabel, existingKeys));
                    state.isDirty = true;
                });
            },

            removeField: (stepKey: string, sectionKey: string, fieldKey: string) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (step) {
                        const section = step.sections.find(s => s.key === sectionKey);
                        if (section) {
                            const index = section.fields.findIndex(field => field.key === fieldKey);
                            if (index !== -1) {
                                section.fields.splice(index, 1);
                                state.isDirty = true;
                            }
                        }
                    }
                });
            },

            updateField: (stepKey: string, sectionKey: string, fieldKey: string, updates: Partial<FormField>) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (!step) return;

                    const section = step.sections.find(s => s.key === sectionKey);
                    if (!section) return;

                    const field = section.fields.find(f => f.key === fieldKey);
                    if (!field) return;

                    // Handle key updates with validation
                    if (updates.key !== undefined && updates.key !== field.key) {
                        const existingKeys = KeyUtils.getAllKeys(state.formConfig, 'field').filter(k => k !== fieldKey);
                        if (existingKeys.includes(updates.key)) {
                            toastService.error('Key already exists');
                            return;
                        }
                    }

                    Object.assign(field, updates);
                    state.isDirty = true;
                });
            },

            // Option actions
            addOption: (stepKey: string, sectionKey: string, fieldKey: string, option: string) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (!step) {
                        toastService.error('Step not found');
                        return;
                    }

                    const section = step.sections.find(s => s.key === sectionKey);
                    if (!section) {
                        toastService.error('Section not found');
                        return;
                    }

                    const field = section.fields.find(f => f.key === fieldKey);
                    if (!field) {
                        toastService.error('Field not found');
                        return;
                    }

                    if (field.type !== 'select' && field.type !== 'multi_select') {
                        toastService.error('Field type does not support options');
                        return;
                    }

                    const maxOptions = field.type === 'select' ? FORM_LIMITS.MAX_RADIO_OPTIONS : FORM_LIMITS.MAX_CHECKBOX_OPTIONS;
                    if (field.options.length >= maxOptions) {
                        toastService.error(`Maximum ${maxOptions} options allowed`);
                        return;
                    }

                    field.options.push(option);
                    state.isDirty = true;
                });
            },

            removeOption: (stepKey: string, sectionKey: string, fieldKey: string, optionIndex: number) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (step) {
                        const section = step.sections.find(s => s.key === sectionKey);
                        if (section) {
                            const field = section.fields.find(f => f.key === fieldKey);
                            if (field && (field.type === 'select' || field.type === 'multi_select')) {
                                if (optionIndex >= 0 && optionIndex < field.options.length) {
                                    field.options.splice(optionIndex, 1);
                                    state.isDirty = true;
                                }
                            }
                        }
                    }
                });
            },

            updateOption: (stepKey: string, sectionKey: string, fieldKey: string, optionIndex: number, newOption: string) => {
                set((state) => {
                    const step = state.formConfig.steps.find(s => s.key === stepKey);
                    if (step) {
                        const section = step.sections.find(s => s.key === sectionKey);
                        if (section) {
                            const field = section.fields.find(f => f.key === fieldKey);
                            if (field && (field.type === 'select' || field.type === 'multi_select')) {
                                if (optionIndex >= 0 && optionIndex < field.options.length) {
                                    field.options[optionIndex] = newOption;
                                    state.isDirty = true;
                                }
                            }
                        }
                    }
                });
            },

            // Navigation actions
            navigateToForm: () => {
                set((state) => {
                    state.currentView = 'form';
                    state.currentPath = [];
                });
            },

            navigateToStep: (stepKey: string) => {
                set((state) => {
                    state.currentView = 'step';
                    state.currentPath = [stepKey];
                });
            },

            navigateToSection: (stepKey: string, sectionKey: string) => {
                set((state) => {
                    state.currentView = 'section';
                    state.currentPath = [stepKey, sectionKey];
                });
            },

            navigateToField: (stepKey: string, sectionKey: string, fieldKey: string) => {
                set((state) => {
                    state.currentView = 'field';
                    state.currentPath = [stepKey, sectionKey, fieldKey];
                });
            },

            // Utility actions
            exportConfig: () => {
                return JSON.stringify(get().formConfig, null, 2);
            },

            importConfig: (jsonString: string) => {
                try {
                    const config = JSON.parse(jsonString) as FormConfig;
                    set((state) => {
                        state.formConfig = config;
                        state.isDirty = true;
                    });
                    toastService.success("Configuration loaded.")
                    return true;
                } catch (error) {
                    console.error('Invalid JSON configuration:', error);
                    toastService.error("Invalid JSON configuration")
                    return false;
                }
            },

            findField: (fieldKey: string) => {
                const { formConfig } = get();
                for (const step of formConfig.steps) {
                    for (const section of step.sections) {
                        const field = section.fields.find(f => f.key === fieldKey);
                        if (field) {
                            return { stepKey: step.key, sectionKey: section.key, field };
                        }
                    }
                }
                return null;
            },

            markSaved: () => {
                set((state) => {
                    state.isDirty = false;
                    state.lastSaved = new Date();
                });
            },

            forceSync: () => {
                // Force immediate save by bypassing debounce
                const state = get();
                try {
                    localStorage.setItem('form-builder-storage', JSON.stringify({
                        state: {
                            formConfig: state.formConfig,
                            lastSaved: new Date(),
                        },
                        version: 0,
                    }));
                    console.log('Force saved to localStorage');
                    set((state) => {
                        state.isDirty = false;
                        state.lastSaved = new Date();
                    });
                } catch (error) {
                    console.error('Failed to force save:', error);
                }
            },
        })),
        {
            name: 'form-builder-storage', // localStorage key
            storage: createDebouncedStorage(3000), // 3 second debounce
            partialize: (state) => ({
                formConfig: state.formConfig,
                lastSaved: state.lastSaved,
            }), // Only persist formConfig and lastSaved
        }
    )
);

// Selector hooks for better performance
export const useFormConfig = () => useFormBuilderStore(state => state.formConfig);
export const useFormTitle = () => useFormBuilderStore(state => state.formConfig.title);
export const useFormSteps = () => useFormBuilderStore(state => state.formConfig.steps);
export const useIsDirty = () => useFormBuilderStore(state => state.isDirty);
export const useLastSaved = () => useFormBuilderStore(state => state.lastSaved);

// Navigation selectors
export const useCurrentView = () => useFormBuilderStore(state => state.currentView);
export const useCurrentPath = () => useFormBuilderStore(state => state.currentPath);

export const useBreadcrumbs = () => {
    const formConfig = useFormBuilderStore(state => state.formConfig);
    const currentPath = useFormBuilderStore(state => state.currentPath);

    return useMemo(() => {
        return NavigationUtils.buildBreadcrumbPath(formConfig, currentPath);
    }, [formConfig, currentPath]);
};

export const useTreeStructure = () => {
    const formConfig = useFormBuilderStore(state => state.formConfig);
    const currentView = useFormBuilderStore(state => state.currentView);
    const currentPath = useFormBuilderStore(state => state.currentPath);

    return useMemo(() => {
        return NavigationUtils.buildTreeStructure(formConfig, currentView, currentPath);
    }, [formConfig, currentView, currentPath]);
};

// Form CRUD Operations Hook
export const useFormActions = () => {
    const createForm = useFormBuilderStore(state => state.createForm);
    const updateForm = useFormBuilderStore(state => state.updateForm);
    const loadForm = useFormBuilderStore(state => state.loadForm);
    const resetForm = useFormBuilderStore(state => state.resetForm);
    const addStep = useFormBuilderStore(state => state.addStep);
    const removeStep = useFormBuilderStore(state => state.removeStep);
    const updateStep = useFormBuilderStore(state => state.updateStep);
    const addSection = useFormBuilderStore(state => state.addSection);
    const removeSection = useFormBuilderStore(state => state.removeSection);
    const updateSection = useFormBuilderStore(state => state.updateSection);
    const addField = useFormBuilderStore(state => state.addField);
    const removeField = useFormBuilderStore(state => state.removeField);
    const updateField = useFormBuilderStore(state => state.updateField);
    const addOption = useFormBuilderStore(state => state.addOption);
    const removeOption = useFormBuilderStore(state => state.removeOption);
    const updateOption = useFormBuilderStore(state => state.updateOption);

    return {
        createForm,
        updateForm,
        loadForm,
        resetForm,
        addStep,
        removeStep,
        updateStep,
        addSection,
        removeSection,
        updateSection,
        addField,
        removeField,
        updateField,
        addOption,
        removeOption,
        updateOption
    };
};

// Form Utilities Hook
export const useFormUtils = () => {
    const exportConfig = useFormBuilderStore(state => state.exportConfig);
    const importConfig = useFormBuilderStore(state => state.importConfig);
    const findField = useFormBuilderStore(state => state.findField);
    const markSaved = useFormBuilderStore(state => state.markSaved);
    const forceSync = useFormBuilderStore(state => state.forceSync);

    return {
        exportConfig,
        importConfig,
        findField,
        markSaved,
        forceSync
    };
};

// Navigation actions hook
export const useNavigation = () => {
    const navigateToForm = useFormBuilderStore(state => state.navigateToForm);
    const navigateToStep = useFormBuilderStore(state => state.navigateToStep);
    const navigateToSection = useFormBuilderStore(state => state.navigateToSection);
    const navigateToField = useFormBuilderStore(state => state.navigateToField);

    return {
        navigateToForm,
        navigateToStep,
        navigateToSection,
        navigateToField
    };
};
