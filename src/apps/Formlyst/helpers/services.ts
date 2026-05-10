import apiClient from '../../../shared/apiClient';
import type { Form, FormConfig, FormResponse } from './types';

const BASE = '/formlyst';

export async function getForms(): Promise<Form[]> {
    const { data } = await apiClient.get<{ forms: Form[] }>(`${BASE}/forms`);
    return data.forms;
}

export async function getFormById(id: string): Promise<Form> {
    const { data } = await apiClient.get<{ form: Form }>(`${BASE}/forms/${id}`);
    return data.form;
}

export async function createForm(config: FormConfig): Promise<Form> {
    const { data } = await apiClient.post<{ form: Form }>(`${BASE}/forms`, config);
    return data.form;
}

export async function updateForm(id: string, config: FormConfig): Promise<Form> {
    const { data } = await apiClient.put<{ form: Form }>(`${BASE}/forms/${id}`, config);
    return data.form;
}

export async function deleteForm(id: string): Promise<void> {
    await apiClient.delete(`${BASE}/forms/${id}`);
}

export async function duplicateForm(id: string): Promise<Form> {
    const { data } = await apiClient.post<{ form: Form }>(`${BASE}/forms/${id}/duplicate`);
    return data.form;
}

export async function toggleFormStatus(id: string): Promise<Form> {
    const { data } = await apiClient.put<{ form: Form }>(`${BASE}/forms/${id}/toggle-status`);
    return data.form;
}

export async function getPublicForm(shareUrl: string): Promise<Form> {
    const { data } = await apiClient.get<{ form: Form }>(`${BASE}/public/${shareUrl}`);
    return data.form;
}

export async function submitResponse(shareUrl: string, responses: Record<string, unknown>): Promise<string> {
    const { data } = await apiClient.post<{ response: { id: string } }>(`${BASE}/public/${shareUrl}/submit`, { responses });
    return data.response.id;
}

export async function getResponses(formId: string): Promise<FormResponse[]> {
    const { data } = await apiClient.get<{ responses: FormResponse[] }>(`${BASE}/forms/${formId}/responses`);
    return data.responses;
}

export async function getResponseById(responseId: string): Promise<FormResponse> {
    const { data } = await apiClient.get<{ response: FormResponse }>(`${BASE}/responses/${responseId}`);
    return data.response;
}

export async function deleteResponse(id: string): Promise<void> {
    await apiClient.delete(`${BASE}/responses/${id}`);
}

export async function deleteAllResponses(formId: string): Promise<number> {
    const { data } = await apiClient.delete<{ deletedCount: number }>(`${BASE}/forms/${formId}/responses`);
    return data.deletedCount;
}