import { ArrowLeft, Check, Download, Eye, MoreVertical, RotateCcw, Save, Upload } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useModal } from '../../../components/ModalContext';
import { resetForm } from '../../../store/formBuilderSlice';
import { useAppDispatch, useAppSelector } from '../../../store/useRedux';
import { downloadJson } from '../helpers/utils';
import { openAlertDialog } from '../../../ui/AlertDialog';
import Dropdown from '../../../ui/Dropdown';
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

    const handleBack = () => {
        if (isDirty) {
            openAlertDialog(modal, {
                title: 'Unsaved Changes',
                message: 'You have unsaved changes. Are you sure you want to leave?',
                confirmText: 'Leave',
                cancelText: 'Stay',
                onConfirm: () => navigate('/formlyst'),
            });
        } else {
            navigate('/formlyst');
        }
    };

    const handlePreview = () => {
        modal.open(<PreviewDialog />);
    };

    const handleExport = () => {
        downloadJson(formConfig.title || 'form', formConfig);
    };

    const handleImport = () => {
        modal.open(<ImportDialog />);
    };

    const handleReset = () => {
        openAlertDialog(modal, {
            title: 'Reset Form',
            message: 'This will clear all your changes and start fresh. This cannot be undone.',
            confirmText: 'Reset',
            onConfirm: () => dispatch(resetForm()),
        });
    };

    return (
        <header className="shrink-0 h-14 flex items-center justify-between px-4 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3">
                <button
                    onClick={handleBack}
                    className="p-2 rounded-lg text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    title="Back to Dashboard"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                    <h1 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate max-w-48">
                        {formConfig.title || 'Untitled Form'}
                    </h1>

                    {isDirty ? (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                            Unsaved
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                            <Check className="w-3 h-3" />
                            Saved
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handlePreview}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview</span>
                </button>

                <button
                    onClick={onSave}
                    disabled={!isDirty || isSaving}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
                </button>

                <Dropdown
                    trigger={
                        <button className="p-2 rounded-lg text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    }
                    items={[
                        { label: 'Import JSON', icon: <Upload className="w-4 h-4" />, onClick: handleImport },
                        { label: 'Export JSON', icon: <Download className="w-4 h-4" />, onClick: handleExport },
                        { label: 'Reset Form', icon: <RotateCcw className="w-4 h-4" />, onClick: handleReset, destructive: true, separatorBefore: true },
                    ]}
                />
            </div>
        </header>
    );
}