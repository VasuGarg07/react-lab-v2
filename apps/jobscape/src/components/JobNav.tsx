import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import { Briefcase } from 'lucide-react';
import { ROUTES } from '../helpers/job.constants';

export interface NavItem {
    to: string;
    icon: ReactNode;
    label: string;
    end?: boolean;
}

interface JobNavProps {
    navItems: NavItem[];
    rightSlot?: ReactNode;
}

export default function JobNav({ navItems, rightSlot }: JobNavProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? 'border-b border-spruce/10 bg-canvas/85 backdrop-blur-xl'
                    : 'border-b border-transparent bg-canvas/60 backdrop-blur-sm'
            }`}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                <Link to={ROUTES.home} className="flex shrink-0 items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-spruce text-canvas shadow-sm">
                        <Briefcase className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <span className="font-display hidden text-lg font-bold tracking-tight text-ink sm:block">
                        Jobscape
                    </span>
                </Link>

                {navItems.length > 0 && (
                    <nav className="flex items-center gap-0.5 rounded-full border border-spruce/8 bg-white/60 p-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-semibold transition-all duration-150 sm:px-3.5 ${
                                        isActive
                                            ? 'bg-spruce text-canvas shadow-sm'
                                            : 'text-neutral-500 hover:bg-white hover:text-spruce'
                                    }`
                                }
                            >
                                <span className="grid h-4 w-4 shrink-0 place-items-center">{item.icon}</span>
                                <span className="hidden md:block">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                )}

                {rightSlot && <div className="flex shrink-0 items-center">{rightSlot}</div>}
            </div>
        </header>
    );
}
