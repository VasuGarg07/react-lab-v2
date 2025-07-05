import React from 'react';
import {
    Calendar,
    Copy,
    Download,
    Edit3,
    Eye,
    MoreHorizontal,
    Share2,
    ToggleLeft,
    ToggleRight,
    Trash2,
    Users
} from 'lucide-react';
import { Form } from '../../helpers/fb.types';
import { FileUtils } from '../../helpers/fb.utils';
import { cn } from '@/shared/cn';
import DropdownMenu from '@/ui/DropdownMenu';

interface FormCardProps {
    form: Form;
    onEdit: (formId: string) => void;
    onViewResponses: (formId: string) => void;
    onShare: (formId: string) => void;
    onDelete: (formId: string) => void;
    onToggleStatus: (formId: string) => void;
    onDuplicate: (formId: string) => void;
    onExport: (formId: string) => void;
}

const FormCard: React.FC<FormCardProps> = ({
    form,
    onEdit,
    onViewResponses,
    onShare,
    onDelete,
    onToggleStatus,
    onDuplicate,
    onExport
}) => {
    const getStepCount = () => form.steps.length;
    const getFieldCount = () => form.steps.reduce((total, step) =>
        total + step.sections.reduce((sectionTotal, section) =>
            sectionTotal + section.fields.length, 0), 0);

    const dropdownItems = [
        {
            label: form.isActive ? 'Archive' : 'Activate',
            icon: form.isActive ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />,
            onClick: () => onToggleStatus(form.id),
        },
        {
            label: 'Duplicate',
            icon: <Copy className="w-4 h-4" />,
            onClick: () => onDuplicate(form.id),
        },
        {
            label: 'Export JSON',
            icon: <Download className="w-4 h-4" />,
            onClick: () => onExport(form.id),
        },
        {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: () => onDelete(form.id),
            variant: 'danger' as const
        }
    ];

    return (
        <div className={cn(
            "group bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4",
            "hover:shadow-md hover:shadow-neutral-200 dark:hover:shadow-neutral-900 hover:-translate-y-1",
            "transition-all duration-200",
            "w-72 h-64 flex flex-col"
        )}>            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2 truncate">
                        {form.title}
                    </h3>

                    {/* Status indicator */}
                    <div className={cn(
                        "inline-flex items-center space-x-1.5 text-xs font-medium px-2 py-1 rounded-full",
                        form.isActive
                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}>
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            form.isActive ? "bg-emerald-500" : "bg-slate-400"
                        )} />
                        <span>{form.isActive ? 'Active' : 'Archived'}</span>
                    </div>
                </div>

                <DropdownMenu
                    trigger={
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    }
                    items={dropdownItems}
                />
            </div>

            {/* Description */}
            {form.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {form.description}
                </p>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between mb-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{form.responseCount}</span>
                </div>
                <div>{getStepCount()} steps • {getFieldCount()} fields</div>
            </div>

            {/* Date */}
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4">
                <Calendar className="w-3 h-3 mr-1" />
                {FileUtils.formatDate(form.updatedAt)}
            </div>

            {/* Actions - pushed to bottom */}
            <div className="flex items-center space-x-2 mt-auto">
                <button
                    onClick={() => onEdit(form.id)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                </button>

                <button
                    onClick={() => onViewResponses(form.id)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                </button>

                <button
                    onClick={() => onShare(form.id)}
                    className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                >
                    <Share2 className="w-3 h-3 mr-1" />
                    Share
                </button>
            </div>
        </div>
    );
};

export default FormCard;