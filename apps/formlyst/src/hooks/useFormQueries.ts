import { useQuery } from '@tanstack/react-query';
import { getForms, getFormById, getPublicForm, getResponses, getResponseById } from '../helpers/services';
import { formQueryKeys } from '../helpers/constants';

export function useForms() {
    return useQuery({ queryKey: formQueryKeys.forms, queryFn: getForms });
}

export function useFormById(id: string | undefined) {
    return useQuery({
        queryKey: formQueryKeys.form(id!),
        queryFn: () => getFormById(id!),
        enabled: !!id,
    });
}

export function usePublicForm(shareUrl: string | undefined) {
    return useQuery({
        queryKey: formQueryKeys.publicForm(shareUrl!),
        queryFn: () => getPublicForm(shareUrl!),
        enabled: !!shareUrl,
    });
}

export function useResponses(formId: string | undefined) {
    return useQuery({
        queryKey: formQueryKeys.responses(formId!),
        queryFn: () => getResponses(formId!),
        enabled: !!formId,
    });
}

export function useResponseById(responseId: string | undefined) {
    return useQuery({
        queryKey: formQueryKeys.response(responseId!),
        queryFn: () => getResponseById(responseId!),
        enabled: !!responseId,
    });
}
