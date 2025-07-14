import React from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import { ScrollArea } from '@base-ui-components/react/scroll-area';
import { cn } from '@/shared/cn';
import { useCurrentView, useCurrentPath, useFormConfig, useFormActions, useNavigation } from '../../helpers/useFormEngine';
import { AlertDialog } from '@/ui/AlertDialog';
import FBHeader from './FBHeader';
import FBStep from './FBStep';
import FBSection from './FBSection';
import FBField from './FBField';

interface FBCanvasProps {
    className?: string;
}

const FBCanvas: React.FC<FBCanvasProps> = ({ className }) => {
    const currentView = useCurrentView();
    const currentPath = useCurrentPath();
    const formConfig = useFormConfig();
    const { resetForm, removeStep, removeSection, removeField } = useFormActions();
    const { navigateToForm, navigateToStep, navigateToSection } = useNavigation();

    const renderContent = () => {
        switch (currentView) {
            case 'form':
                return <FBHeader />;

            case 'step':
                if (currentPath.length >= 1) {
                    const stepKey = currentPath[0];
                    const stepIndex = formConfig.steps.findIndex(s => s.key === stepKey);
                    if (stepIndex !== -1) {
                        return <FBStep stepKey={stepKey} stepIndex={stepIndex} />;
                    }
                }
                return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Step not found</div>;

            case 'section':
                if (currentPath.length >= 2) {
                    const stepKey = currentPath[0];
                    const sectionKey = currentPath[1];
                    const step = formConfig.steps.find(s => s.key === stepKey);
                    const sectionIndex = step?.sections.findIndex(s => s.key === sectionKey) ?? -1;
                    if (step && sectionIndex !== -1) {
                        return <FBSection stepKey={stepKey} sectionKey={sectionKey} sectionIndex={sectionIndex} />;
                    }
                }
                return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Section not found</div>;

            case 'field':
                if (currentPath.length >= 3) {
                    const stepKey = currentPath[0];
                    const sectionKey = currentPath[1];
                    const fieldKey = currentPath[2];
                    const step = formConfig.steps.find(s => s.key === stepKey);
                    const section = step?.sections.find(s => s.key === sectionKey);
                    const field = section?.fields.find(f => f.key === fieldKey);
                    if (field) {
                        return <FBField stepKey={stepKey} sectionKey={sectionKey} fieldKey={fieldKey} />;
                    }
                }
                return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Field not found</div>;

            default:
                return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Unknown view</div>;
        }
    };

    const getCanvasTitle = () => {
        switch (currentView) {
            case 'form':
                return formConfig.title || 'Untitled Form';
            case 'step':
                if (currentPath.length >= 1) {
                    const step = formConfig.steps.find(s => s.key === currentPath[0]);
                    return step?.title || 'Untitled Step';
                }
                return 'Untitled Step';
            case 'section':
                if (currentPath.length >= 2) {
                    const step = formConfig.steps.find(s => s.key === currentPath[0]);
                    const section = step?.sections.find(s => s.key === currentPath[1]);
                    return section?.title || 'Untitled Section';
                }
                return 'Untitled Section';
            case 'field':
                if (currentPath.length >= 3) {
                    const step = formConfig.steps.find(s => s.key === currentPath[0]);
                    const section = step?.sections.find(s => s.key === currentPath[1]);
                    const field = section?.fields.find(f => f.key === currentPath[2]);
                    return field?.label || 'Untitled Field';
                }
                return 'Untitled Field';
            default:
                return 'Unknown';
        }
    };

    const getViewTypeChip = () => {
        const chipStyles = {
            form: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
            step: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
            section: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
            field: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300'
        };

        return (
            <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-md border",
                chipStyles[currentView] || 'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            )}>
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </span>
        );
    };

    const getScrollAreaBackground = () => {
        const backgroundStyles = {
            form: 'bg-blue-100 dark:bg-blue-950/50',
            step: 'bg-purple-100 dark:bg-purple-950/50',
            section: 'bg-green-100 dark:bg-green-950/50',
            field: 'bg-orange-100 dark:bg-orange-950/50'
        };

        return backgroundStyles[currentView] || 'bg-gray-50 dark:bg-gray-950/10';
    };

    const handleActionClick = () => {
        switch (currentView) {
            case 'form':
                resetForm();
                break;
            case 'step':
                if (currentPath.length >= 1) {
                    const stepKey = currentPath[0];
                    removeStep(stepKey);
                    navigateToForm();
                }
                break;
            case 'section':
                if (currentPath.length >= 2) {
                    const stepKey = currentPath[0];
                    const sectionKey = currentPath[1];
                    removeSection(stepKey, sectionKey);
                    navigateToStep(stepKey);
                }
                break;
            case 'field':
                if (currentPath.length >= 3) {
                    const stepKey = currentPath[0];
                    const sectionKey = currentPath[1];
                    const fieldKey = currentPath[2];
                    removeField(stepKey, sectionKey, fieldKey);
                    navigateToSection(stepKey, sectionKey);
                }
                break;
        }
    };

    const getActionButton = () => {
        const isForm = currentView === 'form';
        const icon = isForm ? <RotateCcw className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />;
        const label = isForm ? 'Reset Form' : 'Delete';
        const title = isForm ? 'Reset Form' : `Delete ${currentView.charAt(0).toUpperCase() + currentView.slice(1)}`;
        const message = isForm
            ? 'Are you sure you want to reset the form? This will permanently remove all steps, sections, and fields.'
            : `Are you sure you want to delete this ${currentView}? This action cannot be undone.`;

        const triggerButton = (
            <button
                className={cn(
                    "py-1.5 px-2 rounded-md",
                    "border border-dashed bg-transparent",
                    "flex items-center justify-center gap-1.5",
                    "text-xs font-medium transition-colors",
                    // Red color scheme for delete, orange for reset
                    isForm
                        ? "border-orange-400 dark:border-orange-500 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 hover:border-orange-500 dark:hover:border-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-950/30"
                        : "border-red-400 dark:border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 hover:border-red-500 dark:hover:border-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/30"
                )}
            >
                {icon}
                {label}
            </button>
        );

        return (
            <AlertDialog
                trigger={triggerButton}
                title={title}
                message={message}
                onConfirm={handleActionClick}
                confirmLabel={label}
                cancelLabel="Cancel"
            />
        );
    };

    return (
        <div className={cn(
            "h-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden flex flex-col",
            className
        )}>
            {/* Canvas Header */}
            <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-zinc-700 flex-shrink-0">
                {getViewTypeChip()}
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {getCanvasTitle()}
                </h3>
                <span className='grow-1'></span>
                {getActionButton()}
            </div>

            {/* Canvas Content */}
            <ScrollArea.Root className="h-full flex-1 min-h-0">
                <ScrollArea.Viewport className={cn(
                    "h-full p-4",
                    getScrollAreaBackground()
                )}>
                    {renderContent()}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="flex select-none touch-none p-0.5 bg-gray-100 dark:bg-zinc-700 transition-colors duration-150 ease-out hover:bg-gray-200 dark:hover:bg-zinc-600 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                >
                    <ScrollArea.Thumb className="flex-1 bg-gray-400 dark:bg-zinc-500 rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    );
};

export default FBCanvas;