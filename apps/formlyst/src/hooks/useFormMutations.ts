import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createForm, updateForm, deleteForm, duplicateForm,
    toggleFormStatus, submitResponse, deleteResponse, deleteAllResponses,
} from '../helpers/services';
import type { FormConfig } from '../helpers/types';
import { formQueryKeys } from '../helpers/constants';

export function useCreateForm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (config: FormConfig) => createForm(config),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: formQueryKeys.forms }); },
    });
}

export function useUpdateForm(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (config: FormConfig) => updateForm(id, config),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: formQueryKeys.forms });
            queryClient.invalidateQueries({ queryKey: formQueryKeys.form(id) });
        },
    });
}

export function useDeleteForm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteForm(id),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: formQueryKeys.forms }); },
    });
}

export function useDuplicateForm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => duplicateForm(id),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: formQueryKeys.forms }); },
    });
}

export function useToggleFormStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => toggleFormStatus(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: formQueryKeys.forms });
            queryClient.invalidateQueries({ queryKey: formQueryKeys.form(id) });
        },
    });
}

export function useSubmitResponse(shareUrl: string) {
    return useMutation({
        mutationFn: (responses: Record<string, unknown>) => submitResponse(shareUrl, responses),
    });
}

export function useDeleteResponse(formId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (responseId: string) => deleteResponse(responseId),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: formQueryKeys.responses(formId) }); },
    });
}

export function useDeleteAllResponses(formId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteAllResponses(formId),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: formQueryKeys.responses(formId) }); },
    });
}
