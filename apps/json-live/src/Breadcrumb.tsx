import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';
import { useJson } from './JsonContext';

export default function Breadcrumb() {
    const { state, dispatch } = useJson();
    const { currentPath } = state;

    return (
        <div className="flex items-center gap-1 px-3 py-2 border-b overflow-x-auto shrink-0" style={{ borderColor: '#eaeef2', backgroundColor: '#f6f8fa' }}>
            <button
                onClick={() => dispatch({ type: 'BREADCRUMB', payload: -1 })}
                className="p-1.5 rounded transition-colors shrink-0 focus:outline-none"
                style={{ color: '#57606a' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#eaeef2')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                aria-label="Go to root"
            >
                <Home size={15} />
            </button>

            {currentPath.map((segment, index) => (
                <Fragment key={index}>
                    <ChevronRight size={14} className="shrink-0" style={{ color: '#8c959f' }} />
                    <button
                        onClick={() => dispatch({ type: 'BREADCRUMB', payload: index })}
                        className="px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap shrink-0 transition-colors focus:outline-none"
                        style={{
                            color: index === currentPath.length - 1 ? '#0969da' : '#57606a',
                            backgroundColor: index === currentPath.length - 1 ? '#ddf4ff' : 'transparent',
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#ddf4ff')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = index === currentPath.length - 1 ? '#ddf4ff' : 'transparent')}
                    >
                        {segment}
                    </button>
                </Fragment>
            ))}
        </div>
    );
}
