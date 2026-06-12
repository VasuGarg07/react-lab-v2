import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const baseInput =
    'w-full rounded-lg border bg-card px-3 py-2 text-sm text-ink ' +
    'placeholder:text-faint transition-colors outline-none';

const validRing = 'border-hairline focus:border-accent focus:ring-2 focus:ring-accent/20';
const invalidRing = 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20';

const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-faint">
        {children}
    </span>
);

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    invalid?: boolean;
}

export const Field = ({ label, invalid, className = '', ...rest }: FieldProps) => (
    <label className="block">
        {label && <Label>{label}</Label>}
        <input className={`${baseInput} ${invalid ? invalidRing : validRing} ${className}`} {...rest} />
    </label>
);

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    invalid?: boolean;
}

export const TextArea = ({ label, invalid, className = '', ...rest }: TextAreaProps) => (
    <label className="block">
        {label && <Label>{label}</Label>}
        <textarea
            className={`${baseInput} resize-none ${invalid ? invalidRing : validRing} ${className}`}
            {...rest}
        />
    </label>
);
