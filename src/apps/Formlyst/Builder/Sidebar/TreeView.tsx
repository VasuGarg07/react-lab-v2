import { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Layers, Grid3X3, ToggleLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../../store/useRedux';
import { navigate } from '../../../../store/formBuilderSlice';
import { ENTITY_COLORS } from '../../helpers/constants';
import type { EntityType } from '../../helpers/types';

// Icons for each entity type
const ENTITY_ICONS: Record<EntityType, typeof FileText> = {
    form: FileText,
    step: Layers,
    section: Grid3X3,
    field: ToggleLeft,
};

export default function TreeView() {
    const dispatch = useAppDispatch();
    const { formConfig, path } = useAppSelector((state) => state.formBuilder);

    // Track expanded nodes
    const [expanded, setExpanded] = useState<Set<string>>(() => {
        // Auto-expand current path
        const initial = new Set<string>();
        if (path[0]) initial.add(path[0]);
        if (path[1]) initial.add(`${path[0]}/${path[1]}`);
        return initial;
    });

    const toggleExpand = (key: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const isActive = (nodePath: string[]) => {
        return JSON.stringify(nodePath) === JSON.stringify(path);
    };

    const renderNode = (
        type: EntityType,
        label: string,
        nodePath: string[],
        hasChildren: boolean,
        depth: number,
        expandKey?: string,
        childCount?: number
    ) => {
        const colors = ENTITY_COLORS[type];
        const Icon = ENTITY_ICONS[type];
        const active = isActive(nodePath);
        const isExpanded = expandKey ? expanded.has(expandKey) : false;

        return (
            <button
                onClick={() => dispatch(navigate(nodePath))}
                className={`
                    w-full flex items-center gap-2 py-1.5 px-2 rounded-md text-left text-sm
                    transition-all duration-150
                    ${active
                        ? `${colors.bg} ${colors.text} font-medium`
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }
                `}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
                {/* Expand/Collapse Toggle */}
                {hasChildren ? (
                    <span
                        onClick={(e) => expandKey && toggleExpand(expandKey, e)}
                        className="shrink-0 p-0.5 -ml-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                        {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                        )}
                    </span>
                ) : (
                    <span className="w-4.5 shrink-0" />
                )}

                {/* Icon */}
                <Icon className={`w-4 h-4 shrink-0 ${active ? '' : 'text-neutral-400 dark:text-neutral-500'}`} />

                {/* Label */}
                <span className="flex-1 truncate">{label || 'Untitled'}</span>

                {/* Child Count Badge */}
                {childCount !== undefined && childCount > 0 && (
                    <span className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">
                        {childCount}
                    </span>
                )}
            </button>
        );
    };

    return (
        <div className="py-2">
            {/* Form (Root) */}
            {renderNode('form', formConfig.title, [], formConfig.steps.length > 0, 0, 'form', formConfig.steps.length)}

            {/* Steps */}
            {expanded.has('form') && formConfig.steps.map((step) => (
                <div key={step.key}>
                    {renderNode(
                        'step',
                        step.title,
                        [step.key],
                        step.sections.length > 0,
                        1,
                        step.key,
                        step.sections.length
                    )}

                    {/* Sections */}
                    {expanded.has(step.key) && step.sections.map((section) => (
                        <div key={section.key}>
                            {renderNode(
                                'section',
                                section.title,
                                [step.key, section.key],
                                section.fields.length > 0,
                                2,
                                `${step.key}/${section.key}`,
                                section.fields.length
                            )}

                            {/* Fields */}
                            {expanded.has(`${step.key}/${section.key}`) && section.fields.map((field) => (
                                <div key={field.key}>
                                    {renderNode(
                                        'field',
                                        field.label,
                                        [step.key, section.key, field.key],
                                        false,
                                        3
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}

            {/* Empty State */}
            {formConfig.steps.length === 0 && (
                <p className="px-4 py-3 text-xs text-neutral-400 dark:text-neutral-500 text-center">
                    No steps yet. Start by adding a step.
                </p>
            )}
        </div>
    );
}