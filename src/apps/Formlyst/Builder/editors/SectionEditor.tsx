import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '../../../../store/useRedux';
import { updateSection, addField, removeField, reorderFields, navigate } from '../../../../store/formBuilderSlice';
import { useModal } from '../../../../components/ModalContext';
import SortableEntityCard from '../shared/SortableEntityCard';
import AddEntityDialog from '../shared/AddEntityDialog';
import { LIMITS, ENTITY_COLORS, FIELD_TYPE_OPTIONS } from '../../helpers/constants';
import type { FieldType } from '../../helpers/types';
import { openAlertDialog } from '../../../../ui/AlertDialog';
import TextInput from '../../../../ui/TextInput';
import Textarea from '../../../../ui/Textarea';

interface SectionEditorProps {
    stepKey: string;
    sectionKey: string;
}

export default function SectionEditor({ stepKey, sectionKey }: SectionEditorProps) {
    const dispatch = useAppDispatch();
    const modal = useModal();
    const { formConfig } = useAppSelector((state) => state.formBuilder);

    const step = formConfig.steps.find((s) => s.key === stepKey);
    const section = step?.sections.find((s) => s.key === sectionKey);

    // Local state for blur-based updates
    const [localTitle, setLocalTitle] = useState(section?.title || '');
    const [localDescription, setLocalDescription] = useState(section?.description || '');

    // Sync local state when section changes
    useEffect(() => {
        if (section) {
            setLocalTitle(section.title);
            setLocalDescription(section.description || '');
        }
    }, [section?.key]);

    // DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    if (!step || !section) {
        return (
            <div className="p-8 text-center text-neutral-500 dark:text-neutral-400">
                Section not found
            </div>
        );
    }

    const handleTitleBlur = () => {
        if (localTitle.trim() !== section.title) {
            dispatch(updateSection({ stepKey, sectionKey, title: localTitle.trim() || 'Untitled Section' }));
        }
    };

    const handleDescriptionBlur = () => {
        if (localDescription !== (section.description || '')) {
            dispatch(updateSection({ stepKey, sectionKey, description: localDescription }));
        }
    };

    const handleAddField = () => {
        modal.open(
            <AddEntityDialog
                entityType="field"
                onAdd={(label, fieldType) => dispatch(addField({ stepKey, sectionKey, type: fieldType as FieldType, label }))}
            />
        );
    };

    const handleDeleteField = (fieldKey: string, fieldLabel: string) => {
        openAlertDialog(modal, {
            title: 'Delete Field',
            message: `Are you sure you want to delete "${fieldLabel}"?`,
            confirmText: 'Delete',
            onConfirm: () => { dispatch(removeField({ stepKey, sectionKey, fieldKey })); },
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = section.fields.findIndex((f) => f.key === active.id);
            const newIndex = section.fields.findIndex((f) => f.key === over.id);
            dispatch(reorderFields({ stepKey, sectionKey, fromIndex: oldIndex, toIndex: newIndex }));
        }
    };

    // Get field type label
    const getFieldTypeLabel = (type: FieldType) => {
        return FIELD_TYPE_OPTIONS.find((opt) => opt.value === type)?.label || type;
    };

    const colors = ENTITY_COLORS.section;
    const canAddField = section.fields.length < LIMITS.MAX_FIELDS_PER_SECTION;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className={`flex items-center gap-3 p-4 rounded-lg ${colors.bg}`}>
                <div className={`w-2 h-2 rounded-full bg-current ${colors.text}`} />
                <span className={`text-sm font-medium ${colors.text}`}>Section Settings</span>
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
                <TextInput
                    label="Section Title"
                    value={localTitle}
                    onChange={(e) => setLocalTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    placeholder="Enter section title"
                />

                <Textarea
                    label="Description"
                    value={localDescription}
                    onChange={(e) => setLocalDescription(e.target.value)}
                    onBlur={handleDescriptionBlur}
                    placeholder="Describe this section (optional)"
                    rows={3}
                />
            </div>

            {/* Fields */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Fields
                        <span className="ml-2 text-xs font-normal text-neutral-500 dark:text-neutral-400">
                            ({section.fields.length}/{LIMITS.MAX_FIELDS_PER_SECTION})
                        </span>
                    </h3>

                    <button
                        onClick={handleAddField}
                        disabled={!canAddField}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add Field
                    </button>
                </div>

                {/* Fields List */}
                {section.fields.length > 0 ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={section.fields.map((f) => f.key)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-2">
                                {section.fields.map((field) => (
                                    <SortableEntityCard
                                        key={field.key}
                                        id={field.key}
                                        type="field"
                                        title={field.label}
                                        subtitle={`${getFieldTypeLabel(field.type)}${field.required ? ' • Required' : ''}`}
                                        onClick={() => dispatch(navigate([stepKey, sectionKey, field.key]))}
                                        onDelete={() => handleDeleteField(field.key, field.label)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                ) : (
                    <div className="p-8 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg text-center">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                            No fields yet. Add fields to collect data.
                        </p>
                        <button
                            onClick={handleAddField}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add First Field
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}