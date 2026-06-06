import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { getMetadata } from './json.utilities';
import type { JsonValue } from './json.utilities';
import { useJson } from './JsonContext';

interface JsonNodeProps {
    label: string;
    value: JsonValue;
    depth: number;
    path: string[];
}

const renderPrimitive = (val: JsonValue) => {
    if (val === null) return <span className="text-ash italic">null</span>;
    switch (typeof val) {
        case 'string':  return <span className="text-charcoal">"{val}"</span>;
        case 'number':  return <span style={{ color: '#2a7a68' }}>{val}</span>;
        case 'boolean': return <span className="text-charcoal italic">{String(val)}</span>;
        default:        return null;
    }
};

export default function JsonNode({ label, value, depth, path }: JsonNodeProps) {
    const [isOpen, setIsOpen] = useState(depth < 2);
    const { dispatch } = useJson();

    const indent = depth * 0.75;
    const isExpandable = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);
    const isEmpty = isExpandable && Object.keys(value).length === 0;
    const metadata = getMetadata(value);
    const newPath = [...path, label];

    if (isExpandable) {
        return (
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>
                <div className="flex items-start group py-0.5 rounded">
                    <button
                        onClick={() => !isEmpty && setIsOpen(!isOpen)}
                        className="shrink-0 p-0.5 focus:outline-none rounded transition-colors text-ash"
                        style={{ marginLeft: `${indent}rem` }}
                        disabled={isEmpty}
                    >
                        {isEmpty ? <div className="w-3.5 h-3.5" /> : isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                    </button>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-1">
                            <span
                                className={`font-semibold text-aqua ${!isEmpty ? 'cursor-pointer' : ''}`}
                                style={{ color: '#94D1BE' }}
                                onClick={() => !isEmpty && dispatch({ type: 'NAVIGATE_TO', payload: newPath })}
                            >
                                {label}:
                            </span>
                            <span className="text-ash">
                                {metadata} {isEmpty ? (isArray ? '[]' : '{}') : (isArray ? '[' : '{')}
                            </span>
                            {!isEmpty && (
                                <button
                                    onClick={() => dispatch({ type: 'NAVIGATE_TO', payload: newPath })}
                                    className="text-xs opacity-0 group-hover:opacity-100 px-1.5 py-0.5 rounded transition-all focus:opacity-100 text-charcoal bg-transparent hover:bg-cyan"
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
                                <div style={{ marginLeft: `${indent + 0.75}rem` }}>
                                    <span className="text-ash">{isArray ? ']' : '}'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="flex items-center py-0.5 rounded transition-colors group hover:bg-cyan/20"
            style={{ fontSize: '13px' }}
        >
            <div style={{ marginLeft: `${indent + 1.25}rem` }} />
            <div className="flex items-center min-w-0 flex-1">
                <span className="mr-2 shrink-0 font-semibold text-aqua" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#94D1BE' }}>{label}:</span>
                <div className="min-w-0 flex-1 break-all" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{renderPrimitive(value)}</div>
            </div>
        </div>
    );
}
