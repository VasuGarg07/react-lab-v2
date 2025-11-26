import { LIMITS } from './constants';
import type {
    EntityType,
    FieldType,
    FormConfig,
    FormStep,
    FormSection,
    FormField,
    BreadcrumbItem,
    TreeNode,
} from './types';

// ============================================
// KEY GENERATION
// ============================================

export function generateKey(label: string, type: EntityType, existingKeys: string[]): string {
    // Clean label or use fallback
    const clean = label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/(^_|_$)/g, '');

    const base = clean || type; // fallback to just "step", "field", etc.

    // Check if base key exists, if not use it directly (shorter keys)
    if (!existingKeys.includes(base)) return base;

    // Otherwise append counter
    let counter = 1;
    while (existingKeys.includes(`${base}_${counter}`)) {
        counter++;
    }

    return `${base}_${counter}`;
}

export function getAllKeys(config: FormConfig, type: EntityType): string[] {
    const keys: string[] = [];
    for (const step of config.steps) {
        if (type === 'step') {
            keys.push(step.key);
        } else {
            for (const section of step.sections) {
                if (type === 'section') {
                    keys.push(section.key);
                } else if (type === 'field') {
                    keys.push(...section.fields.map((f) => f.key));
                }
            }
        }
    }
    return keys;
}

// ============================================
// FACTORY FUNCTIONS
// ============================================

export function createEmptyForm(): FormConfig {
    return { title: 'New Form', description: '', steps: [] };
}

export function createStep(title: string, existingKeys: string[]): FormStep {
    return {
        key: generateKey(title, 'step', existingKeys),
        title,
        description: '',
        sections: [],
    };
}

export function createSection(title: string, existingKeys: string[]): FormSection {
    return {
        key: generateKey(title, 'section', existingKeys),
        title,
        description: '',
        fields: [],
    };
}

export function createField(type: FieldType, label: string, existingKeys: string[]): FormField {
    const base = {
        key: generateKey(label, 'field', existingKeys),
        label,
        required: false,
    };

    switch (type) {
        case 'text':
            return { ...base, type: 'text' };
        case 'number':
            return { ...base, type: 'number' };
        case 'select':
            return { ...base, type: 'select', options: [] };
        case 'multi_select':
            return { ...base, type: 'multi_select', options: [] };
        case 'boolean':
            return { ...base, type: 'boolean' };
        case 'range':
            return { ...base, type: 'range', min: LIMITS.RANGE_MIN, max: LIMITS.RANGE_MAX };
    }
}

// ============================================
// NAVIGATION
// ============================================

export function buildBreadcrumbs(config: FormConfig, path: string[]): BreadcrumbItem[] {
    const crumbs: BreadcrumbItem[] = [
        { key: 'form', label: config.title || 'New Form', type: 'form', path: [] },
    ];

    if (path.length === 0) return crumbs;

    const step = config.steps.find((s) => s.key === path[0]);
    if (step) {
        crumbs.push({ key: step.key, label: step.title, type: 'step', path: [step.key] });
    }

    if (path.length >= 2 && step) {
        const section = step.sections.find((s) => s.key === path[1]);
        if (section) {
            crumbs.push({ key: section.key, label: section.title, type: 'section', path: [path[0], section.key] });
        }
    }

    if (path.length >= 3 && step) {
        const section = step.sections.find((s) => s.key === path[1]);
        const field = section?.fields.find((f) => f.key === path[2]);
        if (field) {
            crumbs.push({ key: field.key, label: field.label, type: 'field', path: [path[0], path[1], field.key] });
        }
    }

    return crumbs;
}

export function buildTree(config: FormConfig): TreeNode[] {
    return [
        {
            key: 'form',
            label: config.title || 'New Form',
            type: 'form',
            children: config.steps.map((step) => ({
                key: step.key,
                label: step.title,
                type: 'step' as const,
                children: step.sections.map((section) => ({
                    key: section.key,
                    label: section.title,
                    type: 'section' as const,
                    children: section.fields.map((field) => ({
                        key: field.key,
                        label: field.label,
                        type: 'field' as const,
                    })),
                })),
            })),
        },
    ];
}

// ============================================
// EXPORT HELPERS
// ============================================

export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(d);
}

export function downloadJson(filename: string, data: unknown): void {
    const json = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export function downloadCsv(filename: string, rows: Record<string, unknown>[], headers: string[]): void {
    const escape = (val: unknown): string => {
        if (val == null) return '';
        if (Array.isArray(val)) return val.join('; ');
        if (typeof val === 'boolean') return val ? 'Yes' : 'No';
        const str = String(val);
        return /[,"\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };

    const csv = [
        headers.join(','),
        ...rows.map((row) => headers.map((h) => escape(row[h])).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}