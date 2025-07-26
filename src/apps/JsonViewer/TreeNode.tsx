import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible as BaseCollapsible } from '@base-ui-components/react/collapsible';
import { memo, useState } from "react";
import { cn } from "@/shared/cn";
import { getMetadata, JsonValue } from "./json.utilities";
import { useJsonViewerStore } from "./json.store";

interface TreeNodeProps {
    label: string;
    value: JsonValue;
    depth: number;
    path: string[];
}

const TreeNode: React.FC<TreeNodeProps> = ({ label, value, depth, path }) => {
    const [isOpen, setIsOpen] = useState(depth < 2);
    const navigateToPath = useJsonViewerStore(state => state.navigateToPath);

    const indent = depth * 0.5;
    const isExpandable = value !== null && (typeof value === 'object');
    const isArray = Array.isArray(value);
    const isEmpty = isExpandable && Object.keys(value).length === 0;
    const metadata = getMetadata(value);

    // Value display with updated color scheme
    const renderValue = (val: JsonValue) => {
        if (val === null) {
            return (
                <span className="text-red-500 dark:text-red-400">
                    null
                </span>
            );
        }

        const type = typeof val;

        switch (type) {
            case 'string':
                return (
                    <span className="text-emerald-600 dark:text-emerald-400">
                        "{val.toString()}"
                    </span>
                );
            case 'number':
                return (
                    <span className="text-cyan-600 dark:text-cyan-400">
                        {val.toString()}
                    </span>
                );
            case 'boolean':
                return (
                    <span className="text-amber-600 dark:text-amber-400">
                        {val.toString()}
                    </span>
                );
            default:
                return null;
        }
    };

    const handleNodeClick = () => {
        if (isExpandable && !isEmpty) {
            navigateToPath([...path, label]);
        }
    };

    if (isExpandable) {
        return (
            <BaseCollapsible.Root open={isOpen} onOpenChange={setIsOpen} className="font-mono text-sm">
                <div className="flex items-start group py-1  rounded-md">
                    <BaseCollapsible.Trigger
                        className={cn(
                            "p-1 focus:outline-none",
                            "text-slate-500 dark:text-slate-400",
                            "hover:text-slate-700 dark:hover:text-slate-200",
                            "focus:ring-2 focus:ring-blue-500/20 rounded",
                            isEmpty && "cursor-default opacity-50"
                        )}
                        style={{ marginLeft: `${indent}rem` }}
                        disabled={isEmpty}
                    >
                        {isEmpty ? (
                            <div className="w-3.5 h-3.5" />
                        ) : (
                            isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                        )}
                    </BaseCollapsible.Trigger>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-1">
                            <span
                                className={cn(
                                    "font-medium text-violet-600 dark:text-violet-400 transition-colors",
                                    !isEmpty && "cursor-pointer hover:text-violet-800 dark:hover:text-violet-300"
                                )}
                                onClick={handleNodeClick}
                            >
                                {label}:
                            </span>

                            <span className="text-slate-500 dark:text-slate-400">
                                {metadata} {isEmpty ? (isArray ? '[]' : '{}') : (isArray ? '[' : '{')}
                            </span>

                            {!isEmpty && (
                                <button
                                    onClick={handleNodeClick}
                                    className={cn(
                                        "text-xs text-blue-500 dark:text-blue-400 transition-all",
                                        "opacity-0 group-hover:opacity-100",
                                        "hover:text-blue-600 dark:hover:text-blue-300",
                                        "focus:outline-none focus:opacity-100",
                                        "px-1 py-0.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    )}
                                >
                                    Navigate →
                                </button>
                            )}
                        </div>

                        {!isEmpty && (
                            <BaseCollapsible.Panel
                                className={cn(
                                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                                    "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
                                    "duration-200"
                                )}
                            >
                                <div className="mt-1">
                                    {Object.entries(value).map(([key, val], index) => (
                                        <TreeNode
                                            key={isArray ? `${key}-${index}` : key}
                                            label={isArray ? `${index}` : `${key}`}
                                            value={val}
                                            depth={depth + 1}
                                            path={[...path, label]}
                                        />
                                    ))}
                                    <div style={{ marginLeft: `${indent + 0.5}rem` }}>
                                        <span className="text-slate-500 dark:text-slate-400">{isArray ? ']' : '}'}</span>
                                    </div>
                                </div>
                            </BaseCollapsible.Panel>
                        )}
                    </div>
                </div>
            </BaseCollapsible.Root>
        );
    }

    // Primitive value rendering
    return (
        <div className="flex items-center py-1 font-mono text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">
            <div style={{ marginLeft: `${indent + 0.75}rem` }}></div>
            <div className="flex items-center min-w-0 flex-1">
                <span className="font-medium text-violet-600 dark:text-violet-400 mr-2 flex-shrink-0">
                    {label}:
                </span>
                <div className="min-w-0 flex-1">
                    {renderValue(value)}
                </div>
            </div>
        </div>
    );
};

export default memo(TreeNode);