import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store/useRedux';
import { loadForm, resetForm, markClean } from '../../../store/formBuilderSlice';
import { useFormById } from '../hooks/useFormQueries';
import { useCreateForm, useUpdateForm } from '../hooks/useFormMutations';
import { createEmptyForm } from '../helpers/utils';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar/Sidebar';
import Canvas from './Canvas';
import MobileBlocker from './MobileBlocker';

export default function Builder() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isEditMode = Boolean(id);
    const { data: existingForm, isLoading } = useFormById(id);
    const { formConfig } = useAppSelector((state) => state.formBuilder);

    const createForm = useCreateForm();
    const updateForm = useUpdateForm(id || '');

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [initialized, setInitialized] = useState(false);

    // Load form data
    useEffect(() => {
        if (isEditMode && existingForm && !initialized) {
            dispatch(loadForm(existingForm));
            setInitialized(true);
        } else if (!isEditMode && !initialized) {
            dispatch(loadForm(createEmptyForm()));
            setInitialized(true);
        }
    }, [isEditMode, existingForm, initialized, dispatch]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            dispatch(resetForm());
        };
    }, [dispatch]);

    // Handle save
    const handleSave = () => {
        if (isEditMode) {
            updateForm.mutate(formConfig, {
                onSuccess: () => dispatch(markClean()),
            });
        } else {
            createForm.mutate(formConfig, {
                onSuccess: (form) => {
                    dispatch(markClean());
                    navigate(`/formlyst/${form.id}/edit`, { replace: true });
                },
            });
        }
    };

    const isSaving = createForm.isPending || updateForm.isPending;

    // Loading state
    if (isEditMode && isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading form...</p>
                </div>
            </div>
        );
    }

    // Not found state
    if (isEditMode && !isLoading && !existingForm) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Form not found
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        This form doesn't exist or has been deleted.
                    </p>
                    <button
                        onClick={() => navigate('/formlyst')}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Mobile Blocker - shown on small screens */}
            <div className="md:hidden">
                <MobileBlocker />
            </div>

            {/* Builder Layout - hidden on small screens */}
            <div className="hidden md:flex h-screen flex-col bg-neutral-100 dark:bg-neutral-950">
                {/* Toolbar */}
                <Toolbar onSave={handleSave} isSaving={isSaving} />

                {/* Main Content */}
                <div className="flex-1 flex min-h-0">
                    {/* Sidebar */}
                    <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

                    {/* Canvas */}
                    <Canvas />
                </div>
            </div>
        </>
    );
}