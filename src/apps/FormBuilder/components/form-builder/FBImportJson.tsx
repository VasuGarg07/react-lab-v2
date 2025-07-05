import { toastService } from '@/shared/toastr';
import { Dialog } from '@/ui/Dialog';
import { Upload } from 'lucide-react';
import React, { useState } from 'react';
import { validateFormForImport } from '../../helpers/fb.validator';
import { useFormUtils } from '../../helpers/useFormEngine';

interface FBImportJsonProps {
    open: boolean;
    onClose: (open: boolean) => void;
}

export const FBImportJson: React.FC<FBImportJsonProps> = ({
    open,
    onClose
}) => {
    const [jsonText, setJsonText] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const { importConfig } = useFormUtils();

    const handleImportJson = (jsonString: string) => {
        try {
            const parsedConfig = JSON.parse(jsonString);

            // Validate the imported config
            const validation = validateFormForImport(parsedConfig);

            if (!validation.isValid) {
                toastService.error(`Invalid form configuration: ${validation.errors.join(', ')}`);
                return;
            }

            // Call the parent's import handler
            importConfig(jsonString);
            onClose(false);
            setJsonText(''); // Clear the text area
            toastService.success('Form imported successfully!');

        } catch (error) {
            toastService.error('Invalid JSON format');
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setJsonText(content);
            };
            reader.readAsText(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setJsonText(content);
            };
            reader.readAsText(file);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            title="Import Form Configuration"
            size="lg"
        >
            <div className="p-6 space-y-4">
                {/* File Upload Section */}
                <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
                        }`}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="json-file-input"
                    />
                    <label htmlFor="json-file-input" className="cursor-pointer">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Click to upload or drag and drop a JSON file
                        </p>
                    </label>
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">
                            or paste JSON
                        </span>
                    </div>
                </div>

                {/* Text Area */}
                <textarea
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    placeholder="Paste your form JSON configuration here..."
                    className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Footer Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={() => onClose(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => handleImportJson(jsonText)}
                        disabled={!jsonText.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Import Form
                    </button>
                </div>
            </div>
        </Dialog>
    );
};