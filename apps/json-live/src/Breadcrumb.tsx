import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';
import { useJson } from './JsonContext';

export default function Breadcrumb() {
    const { state, dispatch } = useJson();
    const { currentPath } = state;

    return (
        <div className="flex items-center gap-1 px-3 py-2 border-b border-cyan overflow-x-auto shrink-0 bg-cyan/30">
            <button
                onClick={() => dispatch({ type: 'BREADCRUMB', payload: -1 })}
                className="p-1.5 rounded transition-colors shrink-0 focus:outline-none text-charcoal/60 hover:bg-cyan hover:text-charcoal"
                aria-label="Go to root"
            >
                <Home size={15} />
            </button>

            {currentPath.map((segment, index) => (
                <Fragment key={index}>
                    <ChevronRight size={14} className="shrink-0 text-ash" />
                    <button
                        onClick={() => dispatch({ type: 'BREADCRUMB', payload: index })}
                        className={`px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap shrink-0 transition-colors focus:outline-none font-mono hover:bg-cyan hover:text-charcoal ${
                            index === currentPath.length - 1
                                ? 'bg-aqua text-charcoal'
                                : 'text-charcoal/70'
                        }`}
                    >
                        {segment}
                    </button>
                </Fragment>
            ))}
        </div>
    );
}
