import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const baseInput =
    'w-full rounded-lg border border-hairline bg-card px-3 py-2 text-sm text-ink ' +
    'placeholder:text-faint transition-colors outline-none ' +
    'focus:border-bronze focus:ring-2 focus:ring-bronze/20';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Field = ({ label, className = '', ...rest }: FieldProps) => (
    <label className="block">
        {label && (
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-faint">
                {label}
            </span>
        )}
        <input className={`${baseInput} ${className}`} {...rest} />
    </label>
);

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const TextArea = ({ label, className = '', ...rest }: TextAreaProps) => (
    <label className="block">
        {label && (
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-faint">
                {label}
            </span>
        )}
        <textarea className={`${baseInput} resize-none ${className}`} {...rest} />
    </label>
);
