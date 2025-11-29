import { PanelLeftClose, PanelLeft } from 'lucide-react';
import { useAppSelector } from '../../../../store/useRedux';
import { LIMITS } from '../../helpers/constants';
import TreeView from './TreeView';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const { formConfig } = useAppSelector((state) => state.formBuilder);

    // Calculate stats
    const stepCount = formConfig.steps.length;
    const fieldCount = formConfig.steps.reduce(
        (sum, step) => sum + step.sections.reduce(
            (sSum, section) => sSum + section.fields.length, 0
        ), 0
    );
    const maxFields = LIMITS.MAX_STEPS * LIMITS.MAX_SECTIONS_PER_STEP * LIMITS.MAX_FIELDS_PER_SECTION;
    const fieldPercentage = Math.round((fieldCount / maxFields) * 100);

    if (!isOpen) {
        return (
            <button
                onClick={onToggle}
                className="fixed left-4 top-20 z-10 p-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                title="Open sidebar"
            >
                <PanelLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
        );
    }

    return (
        <aside className="w-64 shrink-0 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Structure
                </h2>
                <button
                    onClick={onToggle}
                    className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    title="Close sidebar"
                >
                    <PanelLeftClose className="w-4 h-4" />
                </button>
            </div>

            {/* Tree */}
            <div className="flex-1 overflow-y-auto px-2">
                <TreeView />
            </div>

            {/* Stats Footer */}
            <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    <span>{stepCount}/{LIMITS.MAX_STEPS} steps</span>
                    <span>{fieldCount} fields</span>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-300 ${fieldPercentage > 80
                                ? 'bg-amber-500'
                                : fieldPercentage > 95
                                    ? 'bg-red-500'
                                    : 'bg-blue-500'
                            }`}
                        style={{ width: `${Math.min(fieldPercentage, 100)}%` }}
                    />
                </div>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 text-center">
                    {fieldPercentage}% capacity used
                </p>
            </div>
        </aside>
    );
}