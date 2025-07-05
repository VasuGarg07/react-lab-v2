import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/cn';
import { EntityType, FieldType } from '../../helpers/fb.types';
import Dialog from '@/ui/Dialog';
import Select from '@/ui/Select';

interface FBAddButtonProps {
    label: string;
    entityType: EntityType;
    onClick: (title: string, fieldType?: FieldType) => void;
    disabled?: boolean;
    className?: string;
}

const FBAddButton: React.FC<FBAddButtonProps> = ({
    label,
    entityType,
    onClick,
    disabled = false,
    className
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedFieldType, setSelectedFieldType] = useState<FieldType>('text');

    const fieldTypeOptions = [
        { value: 'text', label: 'Text Field' },
        { value: 'number', label: 'Number Field' },
        { value: 'select', label: 'Select Field (Radio)' },
        { value: 'multi_select', label: 'Multi-Select Field (Checkbox)' },
        { value: 'boolean', label: 'Yes/No Field (Switch)' },
        { value: 'range', label: 'Range Field (Slider)' }
    ];

    const handleOpenDialog = () => {
        if (disabled) return;
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            if (entityType === 'field') {
                onClick(trimmedTitle, selectedFieldType);
            } else {
                onClick(trimmedTitle);
            }
            setTitle('');
            setSelectedFieldType('text');
            setIsDialogOpen(false);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setSelectedFieldType('text');
        setIsDialogOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && title.trim()) {
            handleCreate();
        }
        if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const getDialogTitle = () => {
        switch (entityType) {
            case 'step':
                return 'Add New Step';
            case 'section':
                return 'Add New Section';
            case 'field':
                return 'Add New Field';
            default:
                return 'Add New Item';
        }
    };

    return (
        <>
            <button
                onClick={handleOpenDialog}
                disabled={disabled}
                className={cn(
                    "w-full py-2 px-3 rounded-lg",
                    "border border-dashed",
                    "flex items-center justify-center gap-2",
                    "text-sm font-medium",
                    // Teal color scheme
                    "border-teal-300 dark:border-teal-600",
                    "text-teal-600 dark:text-teal-400",
                    "bg-teal-50 dark:bg-teal-950/20",
                    // Hover states
                    "hover:border-teal-400 dark:hover:border-teal-500",
                    "hover:text-teal-700 dark:hover:text-teal-300",
                    "hover:bg-teal-100 dark:hover:bg-teal-900/30",
                    // Disabled states
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "disabled:hover:border-teal-300 disabled:hover:text-teal-600",
                    "disabled:hover:bg-teal-50 dark:disabled:hover:bg-teal-950/20",
                    className
                )}
            >
                <Plus className="w-4 h-4" />
                {label}
            </button>

            <Dialog
                open={isDialogOpen}
                onClose={setIsDialogOpen}
                title={getDialogTitle()}
                size="sm"
            >
                <div className="p-4 space-y-4">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {entityType === 'field' ? 'Field Label' : 'Title'}
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Enter ${entityType} ${entityType === 'field' ? 'label' : 'title'}`}
                            className={cn(
                                "w-full px-3 py-2 rounded-lg",
                                "border border-gray-300 dark:border-zinc-600",
                                "bg-white dark:bg-zinc-700",
                                "text-gray-900 dark:text-white",
                                "placeholder-gray-400 dark:placeholder-gray-500"
                            )}
                            autoFocus
                        />
                    </div>

                    {/* Field Type Selection (only for fields) */}
                    {entityType === 'field' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Field Type
                            </label>
                            <Select
                                options={fieldTypeOptions}
                                value={selectedFieldType}
                                onValueChange={(value) => setSelectedFieldType(value as FieldType)}
                                placeholder="Select field type"
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={handleCancel}
                            className={cn(
                                "px-3 py-2 rounded-lg text-sm font-medium",
                                "border border-gray-300 dark:border-zinc-600",
                                "text-gray-700 dark:text-gray-300",
                                "hover:bg-gray-50 dark:hover:bg-zinc-700"
                            )}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            disabled={!title.trim()}
                            className={cn(
                                "px-3 py-2 rounded-lg text-sm font-medium",
                                "bg-blue-600 text-white",
                                "hover:bg-blue-700",
                                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                            )}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default FBAddButton;