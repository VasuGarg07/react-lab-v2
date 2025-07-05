import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible as BaseCollapsible } from '@base-ui-components/react/collapsible';
import React, { useState } from "react";
import { JsonValue } from "./json.helper";
import { cn } from "@/shared/cn";

interface TreeNodeProps {
    label: string;
    value: JsonValue;
    depth: number;
    path: string[];
    onPathChange: (path: string[]) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ label, value, depth, path, onPathChange }) => {
    const [isOpen, setIsOpen] = useState(depth < 2);
    const indent = depth * 0.5; // Reduced indentation - 2 spaces per level

    // Format based on value type
    const getValueDisplay = (val: JsonValue): { display: React.ReactNode, type: string } => {
        if (val === null) return { display: <span className="text-slate-500 dark:text-slate-400">null</span>, type: 'null' };

        const type = typeof val;

        switch (type) {
            case 'string':
                return {
                    display: <span className="text-emerald-600 dark:text-emerald-400">"{val.toString()}"</span>,
                    type
                };
            case 'number':
                return {
                    display: <span className="text-blue-600 dark:text-blue-400">{val.toString()}</span>,
                    type
                };
            case 'boolean':
                return {
                    display: <span className="text-purple-600 dark:text-purple-400">{val.toString()}</span>,
                    type
                };
            default:
                return { display: null, type };
        }
    };

    // Determine if the value is expandable (object or array)
    const isExpandable = value !== null && (typeof value === 'object');
    const isArray = Array.isArray(value);
    const isEmpty = isExpandable && Object.keys(value).length === 0;

    // Get display values for primitive types
    const { display } = getValueDisplay(value);

    // Handle navigation into this node
    const handleNodeClick = () => {
        if (isExpandable) {
            const newPath = [...path, label];
            onPathChange(newPath);
        }
    };

    return (
        <div className="font-mono text-sm">
            {isExpandable ? (
                <BaseCollapsible.Root open={isOpen} onOpenChange={setIsOpen}>
                    <div className="flex items-start group py-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">
                        <BaseCollapsible.Trigger
                            className={cn(
                                "p-1 focus:outline-none transition-colors",
                                "text-slate-500 dark:text-slate-400",
                                "hover:text-slate-700 dark:hover:text-slate-200",
                                "focus:ring-2 focus:ring-blue-500/20 rounded"
                            )}
                            style={{ marginLeft: `${indent}rem` }}
                        >
                            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </BaseCollapsible.Trigger>

                        <div className="flex-1">
                            <div className="flex items-center">
                                <span
                                    className="font-medium text-slate-800 dark:text-slate-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    onClick={handleNodeClick}
                                >
                                    {label}:
                                </span>
                                <span className="text-slate-500 dark:text-slate-400 ml-1.5">
                                    {isArray ? '(Array) [' : '(Object) {'}{isEmpty ? isArray ? ']' : '}' : ''}
                                </span>
                                {!isEmpty && (
                                    <button
                                        onClick={handleNodeClick}
                                        className={cn(
                                            "ml-2 text-xs text-blue-500 dark:text-blue-400 transition-opacity",
                                            "opacity-0 group-hover:opacity-100",
                                            "hover:text-blue-600 dark:hover:text-blue-300",
                                            "focus:outline-none focus:opacity-100"
                                        )}
                                    >
                                        Navigate
                                    </button>
                                )}
                            </div>

                            {!isEmpty && (
                                <BaseCollapsible.Panel
                                    className={cn(
                                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                                        "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top"
                                    )}
                                >
                                    {Object.entries(value).map(([key, val], index) => (
                                        <TreeNode
                                            key={isArray ? `${key}-${index}` : key}
                                            label={isArray ? `${index}` : `${key}`}
                                            value={val}
                                            depth={depth + 1}
                                            path={[...path, label]}
                                            onPathChange={onPathChange}
                                        />
                                    ))}
                                    <div style={{ marginLeft: `${indent + 0.5}rem` }}>
                                        <span className="text-slate-500 dark:text-slate-400">{isArray ? ']' : '}'}</span>
                                    </div>
                                </BaseCollapsible.Panel>
                            )}
                        </div>
                    </div>
                </BaseCollapsible.Root>
            ) : (
                <div className="flex py-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">
                    <div style={{ marginLeft: `${indent + 0.75}rem` }}></div>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{label}:</span>
                    <span className="ml-1.5">{display}</span>
                </div>
            )}
        </div>
    );
};

export default React.memo(TreeNode);