import Checkbox from '../../../ui/Checkbox';
import NumberInput from '../../../ui/NumberInput';
import RadioGroup from '../../../ui/RadioGroup';
import Slider from '../../../ui/Slider';
import Switch from '../../../ui/Switch';
import TextInput from '../../../ui/TextInput';
import type { FormField } from '../helpers/types';

interface FieldRendererProps {
    field: FormField;
    value: unknown;
    onChange: (value: unknown) => void;
    error?: string;
}

export default function FieldRenderer({ field, value, onChange, error }: FieldRendererProps) {
    const label = `${field.label}${field.required ? ' *' : ''}`;

    switch (field.type) {
        case 'text':
            return (
                <TextInput
                    label={label}
                    value={(value as string) || ''}
                    onChange={(e) => onChange(e.target.value)}
                    error={error}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                />
            );

        case 'number':
            return (
                <NumberInput
                    label={label}
                    value={(value as number | '') ?? ''}
                    onChange={onChange}
                    error={error}
                    min={field.validation?.minValue}
                    max={field.validation?.maxValue}
                />
            );

        case 'select':
            return (
                <RadioGroup
                    label={label}
                    options={field.options.map((opt) => ({ label: opt, value: opt }))}
                    value={(value as string) || ''}
                    onChange={onChange}
                    error={error}
                />
            );

        case 'multi_select':
            return (
                <div className="space-y-2">
                    <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {label}
                    </span>
                    <div className="space-y-2">
                        {field.options.map((opt) => {
                            const selected = Array.isArray(value) ? value : [];
                            const isChecked = selected.includes(opt);

                            return (
                                <Checkbox
                                    key={opt}
                                    label={opt}
                                    checked={isChecked}
                                    onChange={(checked) => {
                                        if (checked) {
                                            onChange([...selected, opt]);
                                        } else {
                                            onChange(selected.filter((v) => v !== opt));
                                        }
                                    }}
                                />
                            );
                        })}
                    </div>
                    {error && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <span>⚠</span> {error}
                        </p>
                    )}
                </div>
            );

        case 'boolean':
            return (
                <div className="space-y-2">
                    <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {label}
                    </span>
                    <Switch
                        label={value ? 'Yes' : 'No'}
                        checked={Boolean(value)}
                        onChange={onChange}
                    />
                    {error && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <span>⚠</span> {error}
                        </p>
                    )}
                </div>
            );

        case 'range':
            return (
                <Slider
                    label={label}
                    value={(value as number) ?? field.min}
                    min={field.min}
                    max={field.max}
                    onChange={onChange}
                />
            );

        default:
            return (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-600 dark:text-red-400">
                    Unknown field type: {(field as FormField).type}
                </div>
            );
    }
}