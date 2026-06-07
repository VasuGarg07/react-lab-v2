import { PanelLeftClose, PanelLeft, Network } from 'lucide-react';
import { useAppSelector } from '../../store/useRedux';
import { LIMITS } from '../../helpers/constants';
import TreeView from './TreeView';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const { formConfig } = useAppSelector((state) => state.formBuilder);

    const stepCount = formConfig.steps.length;
    const fieldCount = formConfig.steps.reduce(
        (sum, step) => sum + step.sections.reduce((sSum, section) => sSum + section.fields.length, 0), 0
    );
    const maxFields = LIMITS.MAX_STEPS * LIMITS.MAX_SECTIONS_PER_STEP * LIMITS.MAX_FIELDS_PER_SECTION;
    const fieldPercentage = Math.round((fieldCount / maxFields) * 100);
    const barColor = fieldPercentage >= 95 ? 'bg-red-500' : fieldPercentage >= 80 ? 'bg-amber-500' : 'bg-plum';

    if (!isOpen) {
        return (
            <button
                onClick={onToggle}
                className="fixed left-4 top-20 z-10 p-2.5 bg-white border border-neutral-200 rounded-xl shadow-card hover:bg-neutral-50 transition-colors"
                title="Open structure panel"
            >
                <PanelLeft className="w-5 h-5 text-neutral-600" />
            </button>
        );
    }

    return (
        <aside className="w-72 shrink-0 bg-white border-r border-neutral-200 flex flex-col h-full">
            <div className="flex items-center justify-between px-4 h-12 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-neutral-400" strokeWidth={2} />
                    <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Structure</h2>
                </div>
                <button onClick={onToggle} className="p-1.5 rounded-lg text-neutral-400 hover:text-ink hover:bg-neutral-100 transition-colors" title="Collapse panel">
                    <PanelLeftClose className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-1">
                <TreeView />
            </div>

            <div className="px-4 py-3 border-t border-neutral-200 bg-neutral-50/50">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-2">
                    <span className="tabular-nums">{stepCount}/{LIMITS.MAX_STEPS} steps</span>
                    <span className="tabular-nums">{fieldCount} fields</span>
                </div>
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${Math.min(fieldPercentage, 100)}%` }}
                    />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1.5 text-center">{fieldPercentage}% of capacity used</p>
            </div>
        </aside>
    );
}
