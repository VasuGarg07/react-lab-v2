import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { ReactNode } from 'react';

interface SortableListProps<T> {
    items: T[];
    getKey: (item: T) => string;
    onReorder: (fromIndex: number, toIndex: number) => void;
    renderItem: (item: T, index: number) => ReactNode;
}

export function SortableList<T>({ items, getKey, onReorder, renderItem }: SortableListProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex(i => getKey(i) === active.id);
            const newIndex = items.findIndex(i => getKey(i) === over.id);
            onReorder(oldIndex, newIndex);
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(getKey)} strategy={verticalListSortingStrategy}>
                {items.map((item, index) => renderItem(item, index))}
            </SortableContext>
        </DndContext>
    );
}
