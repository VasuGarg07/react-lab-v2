import { BreadcrumbItem, EntityType, FieldType, FormConfig, FormField, FormSection, FormStep, TreeNode, ViewType } from "./fb.types";

// Key Generation and Validation Utilities
export namespace KeyUtils {
    export const generateSafeKey = (label: string, type: EntityType, existingKeys: string[] = []): string => {
        // Clean the label
        let baseKey = label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/(^_|_$)/g, '')
            .substring(0, 50); // Limit length

        // Add type prefix
        baseKey = `${type}_${baseKey}`;

        // Handle duplicates
        let counter = 1;
        let finalKey = baseKey;
        while (existingKeys.includes(finalKey)) {
            finalKey = `${baseKey}_${counter}`;
            counter++;
        }

        return finalKey;
    };

    export const getAllKeys = (formConfig: FormConfig, type: EntityType): string[] => {
        const keys: string[] = [];

        switch (type) {
            case 'step':
                return formConfig.steps.map(step => step.key);
            case 'section':
                formConfig.steps.forEach(step => {
                    step.sections.forEach(section => {
                        keys.push(section.key);
                    });
                });
                return keys;
            case 'field':
            default:
                formConfig.steps.forEach(step => {
                    step.sections.forEach(section => {
                        section.fields.forEach(field => {
                            keys.push(field.key);
                        });
                    });
                });
                return keys;
        }
    };
}

// Factory Functions for Creating Form Entities
export namespace FormFactory {
    export const createEmptyForm = (): FormConfig => ({
        title: 'Untitled Form',
        description: '',
        steps: [],
    });

    export const createStep = (title: string, description: string = '', existingKeys: string[]): FormStep => ({
        key: KeyUtils.generateSafeKey(title, 'step', existingKeys),
        title,
        description,
        sections: [],
    });

    export const createSection = (title: string, description: string = '', existingKeys: string[]): FormSection => ({
        key: KeyUtils.generateSafeKey(title, 'section', existingKeys),
        title,
        description,
        fields: [],
    });

    export const createField = (fieldType: FieldType, label: string, existingKeys: string[]): FormField => {
        const baseField = {
            key: KeyUtils.generateSafeKey(label, 'field', existingKeys),
            label,
            required: false,
        };

        switch (fieldType) {
            case 'text':
                return { ...baseField, type: 'text' };
            case 'number':
                return { ...baseField, type: 'number' };
            case 'select':
                return { ...baseField, type: 'select', options: [] };
            case 'multi_select':
                return { ...baseField, type: 'multi_select', options: [] };
            case 'boolean':
                return { ...baseField, type: 'boolean' };
            case 'range':
                return { ...baseField, type: 'range', min: 1, max: 100 };
            default:
                return { ...baseField, type: 'text' };
        }
    };

    export const getDefaultStepLabel = (stepCount: number): string => `Step ${stepCount + 1}`;
    export const getDefaultSectionLabel = (sectionCount: number): string => `Section ${sectionCount + 1}`;
    export const getDefaultFieldLabel = (fieldType: FieldType): string => {
        const labelMap: Record<FieldType, string> = {
            text: 'Text Field',
            number: 'Number Field',
            select: 'Select Field',
            multi_select: 'Multi Select Field',
            boolean: 'Yes/No Field',
            range: 'Range Field'
        };
        return labelMap[fieldType];
    };
}

