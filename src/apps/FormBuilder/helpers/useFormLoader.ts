import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toastService } from '@/shared/toastr';
import { getFormById } from '../helpers/fb.service';
import { Form } from '../helpers/fb.types';
import { useFormActions } from '../helpers/useFormEngine';

interface UseFormLoaderReturn {
    isLoading: boolean;
    error: string | null;
    formData: Form | null;
    isEditMode: boolean;
    formId: string | undefined;
    retry: () => void;
    goBack: () => void;
}

export const useFormLoader = (): UseFormLoaderReturn => {
    const { formId } = useParams<{ formId: string }>();
    const navigate = useNavigate();
    const { loadForm, createForm } = useFormActions();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Form | null>(null);

    const isEditMode = Boolean(formId);

    const loadExistingForm = async () => {
        if (!formId) {
            // Create mode - initialize with empty form
            try {
                createForm('Untitled Form', '');
                setFormData(null);
                setError(null);
            } catch (err) {
                setError('Failed to initialize new form');
            }
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const form = await getFormById(formId);
            setFormData(form);

            // Extract form configuration (remove backend-specific fields)
            const {
                id,
                shareUrl,
                isActive,
                createdBy,
                createdAt,
                updatedAt,
                responseCount,
                ...formConfig
            } = form;

            // Load form configuration into the store
            loadForm(formConfig);

        } catch (err) {
            console.error('Error loading form:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';

            if (errorMessage.includes('404') || errorMessage.includes('not found')) {
                setError('Form not found. It may have been deleted or you may not have permission to access it.');
            } else if (errorMessage.includes('403') || errorMessage.includes('unauthorized')) {
                setError('You do not have permission to access this form.');
            } else {
                setError('Failed to load form. Please check your connection and try again.');
            }

            toastService.error('Failed to load form');
        } finally {
            setIsLoading(false);
        }
    };

    const retry = () => {
        if (formId) {
            loadExistingForm();
        } else {
            setError(null);
            createForm('Untitled Form', '');
        }
    };

    const goBack = () => {
        navigate('/forms');
    };

    useEffect(() => {
        loadExistingForm();
    }, [formId]);

    return {
        isLoading,
        error,
        formData,
        isEditMode,
        formId,
        retry,
        goBack
    };
};