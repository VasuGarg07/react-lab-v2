import { LIMITS } from './constants';
import type {
    EntityType,
    FieldType,
    FormConfig,
    FormStep,
    FormSection,
    FormField,
    BreadcrumbItem,
    FormResponse,
} from './types';

export function generateKey(label: string, type: EntityType, existingKeys: string[]): string {
    const clean = label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/(^_|_$)/g, '');

    const base = clean || type; // fallback to just "step", "field", etc.

    if (!existingKeys.includes(base)) return base;
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

export function downloadXml(filename: string, responses: FormResponse[], formConfig: FormConfig): void {
    const escapeXml = (val: unknown): string => {
        if (val == null) return '';
        const str = String(val);
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

    const formatValue = (val: unknown): string => {
        if (val == null) return '';
        if (Array.isArray(val)) return val.join(', ');
        if (typeof val === 'boolean') return val ? 'Yes' : 'No';
        return String(val);
    };

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += `<responses form="${escapeXml(formConfig.title)}" count="${responses.length}">\n`;

    for (const response of responses) {
        xml += `  <response id="${escapeXml(response.id)}" submittedAt="${escapeXml(response.submittedAt)}" ip="${escapeXml(response.ipAddress)}">\n`;

        for (const step of formConfig.steps) {
            xml += `    <step key="${escapeXml(step.key)}" title="${escapeXml(step.title)}">\n`;

            for (const section of step.sections) {
                xml += `      <section key="${escapeXml(section.key)}" title="${escapeXml(section.title)}">\n`;

                for (const field of section.fields) {
                    const value = response.responses[field.key];
                    xml += `        <field key="${escapeXml(field.key)}" label="${escapeXml(field.label)}" type="${field.type}">${escapeXml(formatValue(value))}</field>\n`;
                }

                xml += `      </section>\n`;
            }

            xml += `    </step>\n`;
        }

        xml += `  </response>\n`;
    }

    xml += '</responses>';

    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.xml`;
    a.click();
    URL.revokeObjectURL(url);
}