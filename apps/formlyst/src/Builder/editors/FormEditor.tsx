import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '../../store/useRedux';
import { updateForm, addStep, removeStep, reorderSteps, navigate } from '../../store/formBuilderSlice';
import { useModal, openAlertDialog, TextInput, Textarea } from '@react-lab/ui';
import SortableEntityCard from '../shared/SortableEntityCard';
import AddEntityDialog from '../shared/AddEntityDialog';
import EditorHeader from '../shared/EditorHeader';
import { LIMITS } from '../../helpers/constants';

export default function FormEditor() {
    const dispatch = useAppDispatch();
    const modal = useModal();
    const { formConfig } = useAppSelector((state) => state.formBuilder);

    const [localTitle, setLocalTitle] = useState(formConfig.title);
    const [localDescription, setLocalDescription] = useState(formConfig.description || '');

    if (formConfig.title !== localTitle && localTitle === '') setLocalTitle(formConfig.title);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleTitleBlur = () => {
        if (localTitle.trim() !== formConfig.title)
            dispatch(updateForm({ title: localTitle.trim() || 'Untitled Form' }));
    };
    const handleDescriptionBlur = () => {
        if (localDescription !== (formConfig.description || ''))
            dispatch(updateForm({ description: localDescription }));
    };

    const handleAddStep = () => modal.open(<AddEntityDialog entityType="step" onAdd={(title) => dispatch(addStep(title))} />);

    const handleDeleteStep = (stepKey: string, stepTitle: string) => {
        openAlertDialog(modal, {
            title: 'Delete Step',
            message: `Are you sure you want to delete"${stepTitle}"? All sections and fields within this step will also be deleted.`,
            confirmText: 'Delete',
            onConfirm: () => { dispatch(removeStep(stepKey)); },
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = formConfig.steps.findIndex((s) => s.key === active.id);
            const newIndex = formConfig.steps.findIndex((s) => s.key === over.id);
            dispatch(reorderSteps({ fromIndex: oldIndex, toIndex: newIndex }));
        }
    };

    const canAddStep = formConfig.steps.length < LIMITS.MAX_STEPS;

    return (
        <div className="space-y-7">
            <EditorHeader type="form" title={formConfig.title} />

            <div className="space-y-4">
                <TextInput label="Form Title" value={localTitle} onChange={(e) => setLocalTitle(e.target.value)} onBlur={handleTitleBlur} placeholder="Enter form title" />
                <Textarea label="Description" value={localDescription} onChange={(e) => setLocalDescription(e.target.value)} onBlur={handleDescriptionBlur} placeholder="Describe what this form is for (optional)" rows={3} />
            </div>

            <div className="pt-2 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-3 mt-5">
                    <h3 className="text-sm font-bold text-ink">
                        Steps <span className="ml-1.5 text-xs font-semibold text-neutral-400 tabular-nums">{formConfig.steps.length}/{LIMITS.MAX_STEPS}</span>
                    </h3>
                    <button onClick={handleAddStep} disabled={!canAddStep} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-violet-100 text-violet-700 hover:bg-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <Plus className="w-3.5 h-3.5" />Add Step
                    </button>
                </div>

                {formConfig.steps.length > 0 ? (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={formConfig.steps.map((s) => s.key)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-2">
                                {formConfig.steps.map((step) => (
                                    <SortableEntityCard
                                        key={step.key} id={step.key} type="step" title={step.title}
                                        subtitle={`${step.sections.length} ${step.sections.length === 1 ? 'section' : 'sections'}`}
                                        onClick={() => dispatch(navigate([step.key]))}
                                        onDelete={() => handleDeleteStep(step.key, step.title)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                ) : (
                    <div className="p-8 border-2 border-dashed border-neutral-200 rounded-2xl text-center bg-white/50">
                        <p className="text-sm text-neutral-500 mb-3">No steps yet. Add your first step to get started.</p>
                        <button onClick={handleAddStep} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-xl bg-plum hover:bg-plum-600 text-white transition-colors">
                            <Plus className="w-4 h-4" />Add First Step
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
