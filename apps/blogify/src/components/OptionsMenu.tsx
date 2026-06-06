import { MoreHorizontal } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface MenuAction {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    variant?: 'default' | 'danger';
    disabled?: boolean;
}

export default function OptionsMenu({ actions, className = '' }: { actions: MenuAction[]; className?: string }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [open]);

    const defaultActions = actions.filter(a => a.variant !== 'danger');
    const dangerActions = actions.filter(a => a.variant === 'danger');

    return (
        <div className={`relative ${className}`} ref={menuRef}>
            <button
                onClick={e => { e.preventDefault(); e.stopPropagation(); setOpen(p => !p); }}
                className={`p-1.5 rounded-lg transition-colors ${
                    open
                        ? 'bg-stone-200 text-stone-700 '
                        : 'text-stone-400 hover:bg-stone-100 hover:text-stone-600 '
                }`}
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Options"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>

            {open && (
                <div className="absolute right-0 mt-1.5 min-w-44 bg-white rounded-xl shadow-lg shadow-stone-900/10 border border-stone-100 py-1.5 z-50">
                    {defaultActions.map((action, i) => (
                        <button
                            key={i}
                            onClick={e => { e.preventDefault(); e.stopPropagation(); action.onClick(); setOpen(false); }}
                            disabled={action.disabled}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="w-4 h-4 shrink-0">{action.icon}</span>
                            {action.label}
                        </button>
                    ))}

                    {dangerActions.length > 0 && (
                        <>
                            {defaultActions.length > 0 && (
                                <div className="my-1 border-t border-stone-100" />
                            )}
                            {dangerActions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={e => { e.preventDefault(); e.stopPropagation(); action.onClick(); setOpen(false); }}
                                    disabled={action.disabled}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className="w-4 h-4 shrink-0">{action.icon}</span>
                                    {action.label}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
