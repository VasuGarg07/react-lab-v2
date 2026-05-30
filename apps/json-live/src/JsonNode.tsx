import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { getMetadata } from './json.utilities';
import type { JsonValue } from './json.utilities';
import { useAppDispatch } from './store/useRedux';
import { navigateToPath } from './store/jsonViewerSlice';

interface JsonNodeProps {
    label: string;
    value: JsonValue;
    depth: number;
    path: string[];
}

const renderPrimitive = (val: JsonValue) => {
    if (val === null) return <span className="text-red-600 dark:text-red-400">null</span>;

    switch (typeof val) {
        case 'string':
            return <span className="text-emerald-600 dark:text-emerald-400">"{val}"</span>;
        case 'number':
            return <span className="text-cyan-600 dark:text-cyan-400">{val}</span>;
        case 'boolean':
            return <span className="text-amber-600 dark:text-amber-400">{String(val)}</span>;
        default:
            return null;
    }
};

export default function JsonNode({ label, value, depth, path }: JsonNodeProps) {
    const [isOpen, setIsOpen] = useState(depth < 2);
    const dispatch = useAppDispatch();

    const indent = depth * 0.5;
    const isExpandable = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);
    const isEmpty = isExpandable && Object.keys(value).length === 0;
    const metadata = getMetadata(value);
    const newPath = [...path, label];

    if (isExpandable) {
        return (
            <div className="font-mono text-sm">
                <div className="flex items-start group py-0.5 rounded-lg">
                    <button
                        onClick={() => !isEmpty && setIsOpen(!isOpen)}
                        className={`p-1 focus:outline-none text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0 rounded transition-all duration-200 ${isEmpty ? 'cursor-default opacity-50' : ''}`}
                        style={{ marginLeft: `${indent}rem` }}
                        disabled={isEmpty}
                        aria-label={isOpen ? 'Collapse' : 'Expand'}
                    >
                        {isEmpty ? <div className="w-3.5 h-3.5" /> : isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-1">
                            <span
                                className={`font-medium text-violet-600 dark:text-violet-400 transition-all duration-200 ${!isEmpty ? 'cursor-pointer hover:text-violet-800 dark:hover:text-violet-300' : ''}`}
                                onClick={() => !isEmpty && dispatch(navigateToPath(newPath))}
                            >
                                {label}:
                            </span>
                            <span className="text-neutral-500 dark:text-neutral-400">
                                {metadata} {isEmpty ? (isArray ? '[]' : '{}') : (isArray ? '[' : '{')}
                            </span>
                            {!isEmpty && (
                                <button
                                    onClick={() => dispatch(navigateToPath(newPath))}
                                    className="text-xs text-blue-600 dark:text-blue-400 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus:opacity-100 px-1.5 py-0.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                                >
                                    Navigate →
                                </button>
                            )}
                        </div>

                        {!isEmpty && isOpen && (
                            <div className="mt-0.5">
                                {Object.entries(value).map(([key, val], index) => (
                                    <JsonNode
                                        key={isArray ? `${key}-${index}` : key}
                                        label={isArray ? `${index}` : key}
                                        value={val}
                                        depth={depth + 1}
                                        path={newPath}
                                    />
                                ))}
                                <div style={{ marginLeft: `${indent + 0.5}rem` }}>
                                    <span className="text-neutral-500 dark:text-neutral-400">{isArray ? ']' : '}'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center py-0.5 font-mono text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg transition-all duration-200">
            <div style={{ marginLeft: `${indent + 0.75}rem` }} />
            <div className="flex items-center min-w-0 flex-1">
                <span className="font-medium text-violet-600 dark:text-violet-400 mr-2 shrink-0">{label}:</span>
                <div className="min-w-0 flex-1 break-all">{renderPrimitive(value)}</div>
            </div>
        </div>
    );
}
