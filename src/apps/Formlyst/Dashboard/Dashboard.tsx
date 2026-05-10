import { useNavigate } from 'react-router';
import { Plus, FileText, Loader2 } from 'lucide-react';
import { useModal } from '../../../components/ModalContext';
import { useForms } from '../hooks/useFormQueries';
import { useCreateForm, useDeleteForm, useDuplicateForm, useToggleFormStatus } from '../hooks/useFormMutations';
import FormCard from './FormCard';
import TemplateDialog from './TemplateDialog';
import type { FormTemplate } from '../helpers/templates';
import { openAlertDialog } from '../../../ui/AlertDialog';

export default function Dashboard() {
  const navigate = useNavigate();
  const modal = useModal();

  const { data: forms, isLoading, error } = useForms();
  const createForm = useCreateForm();
  const deleteForm = useDeleteForm();
  const duplicateForm = useDuplicateForm();
  const toggleStatus = useToggleFormStatus();

  const handleCreate = (template: FormTemplate) => {
    createForm.mutate(template.config, {
      onSuccess: (form) => {
        modal.close();
        navigate(`/formlyst/${form.id}/edit`);
      },
    });
  };

  const handleDelete = (id: string) => {
    openAlertDialog(modal, {
      title: 'Delete Form',
      message: 'This will permanently delete the form and all its responses. This action cannot be undone.',
      confirmText: 'Delete',
      onConfirm: () => deleteForm.mutate(id),
    });
  };

  const openTemplateDialog = () => {
    modal.open(
      <TemplateDialog onCreate={handleCreate} isLoading={createForm.isPending} />
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          Unable to load forms
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            FormLyst
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {forms && forms.length > 0
              ? `${forms.length} ${forms.length === 1 ? 'form' : 'forms'} in your workspace`
              : 'Build and manage your forms'
            }
          </p>
        </div>

        <button
          onClick={openTemplateDialog}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Form
        </button>
      </div>

      {forms && forms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <FormCard
              key={form.id}
              form={form}
              onDuplicate={(id) => duplicateForm.mutate(id)}
              onDelete={handleDelete}
              onToggleStatus={(id) => toggleStatus.mutate(id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-neutral-400" />
          </div>
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-1">
            No forms yet
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5 max-w-xs">
            Create your first form to start collecting responses
          </p>
          <button
            onClick={openTemplateDialog}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Form
          </button>
        </div>
      )}
    </div>
  );
}