// Navigation Helper Functions
export namespace NavigationUtils {
    export const buildBreadcrumbPath = (formConfig: FormConfig, currentPath: string[]): BreadcrumbItem[] => {
        const breadcrumbs: BreadcrumbItem[] = [];

        // Always start with form root
        breadcrumbs.push({
            key: 'form',
            label: formConfig.title || 'Untitled Form',
            type: 'form',
            path: []
        });

        if (currentPath.length === 0) return breadcrumbs;

        // Add step
        if (currentPath.length >= 1) {
            const step = formConfig.steps.find(s => s.key === currentPath[0]);
            if (step) {
                breadcrumbs.push({
                    key: step.key,
                    label: step.title,
                    type: 'step',
                    path: [step.key]
                });
            }
        }

        // Add section
        if (currentPath.length >= 2) {
            const step = formConfig.steps.find(s => s.key === currentPath[0]);
            const section = step?.sections.find(s => s.key === currentPath[1]);
            if (section) {
                breadcrumbs.push({
                    key: section.key,
                    label: section.title,
                    type: 'section',
                    path: [currentPath[0], section.key]
                });
            }
        }

        // Add field
        if (currentPath.length >= 3) {
            const step = formConfig.steps.find(s => s.key === currentPath[0]);
            const section = step?.sections.find(s => s.key === currentPath[1]);
            const field = section?.fields.find(f => f.key === currentPath[2]);
            if (field) {
                breadcrumbs.push({
                    key: field.key,
                    label: field.label,
                    type: 'field',
                    path: [currentPath[0], currentPath[1], field.key]
                });
            }
        }

        return breadcrumbs;
    };

    export const buildTreeStructure = (formConfig: FormConfig, currentView: ViewType, currentPath: string[]): TreeNode[] => {
        const tree: TreeNode[] = [];

        // Form root
        const formNode: TreeNode = {
            key: 'form',
            label: formConfig.title || 'Untitled Form',
            type: 'form',
            isActive: currentView === 'form' && currentPath.length === 0,
            children: []
        };

        // Add steps
        formConfig.steps.forEach(step => {
            const stepNode: TreeNode = {
                key: step.key,
                label: step.title,
                type: 'step',
                isActive: currentView === 'step' && currentPath[0] === step.key,
                isExpanded: currentPath[0] === step.key,
                children: []
            };

            // Add sections
            step.sections.forEach(section => {
                const sectionNode: TreeNode = {
                    key: section.key,
                    label: section.title,
                    type: 'section',
                    isActive: currentView === 'section' && currentPath[1] === section.key,
                    isExpanded: currentPath[1] === section.key,
                    children: []
                };

                // Add fields
                section.fields.forEach(field => {
                    const fieldNode: TreeNode = {
                        key: field.key,
                        label: field.label,
                        type: 'field',
                        isActive: currentView === 'field' && currentPath[2] === field.key
                    };

                    sectionNode.children!.push(fieldNode);
                });

                stepNode.children!.push(sectionNode);
            });

            formNode.children!.push(stepNode);
        });

        tree.push(formNode);
        return tree;
    };
}

// File and URL Utilities
export namespace FileUtils {
    export const generateShareUrl = (formId: string): string => {
        return `${window.location.origin}/formlyst-public/${formId}/`;
    };

    export const formatDate = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        try {
            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }).format(date);
        } catch (error) {
            return date.toDateString();
        }
    };

    export const saveJson = (filename: string, data: string | object): void => {
        const jsonString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `${filename}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    export const saveCsv = (filename: string, data: any[], headers: string[]): void => {
        // Escape CSV values
        const escapeCSVValue = (value: any): string => {
            if (value === null || value === undefined) return '';

            let stringValue = String(value);

            // Handle arrays by joining with semicolon
            if (Array.isArray(value)) {
                stringValue = value.join('; ');
            }

            // Handle boolean values
            if (typeof value === 'boolean') {
                stringValue = value ? 'Yes' : 'No';
            }

            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            if (stringValue.includes('"')) {
                stringValue = stringValue.replace(/"/g, '""');
            }

            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
                stringValue = `"${stringValue}"`;
            }

            return stringValue;
        };

        // Build CSV content
        const csvContent = [
            // Headers
            headers.map(escapeCSVValue).join(','),
            // Data rows
            ...data.map(row =>
                headers.map(header => escapeCSVValue(row[header])).join(',')
            )
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `${filename}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
}