import { ArrowLeft, Check, Download, Eye, MoreVertical, RotateCcw, Save, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useModal, openAlertDialog } from '@react-lab/ui';
import { resetForm } from '../store/formBuilderSlice';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { downloadJson } from '../helpers/utils';
import PreviewDialog from './dialogs/PreviewDialog';
import ImportDialog from './dialogs/ImportDialog';

interface ToolbarProps {
    onSave: () => void;
    isSaving: boolean;
}

export default function Toolbar({ onSave, isSaving }: ToolbarProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const modal = useModal();
    const { formConfig, isDirty } = useAppSelector((state) => state.formBuilder);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleBack = () => {
        if (isDirty) {
            openAlertDialog(modal, {
                title: 'Unsaved Changes',
                message: 'You have unsaved changes. Are you sure you want to leave?',
                confirmText: 'Leave', cancelText: 'Stay',
                onConfirm: () => navigate('/'),
            });
        } else {
            navigate('/');
        }
    };

    const handleExport = () => { downloadJson(formConfig.title || 'form', formConfig); setMenuOpen(false); };
    const handleImport = () => { setMenuOpen(false); modal.open(<ImportDialog />); };
    const handleReset = () => {
        setMenuOpen(false);
        openAlertDialog(modal, {
            title: 'Reset Form',
            message: 'This will clear all your changes and start fresh. This cannot be undone.',
            confirmText: 'Reset',
            onConfirm: () => { dispatch(resetForm()); },
        });
    };

    return (
        <header className="shrink-0 h-15 flex items-center justify-between px-3 sm:px-4 bg-white border-b border-neutral-200">
            <div className="flex items-center gap-2 min-w-0">
                <button onClick={handleBack} className="p-2 rounded-lg text-neutral-500 hover:text-ink hover:bg-neutral-100 transition-colors" title="Back to Dashboard">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="w-px h-6 bg-neutral-200 mx-1" />
                <div className="flex items-center gap-2.5 min-w-0">
                    <h1 className="font-display text-sm font-bold text-ink truncate max-w-40 sm:max-w-64">
                        {formConfig.title || 'Untitled Form'}
                    </h1>
                    {isDirty ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-bold rounded-full bg-amber-100 text-amber-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Unsaved
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded-full bg-success-50 text-success">
                            <Check className="w-3 h-3" strokeWidth={3} />Saved
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-1.5">
                <button onClick={() => modal.open(<PreviewDialog />)} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg text-neutral-600 hover:text-ink hover:bg-neutral-100 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview</span>
                </button>

                <button
                    onClick={onSave}
                    disabled={!isDirty || isSaving}
                    className="flex items-center gap-2 px-3.5 py-2 text-sm font-bold rounded-lg bg-plum hover:bg-plum-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isSaving ? 'Saving…' : 'Save'}</span>
                </button>

                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg text-neutral-500 hover:text-ink hover:bg-neutral-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                    {menuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                            <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-neutral-200 rounded-xl shadow-lift py-1.5 z-20 scale-in origin-top-right">
                                <button onClick={handleImport} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-ink transition-colors">
                                    <Upload className="w-4 h-4 text-neutral-400" />Import JSON
                                </button>
                                <button onClick={handleExport} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-ink transition-colors">
                                    <Download className="w-4 h-4 text-neutral-400" />Export JSON
                                </button>
                                <div className="my-1 border-t border-neutral-100" />
                                <button onClick={handleReset} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                    <RotateCcw className="w-4 h-4" />Reset Form
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
