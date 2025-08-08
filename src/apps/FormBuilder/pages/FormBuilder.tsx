import { cn } from '@/shared/cn';
import { Dialog } from '@base-ui-components/react/dialog';
import { AlertCircle, PanelLeft } from 'lucide-react';
import React, { useState } from 'react';
import FBBreadcrumb from '../components/form-builder/FBBreadCrumb';
import FBCanvas from '../components/form-builder/FBCanvas';
import FBToolbar from '../components/form-builder/FBToolbar';
import FBTreeView from '../components/form-builder/FBTreeView';
import { useFormLoader } from '../helpers/useFormLoader';

const FormBuilder: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {
        isLoading,
        error,
        formData,
        isEditMode,
        formId,
        retry,
        goBack
    } = useFormLoader();

    console.log("I am here")

    // Loading state
    if (isLoading) {
        return (
            <div className="relative h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Loading Form...
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Please wait while we load your form
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="relative h-[calc(100vh-54px)] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {isEditMode ? 'Form Not Found' : 'Error Loading Form'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {error}
                    </p>
                    <div className="flex space-x-3 justify-center">
                        <button
                            onClick={goBack}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={retry}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {isEditMode ? 'Retry' : 'Create New Form'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[calc(100vh-54px)] w-full flex flex-col p-4 gap-4">
            {/* Mode Indicator */}
            {isEditMode && formData && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                Editing: {formData.title}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-blue-600 dark:text-blue-400">
                            <span>Created: {new Date(formData.createdAt).toLocaleDateString()}</span>
                            <span>Responses: {formData.responseCount}</span>
                            <span className={cn(
                                'px-2 py-1 rounded-full text-xs font-medium',
                                formData.isActive
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                            )}>
                                {formData.isActive ? 'Active' : 'Archived'}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Row - Toolbar & Breadcrumb */}
            <div className="h-12 flex gap-4">
                {/* Toolbar - Hidden on mobile, shows as floating menu */}
                <FBToolbar
                    className='hidden lg:flex lg:w-1/4 shadow-sm dark:shadow-md'
                    isEditMode={isEditMode}
                    formId={formId}
                />

                {/* Breadcrumb - Full width on mobile */}
                <div className="flex-1 lg:w-3/4 flex items-center">
                    {/* Mobile Tree View Dialog */}
                    <Dialog.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <Dialog.Trigger>
                            <button className={cn(
                                "lg:hidden p-3 mr-2 rounded-lg shadow-sm dark:shadow-md",
                                "bg-gray-100 dark:bg-zinc-700",
                                "hover:bg-gray-200 dark:hover:bg-zinc-600",
                                "border border-gray-300 dark:border-zinc-600",
                                "text-gray-600 dark:text-gray-300"
                            )}>
                                <PanelLeft size={20} />
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
                            <Dialog.Popup className={cn(
                                "fixed top-0 left-0 w-80 z-50 m-4 mr-0 rounded-lg flex flex-col h-[calc(100%-32px)]",
                                "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-md"
                            )}>
                                <FBTreeView />
                            </Dialog.Popup>
                        </Dialog.Portal>
                    </Dialog.Root>

                    <FBBreadcrumb className='shadow-sm dark:shadow-md' />
                </div>
            </div>

            {/* Bottom Row - Tree View & Canvas */}
            <div className="flex-1 flex gap-4 min-h-0 mb-16 lg:mb-0">
                {/* Tree View - Hidden on mobile, shows as dialog */}
                <FBTreeView className="hidden lg:flex lg:w-1/4 shadow-sm dark:shadow-md" />

                {/* Canvas - Full width on mobile */}
                <FBCanvas className="flex-1 lg:w-3/4 shadow-sm dark:shadow-md" />
            </div>

            {/* Floating Toolbar - Only visible on mobile */}
            <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
                <FBToolbar
                    className='shadow-sm dark:shadow-md'
                    isEditMode={isEditMode}
                    formId={formId}
                />
            </div>
        </div>
    );
};

export default FormBuilder;