import { FileText, Layers, Grid3X3, ToggleLeft } from 'lucide-react';
import type { EntityType } from '../../helpers/types';
import { ENTITY_COLORS } from '../../helpers/constants';

const ENTITY_ICONS: Record<EntityType, typeof FileText> = {
    form: FileText, step: Layers, section: Grid3X3, field: ToggleLeft,
};

const ENTITY_LABEL: Record<EntityType, string> = {
    form: 'Form', step: 'Step', section: 'Section', field: 'Field',
};

interface EditorHeaderProps {
    type: EntityType;
    title?: string;
}

/** Consistent header for each builder editor — entity icon chip + label. */
export default function EditorHeader({ type, title }: EditorHeaderProps) {
    const colors = ENTITY_COLORS[type];
    const Icon = ENTITY_ICONS[type];

    return (
        <div className="flex items-center gap-3">
            <div className={`grid place-items-center w-11 h-11 rounded-xl ${colors.bg} ${colors.text}`}>
                <Icon className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="min-w-0">
                <p className={`text-[11px] font-bold uppercase tracking-wider ${colors.text}`}>{ENTITY_LABEL[type]} settings</p>
                <h2 className="font-display text-lg font-bold text-ink truncate">{title || `Untitled ${ENTITY_LABEL[type]}`}</h2>
            </div>
        </div>
    );
}
