import { X } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

interface TagInputProps {
    label?: string;
    value: string[];
    onChange: (next: string[]) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
}

export function TagInput({ label, value, onChange, placeholder, error, required }: TagInputProps) {
    const [draft, setDraft] = useState('');

    const commit = () => {
        const tag = draft.trim();
        if (tag && !value.includes(tag)) {
            onChange([...value, tag]);
        }
        setDraft('');
    };

    const remove = (tag: string) => onChange(value.filter((t) => t !== tag));

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            commit();
        } else if (e.key === 'Backspace' && !draft && value.length) {
            remove(value[value.length - 1]);
        }
    };

    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-neutral-700">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}
            <div
                className={`flex flex-wrap gap-1.5 rounded-lg border bg-white p-2 focus-within:ring-2 ${
                    error
                        ? 'border-red-500 focus-within:ring-red-500/20'
                        : 'border-neutral-300 focus-within:border-spruce focus-within:ring-spruce/15'
                }`}
            >
                {value.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-md bg-spruce-50 px-2 py-1 text-xs font-medium text-spruce-700"
                    >
                        {tag}
                        <button type="button" onClick={() => remove(tag)} className="hover:text-spruce-900">
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
                <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={onKeyDown}
                    onBlur={commit}
                    placeholder={value.length ? '' : placeholder}
                    className="min-w-32 flex-1 bg-transparent px-1 py-0.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                />
            </div>
            {error && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                    <span>⚠</span> {error}
                </p>
            )}
        </div>
    );
}
