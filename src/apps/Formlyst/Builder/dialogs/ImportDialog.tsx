import { useState } from 'react';
import { Upload, FileJson, AlertCircle } from 'lucide-react';
import { useAppDispatch } from '../../../../store/useRedux';
import { loadForm } from '../../../../store/formBuilderSlice';
import { useModal } from '@react-lab/ui';
import { validateFormConfig } from '../../helpers/schemas';
import type { FormConfig } from '../../helpers/types';

export default function ImportDialog() {
    const dispatch = useAppDispatch();
    const { close } = useModal();

    const [jsonText, setJsonText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const processJson = async (text: string) => {
        setError(null);

        try {
            const parsed = JSON.parse(text);
            const validation = await validateFormConfig(parsed);

            if (!validation.valid) {
                setError(validation.errors[0] || 'Invalid form structure');
                return;
            }

            dispatch(loadForm(parsed as FormConfig));
            close();
        } catch (err) {
            setError('Invalid JSON format');
        }
    };

    const handlePaste = () => {
        if (jsonText.trim()) {
            processJson(jsonText);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                setJsonText(text);
                processJson(text);
            };
            reader.readAsText(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                setJsonText(text);
                processJson(text);
            };
            reader.readAsText(file);
        } else {
            setError('Please drop a JSON file');
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Import Form
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
                Import a form configuration from a JSON file
            </p>

            {/* Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-4
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-neutral-300 dark:border-neutral-700'
                    }
                `}
            >
                <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <FileJson className="w-10 h-10 text-neutral-400 dark:text-neutral-500 mx-auto mb-3" />
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">
                    Drag & drop a JSON file here
                </p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    or click to browse
                </p>
            </div>

            {/* Or Divider */}
            <div className="flex items-center gap-3 mb-4">
                <hr className="flex-1 border-neutral-200 dark:border-neutral-700" />
                <span className="text-xs text-neutral-400 dark:text-neutral-500">OR</span>
                <hr className="flex-1 border-neutral-200 dark:border-neutral-700" />
            </div>

            {/* Paste JSON */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Paste JSON
                </label>
                <textarea
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    placeholder='{"title": "My Form", "steps": [...]}'
                    rows={5}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={close}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handlePaste}
                    disabled={!jsonText.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Upload className="w-4 h-4" />
                    Import
                </button>
            </div>
        </div>
    );
}