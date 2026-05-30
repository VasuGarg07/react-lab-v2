import { GripVertical, Trash2, ChevronRight } from 'lucide-react';
import type { EntityType } from '../../helpers/types';
import { ENTITY_COLORS } from '../../helpers/constants';

interface EntityCardProps {
    type: EntityType;
    title: string;
    subtitle?: string;
    onClick: () => void;
    onDelete: () => void;
    dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
    isDragging?: boolean;
}

export default function EntityCard({ type, title, subtitle, onClick, onDelete, dragHandleProps, isDragging = false }: EntityCardProps) {
    const colors = ENTITY_COLORS[type];

    const handleDelete = (e: React.MouseEvent) => { e.stopPropagation(); onDelete(); };

    return (
        <div
            onClick={onClick}
            className={`group flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 bg-white dark:bg-neutral-800 hover:shadow-sm ${colors.border} ${isDragging ? 'shadow-lg ring-2 ring-blue-500/20 opacity-90' : ''}`}
        >
            {dragHandleProps && (
                <div {...dragHandleProps} className="shrink-0 text-neutral-300 dark:text-neutral-600 hover:text-neutral-500 dark:hover:text-neutral-400 cursor-grab active:cursor-grabbing touch-none" onClick={(e) => e.stopPropagation()}>
                    <GripVertical className="w-4 h-4" />
                </div>
            )}
            <div className={`shrink-0 w-1.5 h-10 rounded-full ${colors.bg}`} />
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${colors.text}`}>{title || 'Untitled'}</p>
                {subtitle && <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <button onClick={handleDelete} className="p-1.5 rounded-md text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all duration-200" title="Delete">
                    <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            </div>
        </div>
    );
}
