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
    if (val === null) return <span style={{ color: '#cf222e' }}>null</span>;
    switch (typeof val) {
        case 'string':  return <span style={{ color: '#0a3069' }}>"{val}"</span>;
        case 'number':  return <span style={{ color: '#0550ae' }}>{val}</span>;
        case 'boolean': return <span style={{ color: '#953800' }}>{String(val)}</span>;
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
                        className="shrink-0 p-0.5 focus:outline-none rounded transition-colors"
                        style={{ marginLeft: `${indent}rem`, color: '#8c959f' }}
                        disabled={isEmpty}
                    >
                        {isEmpty ? <div className="w-3.5 h-3.5" /> : isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                    </button>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-1">
                            <span
                                className={!isEmpty ? 'cursor-pointer' : ''}
                                style={{ color: '#8250df', fontWeight: 500 }}
                                onClick={() => !isEmpty && dispatch({ type: 'NAVIGATE_TO', payload: newPath })}
                            >
                                {label}:
                            </span>
                            <span style={{ color: '#57606a' }}>
                                {metadata} {isEmpty ? (isArray ? '[]' : '{}') : (isArray ? '[' : '{')}
                            </span>
                            {!isEmpty && (
                                <button
                                    onClick={() => dispatch({ type: 'NAVIGATE_TO', payload: newPath })}
                                    className="text-xs opacity-0 group-hover:opacity-100 px-1.5 py-0.5 rounded transition-all focus:opacity-100"
                                    style={{ color: '#0969da', backgroundColor: 'transparent' }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#ddf4ff')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
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
                                    <span style={{ color: '#57606a' }}>{isArray ? ']' : '}'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center py-0.5 rounded transition-colors group"
            style={{ fontSize: '13px' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f6f8fa')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
            <div style={{ marginLeft: `${indent + 1.25}rem` }} />
            <div className="flex items-center min-w-0 flex-1">
                <span className="mr-2 shrink-0" style={{ color: '#8250df', fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{label}:</span>
                <div className="min-w-0 flex-1 break-all" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{renderPrimitive(value)}</div>
            </div>
        </div>
    );
}
