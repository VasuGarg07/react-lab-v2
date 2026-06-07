import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { loadForm, resetForm, markClean } from '../store/formBuilderSlice';
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

    useEffect(() => {
        if (isEditMode && existingForm && !initialized) {
            dispatch(loadForm(existingForm));
            setInitialized(true);
        } else if (!isEditMode && !initialized) {
            dispatch(loadForm(createEmptyForm()));
            setInitialized(true);
        }
    }, [isEditMode, existingForm, initialized, dispatch]);

    useEffect(() => {
        return () => { dispatch(resetForm()); };
    }, [dispatch]);

    const handleSave = () => {
        if (isEditMode) {
            updateForm.mutate(formConfig, { onSuccess: () => dispatch(markClean()) });
        } else {
            createForm.mutate(formConfig, {
                onSuccess: (form) => {
                    dispatch(markClean());
                    navigate(`/${form.id}/edit`, { replace: true });
                },
            });
        }
    };

    const isSaving = createForm.isPending || updateForm.isPending;

    if (isEditMode && isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-canvas">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-plum animate-spin" />
                    <p className="text-sm text-neutral-500">Loading form…</p>
                </div>
            </div>
        );
    }

    if (isEditMode && !isLoading && !existingForm) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
                <div className="text-center">
                    <h2 className="font-display text-lg font-bold text-ink mb-2">Form not found</h2>
                    <p className="text-sm text-neutral-500 mb-4">This form doesn't exist or has been deleted.</p>
                    <button onClick={() => navigate('/')} className="text-sm font-semibold text-plum hover:underline">
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="md:hidden">
                <MobileBlocker />
            </div>
            <div className="hidden md:flex h-screen flex-col bg-canvas">
                <Toolbar onSave={handleSave} isSaving={isSaving} />
                <div className="flex-1 flex min-h-0">
                    <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
                    <Canvas />
                </div>
            </div>
        </>
    );
}
