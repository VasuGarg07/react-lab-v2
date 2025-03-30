import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible } from "radix-ui";
import React, { useState } from "react";
import { JsonValue } from "./json.helper";

interface TreeNodeProps {
    label: string;
    value: JsonValue;
    depth: number;
    path: string[];
    onPathChange: (path: string[]) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ label, value, depth, path, onPathChange }) => {
    const [isOpen, setIsOpen] = useState(depth < 2);
    const indent = depth * 1.25; // Tighter indentation

    // Format based on value type
    const getValueDisplay = (val: JsonValue): { display: React.ReactNode, type: string } => {
        if (val === null) return { display: <span className="text-gray-500 dark:text-gray-400">null</span>, type: 'null' };

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
                <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
                    <div className="flex items-start group py-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                        <Collapsible.Trigger asChild>
                            <button
                                className="p-1 focus:outline-none text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                style={{ marginLeft: `${indent}rem` }}
                            >
                                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                        </Collapsible.Trigger>

                        <div className="flex-1">
                            <div className="flex items-center">
                                <span
                                    className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer"
                                    onClick={handleNodeClick}
                                >
                                    {label}:
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 ml-1.5">
                                    {isArray ? '(Array) [' : '(Object) {'}{isEmpty ? isArray ? ']' : '}' : ''}
                                </span>
                                {!isEmpty && (
                                    <button
                                        onClick={handleNodeClick}
                                        className="ml-2 text-xs text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Navigate
                                    </button>
                                )}
                            </div>

                            {!isEmpty && (
                                <Collapsible.Content>
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
                                    <div style={{ marginLeft: `${indent + 1.25}rem` }}>
                                        <span className="text-gray-500 dark:text-gray-400">{isArray ? ']' : '}'}</span>
                                    </div>
                                </Collapsible.Content>
                            )}
                        </div>
                    </div>
                </Collapsible.Root>
            ) : (
                <div className="flex py-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                    <div style={{ marginLeft: `${indent + 1.5}rem` }}></div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{label}</span>
                    <span className="ml-1.5">{display}</span>
                </div>
            )}
        </div>
    );
};

export default React.memo(TreeNode);