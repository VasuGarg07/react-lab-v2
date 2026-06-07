import { GripVertical, Trash2, ChevronRight, FileText, Layers, Grid3X3, ToggleLeft } from 'lucide-react';
import type { EntityType } from '../../helpers/types';
import { ENTITY_COLORS } from '../../helpers/constants';

const ENTITY_ICONS: Record<EntityType, typeof FileText> = {
    form: FileText, step: Layers, section: Grid3X3, field: ToggleLeft,
};

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
    const Icon = ENTITY_ICONS[type];

    const handleDelete = (e: React.MouseEvent) => { e.stopPropagation(); onDelete(); };

    return (
        <div
            onClick={onClick}
            className={`group flex items-center gap-3 p-2.5 pr-3 rounded-xl border cursor-pointer transition-all duration-200 bg-white hover:shadow-card hover:-translate-y-px ${colors.border} ${isDragging ? 'shadow-lift ring-2 ' + colors.ring + ' opacity-95' : ''}`}
        >
            {dragHandleProps && (
                <div
                    {...dragHandleProps}
                    className="shrink-0 -mr-1 p-1 text-neutral-300 hover:text-neutral-500 cursor-grab active:cursor-grabbing touch-none"
                    onClick={(e) => e.stopPropagation()}
                    title="Drag to reorder"
                >
                    <GripVertical className="w-4 h-4" />
                </div>
            )}
            <div className={`grid place-items-center shrink-0 w-9 h-9 rounded-lg ${colors.bg} ${colors.text}`}>
                <Icon className="w-4 h-4" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{title || 'Untitled'}</p>
                {subtitle && <p className="text-xs text-neutral-500 truncate mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
                <button onClick={handleDelete} className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200" title="Delete">
                    <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
            </div>
        </div>
    );
}
