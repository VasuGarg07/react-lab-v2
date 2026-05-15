import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '../../../../store/useRedux';
import { updateStep, addSection, removeSection, reorderSections, navigate } from '../../../../store/formBuilderSlice';
import { useModal } from '../../../../components/ModalContext';
import SortableEntityCard from '../shared/SortableEntityCard';
import AddEntityDialog from '../shared/AddEntityDialog';
import { LIMITS, ENTITY_COLORS } from '../../helpers/constants';
import { openAlertDialog } from '../../../../ui/AlertDialog';
import TextInput from '../../../../ui/TextInput';
import Textarea from '../../../../ui/Textarea';

interface StepEditorProps {
    stepKey: string;
}

export default function StepEditor({ stepKey }: StepEditorProps) {
    const dispatch = useAppDispatch();
    const modal = useModal();
    const { formConfig } = useAppSelector((state) => state.formBuilder);

    const step = formConfig.steps.find((s) => s.key === stepKey);

    // Local state for blur-based updates
    const [localTitle, setLocalTitle] = useState(step?.title || '');
    const [localDescription, setLocalDescription] = useState(step?.description || '');

    // Sync local state when step changes
    useEffect(() => {
        if (step) {
            setLocalTitle(step.title);
            setLocalDescription(step.description || '');
        }
    }, [step?.key]);

    // DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    if (!step) {
        return (
            <div className="p-8 text-center text-neutral-500 dark:text-neutral-400">
                Step not found
            </div>
        );
    }

    const handleTitleBlur = () => {
        if (localTitle.trim() !== step.title) {
            dispatch(updateStep({ key: stepKey, title: localTitle.trim() || 'Untitled Step' }));
        }
    };

    const handleDescriptionBlur = () => {
        if (localDescription !== (step.description || '')) {
            dispatch(updateStep({ key: stepKey, description: localDescription }));
        }
    };

    const handleAddSection = () => {
        modal.open(
            <AddEntityDialog
                entityType="section"
                onAdd={(title) => dispatch(addSection({ stepKey, title }))}
            />
        );
    };

    const handleDeleteSection = (sectionKey: string, sectionTitle: string) => {
        openAlertDialog(modal, {
            title: 'Delete Section',
            message: `Are you sure you want to delete "${sectionTitle}"? All fields within this section will also be deleted.`,
            confirmText: 'Delete',
            onConfirm: () => { dispatch(removeSection({ stepKey, sectionKey })); },
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = step.sections.findIndex((s) => s.key === active.id);
            const newIndex = step.sections.findIndex((s) => s.key === over.id);
            dispatch(reorderSections({ stepKey, fromIndex: oldIndex, toIndex: newIndex }));
        }
    };

    const colors = ENTITY_COLORS.step;
    const canAddSection = step.sections.length < LIMITS.MAX_SECTIONS_PER_STEP;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className={`flex items-center gap-3 p-4 rounded-lg ${colors.bg}`}>
                <div className={`w-2 h-2 rounded-full bg-current ${colors.text}`} />
                <span className={`text-sm font-medium ${colors.text}`}>Step Settings</span>
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
                <TextInput
                    label="Step Title"
                    value={localTitle}
                    onChange={(e) => setLocalTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    placeholder="Enter step title"
                />

                <Textarea
                    label="Description"
                    value={localDescription}
                    onChange={(e) => setLocalDescription(e.target.value)}
                    onBlur={handleDescriptionBlur}
                    placeholder="Describe this step (optional)"
                    rows={3}
                />
            </div>

            {/* Sections */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Sections
                        <span className="ml-2 text-xs font-normal text-neutral-500 dark:text-neutral-400">
                            ({step.sections.length}/{LIMITS.MAX_SECTIONS_PER_STEP})
                        </span>
                    </h3>

                    <button
                        onClick={handleAddSection}
                        disabled={!canAddSection}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add Section
                    </button>
                </div>

                {/* Sections List */}
                {step.sections.length > 0 ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={step.sections.map((s) => s.key)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-2">
                                {step.sections.map((section) => (
                                    <SortableEntityCard
                                        key={section.key}
                                        id={section.key}
                                        type="section"
                                        title={section.title}
                                        subtitle={`${section.fields.length} ${section.fields.length === 1 ? 'field' : 'fields'}`}
                                        onClick={() => dispatch(navigate([stepKey, section.key]))}
                                        onDelete={() => handleDeleteSection(section.key, section.title)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                ) : (
                    <div className="p-8 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg text-center">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                            No sections yet. Add your first section to organize fields.
                        </p>
                        <button
                            onClick={handleAddSection}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add First Section
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}