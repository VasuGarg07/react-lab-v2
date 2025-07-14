import { cn } from '@/shared/cn';
import { toastService } from '@/shared/toastr';
import Tooltip from '@/ui/Tooltip';
import { Toolbar } from '@base-ui-components/react/toolbar';
import {
    CheckCircle2,
    CloudAlert,
    Download,
    RotateCcw,
    Save,
    Send,
    Upload
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { createForm, updateForm } from '../../helpers/fb.service';
import { Form } from '../../helpers/fb.types';
import { FileUtils } from '../../helpers/fb.utils';
import { validateFormWithDetails } from '../../helpers/fb.validator';
import {
    useFormActions,
    useFormConfig,
    useFormTitle,
    useFormUtils,
    useIsDirty
} from '../../helpers/useFormEngine';
import { FBImportJson } from './FBImportJson';

interface FBToolbarProps {
    className?: string;
    isEditMode: boolean;
    formId?: string;
}

const FBToolbar: React.FC<FBToolbarProps> = ({
    className,
    isEditMode,
    formId
}) => {
    const navigate = useNavigate();
    const formName = useFormTitle();
    const formConfig = useFormConfig();
    const isDirty = useIsDirty();
    const { resetForm } = useFormActions();
    const { exportConfig, forceSync, markSaved } = useFormUtils();
    const [showImportDialog, setShowImportDialog] = useState(false);
    const [isSaving, setIsSaving] = useState(false);


    const onExport = useCallback(() => {
        const dataStr = exportConfig();
        const fileName = formName.replace(/[^a-zA-Z0-9]/g, '_') || 'form_config';
        FileUtils.saveJson(fileName, dataStr);
        toastService.success('Form configuration exported');
    }, [formName, exportConfig]);

    const onSave = useCallback(async () => {
        if (isSaving) return;

        try {
            setIsSaving(true);

            // Validate form config before saving
            const validation = validateFormWithDetails(formConfig);

            if (!validation.isValid) {
                console.error("Form validation failed:", validation.errors);
                validation.errors.forEach(errorStr => {
                    toastService.error(`Validation Error: ${errorStr}`);
                });
                return;
            }

            let response: Form;

            if (isEditMode && formId) {
                // Update existing form
                response = await updateForm(formId, formConfig);
                toastService.success("Form updated successfully");
            } else {
                // Create new form
                response = await createForm(formConfig);
                toastService.success("Form created successfully");

                // Navigate to edit mode for the newly created form
                navigate(`/builder/${response.id}`, { replace: true });
            }

            // Mark as saved and sync local storage
            markSaved();
            forceSync();

        } catch (error) {
            console.error(`Failed to ${isEditMode ? 'update' : 'create'} form:`, error);
            toastService.error(`Failed to ${isEditMode ? 'update' : 'create'} form`);
        } finally {
            setIsSaving(false);
        }
    }, [formConfig, isEditMode, formId, navigate, markSaved, forceSync, isSaving]);

    const onReset = useCallback(() => {
        const confirmMessage = isEditMode
            ? 'Are you sure you want to reset? This will reload the original form configuration and lose any unsaved changes.'
            : 'Are you sure you want to reset? This will clear all form data.';

        if (confirm(confirmMessage)) {
            if (isEditMode) {
                // For edit mode, reload the page to get fresh data
                window.location.reload();
            } else {
                // For create mode, reset to empty form
                resetForm();
            }
        }
    }, [isEditMode, resetForm]);

    const primaryButtons = [
        {
            id: 'save',
            icon: Send,
            onClick: onSave,
            tooltip: isEditMode ? 'Update form' : 'Create form',
            className: 'bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
            disabled: isSaving
        },
        {
            id: 'export',
            icon: Download,
            onClick: onExport,
            tooltip: 'Export as JSON',
            className: 'bg-orange-50 dark:bg-orange-950/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400'
        },
        {
            id: 'import',
            icon: Upload,
            onClick: () => setShowImportDialog(true),
            tooltip: 'Import JSON',
            className: 'bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-900/40 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
        },
        {
            id: 'local-save',
            icon: Save,
            onClick: forceSync,
            tooltip: 'Save locally',
            className: 'bg-purple-50 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400'
        },
        {
            id: 'reset',
            icon: RotateCcw,
            onClick: onReset,
            tooltip: isEditMode ? 'Reset to original' : 'Reset form',
            className: 'bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
        }
    ];

    const getStatusText = () => {
        if (isSaving) return 'Saving...';
        if (isDirty) return 'Unsaved';
        return isEditMode ? 'Up-to date' : 'Saved locally';
    };

    const getStatusIcon = () => {
        if (isSaving) {
            return <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />;
        }
        if (isDirty) {
            return <CloudAlert size={16} className="text-orange-500" />;
        }
        return <CheckCircle2 size={16} className="text-green-500" />;
    };

    return (
        <div className={cn(
            "w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-2",
            className
        )}>
            <Toolbar.Root className="flex items-center gap-1 w-full justify-between">
                {/* Status Indicator */}
                <Tooltip content={getStatusText()}>
                    <div className="flex items-center gap-2 p-2 rounded-md">
                        {getStatusIcon()}
                    </div>
                </Tooltip>

                <Toolbar.Separator className="w-px h-5 bg-gray-300 dark:bg-zinc-600 mx-1" />

                {/* Mode Indicator */}
                <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-md bg-gray-100 dark:bg-zinc-700">
                    <div className={cn(
                        "w-2 h-2 rounded-full",
                        isEditMode ? "bg-blue-500" : "bg-green-500"
                    )} />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        {isEditMode ? 'Edit Mode' : 'Create Mode'}
                    </span>
                </div>

                <Toolbar.Separator className="w-px h-5 bg-gray-300 dark:bg-zinc-600 mx-1" />

                {/* Action Buttons */}
                <Toolbar.Group className="flex items-center gap-2">
                    {primaryButtons.map((button) => {
                        const Icon = button.icon;
                        return (
                            <Tooltip key={button.id} content={button.tooltip}>
                                <Toolbar.Button
                                    onClick={button.onClick}
                                    disabled={button.disabled}
                                    className={cn(
                                        "p-2 rounded-lg border transition-all duration-200",
                                        button.className,
                                        button.disabled && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <Icon size={14} />
                                </Toolbar.Button>
                            </Tooltip>
                        );
                    })}
                </Toolbar.Group>
            </Toolbar.Root>

            <FBImportJson
                open={showImportDialog}
                onClose={setShowImportDialog}
            />
        </div>
    );
};

export default FBToolbar;