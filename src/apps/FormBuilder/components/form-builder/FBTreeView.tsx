import React, { useState } from 'react';
import { FileText, Layers, SquareMenu, Type, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollArea } from '@base-ui-components/react/scroll-area';
import { Collapsible } from '@base-ui-components/react/collapsible';
import { Meter } from '@base-ui-components/react/meter';
import { cn } from '@/shared/cn';
import { useTreeStructure, useNavigation, useCurrentView, useCurrentPath, useFormConfig } from '../../helpers/useFormEngine';
import { TreeNode, ViewType } from '../../helpers/fb.types';
import { FORM_LIMITS } from '../../helpers/fb.constants';

interface FBTreeViewProps {
    className?: string;
}

const FBTreeView: React.FC<FBTreeViewProps> = ({ className }) => {
    const treeStructure = useTreeStructure();
    const { navigateToForm, navigateToStep, navigateToSection, navigateToField } = useNavigation();
    const currentView = useCurrentView();
    const currentPath = useCurrentPath();
    const formConfig = useFormConfig();
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

    // Calculate field statistics
    const getFieldStats = () => {
        const maxSteps = FORM_LIMITS.MAX_STEPS;
        const maxSections = FORM_LIMITS.MAX_SECTIONS_PER_STEP;
        const maxFields = FORM_LIMITS.MAX_FIELDS_PER_SECTION;

        const totalPossible = maxSteps * maxSections * maxFields;

        let currentFields = 0;
        formConfig.steps.forEach(step => {
            step.sections.forEach(section => {
                currentFields += section.fields.length;
            });
        });

        return {
            current: currentFields,
            total: totalPossible,
            percentage: totalPossible > 0 ? (currentFields / totalPossible) * 100 : 0
        };
    };

    const fieldStats = getFieldStats();

    // Helper to get all expandable node keys
    const getAllExpandableKeys = (nodes: TreeNode[]): string[] => {
        const keys: string[] = [];

        const traverse = (node: TreeNode) => {
            if (node.children && node.children.length > 0) {
                keys.push(node.key);
                node.children.forEach(traverse);
            }
        };

        nodes.forEach(traverse);
        return keys;
    };

    // Toggle expand/collapse all
    const handleToggleAll = () => {
        const allExpandableKeys = getAllExpandableKeys(treeStructure);
        const allExpanded = allExpandableKeys.every(key => expandedNodes.has(key));

        if (allExpanded) {
            // Collapse all
            setExpandedNodes(new Set());
        } else {
            // Expand all
            setExpandedNodes(new Set(allExpandableKeys));
        }
    };

    // Check if all nodes are expanded
    const areAllExpanded = () => {
        const allExpandableKeys = getAllExpandableKeys(treeStructure);
        return allExpandableKeys.length > 0 && allExpandableKeys.every(key => expandedNodes.has(key));
    };

    const getIcon = (type: ViewType) => {
        switch (type) {
            case 'form':
                return <FileText size={14} />;
            case 'step':
                return <Layers size={14} />;
            case 'section':
                return <SquareMenu size={14} />;
            case 'field':
                return <Type size={14} />;
            default:
                return null;
        }
    };

    const getTypeColor = (type: ViewType) => {
        switch (type) {
            case 'form':
                return 'text-blue-600 dark:text-blue-400';
            case 'step':
                return 'text-purple-600 dark:text-purple-400';
            case 'section':
                return 'text-green-600 dark:text-green-400';
            case 'field':
                return 'text-orange-600 dark:text-orange-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    const handleNodeClick = (node: TreeNode, path: string[] = []) => {
        switch (node.type) {
            case 'form':
                navigateToForm();
                break;
            case 'step':
                navigateToStep(node.key);
                break;
            case 'section':
                if (path.length >= 1) {
                    navigateToSection(path[0], node.key);
                }
                break;
            case 'field':
                if (path.length >= 2) {
                    navigateToField(path[0], path[1], node.key);
                }
                break;
        }
    };

    const isNodeActive = (node: TreeNode) => {
        if (node.type === 'form' && currentView === 'form' && currentPath.length === 0) {
            return true;
        }
        if (node.type === 'step' && currentView === 'step' && currentPath[0] === node.key) {
            return true;
        }
        if (node.type === 'section' && currentView === 'section' && currentPath[1] === node.key) {
            return true;
        }
        if (node.type === 'field' && currentView === 'field' && currentPath[2] === node.key) {
            return true;
        }
        return false;
    };

    const shouldAutoExpand = (node: TreeNode) => {
        if (node.type === 'form') return true;
        if (node.type === 'step' && currentPath[0] === node.key) return true;
        if (node.type === 'section' && currentPath[1] === node.key) return true;
        return false;
    };

    const renderTreeNode = (node: TreeNode, depth: number = 0, path: string[] = []) => {
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedNodes.has(node.key) || shouldAutoExpand(node);
        const isActive = isNodeActive(node);
        const nodeIcon = getIcon(node.type);
        const typeColor = getTypeColor(node.type);

        // Build path for this node
        const currentNodePath = node.type === 'form' ? [] : [...path, node.key];

        if (!hasChildren) {
            // Leaf node (no children)
            return (
                <div key={node.key} className="select-none">
                    <div
                        onClick={() => handleNodeClick(node, path)}
                        className={cn(
                            "flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-colors group",
                            "hover:bg-gray-100 dark:hover:bg-zinc-700",
                            isActive && "bg-gray-200 dark:bg-zinc-600"
                        )}
                        style={{ paddingLeft: `${depth * 16 + 8}px` }}
                    >
                        <div className="w-5 h-5" /> {/* Spacer for alignment */}

                        {/* Icon */}
                        <div className={cn("flex-shrink-0", typeColor)}>
                            {nodeIcon}
                        </div>

                        {/* Label */}
                        <span className={cn(
                            "text-sm truncate flex-1",
                            isActive
                                ? "font-medium text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                        )}>
                            {node.label}
                        </span>

                        {/* Active Indicator */}
                        {isActive && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        )}
                    </div>
                </div>
            );
        }

        // Node with children - use Collapsible
        return (
            <Collapsible.Root
                key={node.key}
                open={isExpanded}
                onOpenChange={(open) => {
                    setExpandedNodes(prev => {
                        const newSet = new Set(prev);
                        if (open) {
                            newSet.add(node.key);
                        } else {
                            newSet.delete(node.key);
                        }
                        return newSet;
                    });
                }}
            >
                <div className="select-none">
                    <div
                        className={cn(
                            "flex items-center gap-2 py-0.5 px-2 my-1 rounded-md cursor-pointer transition-colors group",
                            "hover:bg-gray-100 dark:hover:bg-zinc-700",
                            isActive && "bg-gray-200 dark:bg-zinc-600"
                        )}
                        style={{ paddingLeft: `${depth * 16 + 8}px` }}
                    >
                        {/* Expand/Collapse Button */}
                        <Collapsible.Trigger>
                            <button
                                className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
                            >
                                {isExpanded ? (
                                    <ChevronDown size={14} className="text-gray-500 dark:text-gray-400" />
                                ) : (
                                    <ChevronRight size={14} className="text-gray-500 dark:text-gray-400" />
                                )}
                            </button>
                        </Collapsible.Trigger>

                        {/* Node content - clickable for navigation */}
                        <div
                            onClick={() => handleNodeClick(node, path)}
                            className="flex items-center gap-2 flex-1 min-w-0"
                        >
                            {/* Icon */}
                            <div className={cn("flex-shrink-0", typeColor)}>
                                {nodeIcon}
                            </div>

                            {/* Label */}
                            <span className={cn(
                                "text-sm truncate flex-1",
                                isActive
                                    ? "font-medium text-gray-900 dark:text-white"
                                    : "text-gray-700 dark:text-gray-300"
                            )}>
                                {node.label}
                            </span>

                            {/* Active Indicator */}
                            {isActive && (
                                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                            )}
                        </div>
                    </div>

                    {/* Children */}
                    <Collapsible.Panel>
                        <div className="ml-2">
                            {node.children!.map((child) =>
                                renderTreeNode(child, depth + 1, currentNodePath)
                            )}
                        </div>
                    </Collapsible.Panel>
                </div>
            </Collapsible.Root>
        );
    };

    return (
        <div className={cn(
            "h-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden flex flex-col",
            className
        )}>
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-zinc-700 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Form Structure
                    </h3>

                    {/* Toggle All Button */}
                    {treeStructure.length > 0 && (
                        <button
                            onClick={handleToggleAll}
                            className={cn(
                                "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
                                "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                                "hover:bg-gray-100 dark:hover:bg-zinc-700"
                            )}
                            title={areAllExpanded() ? "Collapse All" : "Expand All"}
                        >
                            {areAllExpanded() ? (
                                <>
                                    <ChevronUp size={12} />
                                    Collapse All
                                </>
                            ) : (
                                <>
                                    <ChevronDown size={12} />
                                    Expand All
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Field Usage Meter */}
                <Meter.Root value={fieldStats.current} max={fieldStats.total} className="w-full">
                    <div className="flex items-center justify-between mb-1">
                        <Meter.Label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Fields Used
                        </Meter.Label>
                        <Meter.Value className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {() => `${fieldStats.current} / ${fieldStats.total}`}
                        </Meter.Value>
                    </div>
                    <Meter.Track className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <Meter.Indicator
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out rounded-full"
                        />
                    </Meter.Track>
                </Meter.Root>
            </div>

            {/* Tree Content */}
            <div className="flex-1 min-h-0">
                <ScrollArea.Root className="h-full">
                    <ScrollArea.Viewport className="h-full">
                        <div className="p-3">
                            {treeStructure.length > 0 ? (
                                treeStructure.map((node) => renderTreeNode(node))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <FileText size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No form structure yet</p>
                                    <p className="text-xs mt-1">Start by editing your form</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                        orientation="vertical"
                        className="flex select-none touch-none p-0.5 bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                    >
                        <ScrollArea.Thumb className="flex-1 bg-gray-400 dark:bg-zinc-500 rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </div>
    );
};

export default FBTreeView;