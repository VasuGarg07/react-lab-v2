import apiClient from "@/shared/apiClient";
import { FormConfig, Form, FormResponse } from "./fb.types";

// ==================== FORM MANAGEMENT SERVICES ====================

// Create a new form
export const createForm = async (formData: FormConfig): Promise<Form> => {
    const { data } = await apiClient.post<{ form: Form }>('/formlyst/forms', formData);
    return data.form;
};

// Get all forms for logged-in user
export const getUserForms = async (): Promise<Form[]> => {
    const { data } = await apiClient.get<{ forms: Form[] }>('/formlyst/forms');
    console.log("Fetched forms: ", data.forms)
    return data.forms;
};

// Get specific form by ID (owner only)
export const getFormById = async (formId: string): Promise<Form> => {
    const { data } = await apiClient.get<{ form: Form }>(`/formlyst/forms/${formId}`);
    return data.form;
};

// Update form configuration
export const updateForm = async (formId: string, formData: Partial<FormConfig>): Promise<Form> => {
    const { data } = await apiClient.put<{ form: Form }>(`/formlyst/forms/${formId}`, formData);
    return data.form;
};

// Delete form (hard delete with cascade)
export const deleteForm = async (formId: string): Promise<void> => {
    await apiClient.delete(`/formlyst/forms/${formId}`);
};

// Duplicate existing form
export const duplicateForm = async (formId: string): Promise<Form> => {
    const { data } = await apiClient.post<{ form: Form }>(`/formlyst/forms/${formId}/duplicate`);
    return data.form;
};

// Toggle form status (activate/deactivate)
export const toggleFormStatus = async (formId: string): Promise<Form> => {
    const { data } = await apiClient.put<{ form: Form }>(`/formlyst/forms/${formId}/toggle-status`);
    return data.form;
};

// Search user's forms
export const searchForms = async (query: string): Promise<Form[]> => {
    const { data } = await apiClient.get<{ forms: Form[] }>(`/formlyst/forms/search?q=${encodeURIComponent(query)}`);
    return data.forms;
};

// ==================== PUBLIC FORM SERVICES ====================

// Get form by share URL (public access)
export const getPublicForm = async (shareUrl: string): Promise<Form> => {
    const { data } = await apiClient.get<{ form: Form }>(`/formlyst/public/${shareUrl}`);
    return data.form;
};

// Submit form response (public access)
export const submitFormResponse = async (shareUrl: string, responses: Record<string, any>): Promise<string> => {
    const { data } = await apiClient.post<{ response: { id: string } }>(`/formlyst/public/${shareUrl}/submit`, { responses });
    return data.response.id;
};

// ==================== RESPONSE MANAGEMENT SERVICES ====================

// Get all responses for a form (owner only)
export const getFormResponses = async (formId: string): Promise<FormResponse[]> => {
    const { data } = await apiClient.get<{ responses: FormResponse[] }>(`/formlyst/forms/${formId}/responses`);
    return data.responses;
};

// Get specific response (owner only)
export const getResponseById = async (responseId: string): Promise<FormResponse> => {
    const { data } = await apiClient.get<{ response: FormResponse }>(`/formlyst/responses/${responseId}`);
    return data.response;
};

// Delete specific response
export const deleteResponse = async (responseId: string): Promise<void> => {
    await apiClient.delete(`/formlyst/responses/${responseId}`);
};

// Delete all responses for a form
export const deleteAllResponses = async (formId: string): Promise<{ message: string; deletedCount: number }> => {
    const { data } = await apiClient.delete<{ message: string; deletedCount: number }>(`/formlyst/forms/${formId}/responses`);
    return { message: data.message, deletedCount: data.deletedCount };
};

// ==================== VALIDATION SERVICES ====================

// Check if form exists and is accessible
export const validateFormAccess = async (formId: string): Promise<boolean> => {
    try {
        await getFormById(formId);
        return true;
    } catch (error) {
        return false;
    }
};

// Check if public form is accessible
export const validatePublicFormAccess = async (shareUrl: string): Promise<boolean> => {
    try {
        const form = await getPublicForm(shareUrl);
        return form.isActive;
    } catch (error) {
        return false;
    }
};