import { useState } from 'react';
import { Upload, FileJson, AlertCircle } from 'lucide-react';
import { useAppDispatch } from '../../store/useRedux';
import { loadForm } from '../../store/formBuilderSlice';
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
            if (!validation.valid) { setError(validation.errors[0] || 'Invalid form structure'); return; }
            dispatch(loadForm(parsed as FormConfig));
            close();
        } catch {
            setError('Invalid JSON format');
        }
    };

    const handlePaste = () => { if (jsonText.trim()) processJson(jsonText); };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => { const text = event.target?.result as string; setJsonText(text); processJson(text); };
            reader.readAsText(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => { const text = event.target?.result as string; setJsonText(text); processJson(text); };
            reader.readAsText(file);
        } else { setError('Please drop a JSON file'); }
    };

    return (
        <div>
            <h3 className="font-display text-lg font-bold text-ink mb-1">Import Form</h3>
            <p className="text-sm text-neutral-500 mb-5">Load a form configuration from a JSON file.</p>

            <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors mb-4 ${isDragging ? 'border-plum bg-plum/5' : 'border-neutral-300 hover:border-neutral-400'}`}
            >
                <input type="file" accept=".json,application/json" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-plum/10 text-plum mx-auto mb-3">
                    <FileJson className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-ink mb-0.5">Drag & drop a JSON file</p>
                <p className="text-xs text-neutral-400">or click to browse</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <hr className="flex-1 border-neutral-200" />
                <span className="text-xs text-neutral-400">OR</span>
                <hr className="flex-1 border-neutral-200" />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Paste JSON</label>
                <textarea
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    placeholder='{"title": "My Form", "steps": [...]}'
                    rows={5}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <div className="flex gap-3">
                <button onClick={close} className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors">Cancel</button>
                <button onClick={handlePaste} disabled={!jsonText.trim()} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl bg-plum hover:bg-plum-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <Upload className="w-4 h-4" />Import
                </button>
            </div>
        </div>
    );
}
