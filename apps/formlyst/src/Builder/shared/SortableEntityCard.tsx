import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EntityCard from './EntityCard';
import type { EntityType } from '../../helpers/types';

interface SortableEntityCardProps {
    id: string;
    type: EntityType;
    title: string;
    subtitle?: string;
    onClick: () => void;
    onDelete: () => void;
}

export default function SortableEntityCard({ id, type, title, subtitle, onClick, onDelete }: SortableEntityCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div ref={setNodeRef} style={style}>
            <EntityCard
                type={type} title={title} subtitle={subtitle}
                onClick={onClick} onDelete={onDelete}
                dragHandleProps={{ ...attributes, ...listeners }}
                isDragging={isDragging}
            />
        </div>
    );
}
