import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { Home, LayoutList, PieChart, Wallet } from 'lucide-react';
import { UserMenu } from '@react-lab/auth';

const navItems = [
    { to: '/home', icon: Home, label: 'Dashboard' },
    { to: '/overview', icon: LayoutList, label: 'Transactions' },
    { to: '/statistics', icon: PieChart, label: 'Statistics' },
];

export default function BudgetHeader() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className="sticky top-0 z-30 px-3 pt-3 sm:px-4 sm:pt-4">
            <div className="max-w-3xl mx-auto">
                <div
                    className={`flex items-center justify-between gap-3 rounded-2xl bg-white px-2.5 py-2 transition-all duration-300 ${
                        scrolled ? 'border border-pitch-100 shadow-sm' : 'border border-transparent'
                    }`}
                >
                    {/* Brand */}
                    <div className="flex items-center gap-2.5 min-w-fit pl-1">
                        <div className="w-9 h-9 rounded-xl bg-pitch flex items-center justify-center">
                            <Wallet className="w-4.5 h-4.5 text-lavender" strokeWidth={2.25} />
                        </div>
                        <span className="hidden sm:block text-sm font-extrabold tracking-tight text-pitch">BudgetBuddy</span>
                    </div>

                    {/* Nav */}
                    <nav className="flex items-center gap-0.5 rounded-full bg-pitch-50/70 p-1">
                        {navItems.map(({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight whitespace-nowrap transition-all duration-200 ${
                                        isActive
                                            ? 'bg-pitch text-lavender shadow-sm'
                                            : 'text-pitch-400 hover:text-pitch hover:bg-white/70'
                                    }`
                                }
                            >
                                <Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
                                <span className="hidden md:inline">{label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* User */}
                    <div className="flex items-center min-w-fit pr-0.5">
                        <UserMenu accentColor="#0F1108" accentFg="#F7F0F5" />
                    </div>
                </div>
            </div>
        </header>
    );
}
