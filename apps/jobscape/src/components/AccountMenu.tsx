import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut, Settings, UserRound } from 'lucide-react';
import { logoutThunk, useAuthDispatch, useAuthSelector } from '@react-lab/auth';
import { useJobscape } from '../hooks/useJobscape';
import { ROUTES } from '../helpers/job.constants';
import { initials } from '../helpers/job.utils';
import type { Applicant, Employer } from '../helpers/job.types';

export default function AccountMenu() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const dispatch = useAuthDispatch();
    const qc = useQueryClient();
    const { user } = useAuthSelector((state) => state.auth);
    const { role, profile } = useJobscape();

    const displayName =
        role === 'employer'
            ? (profile as Employer | null)?.companyName
            : (profile as Applicant | null)?.fullName;
    const name = displayName || user?.username || 'Account';

    useEffect(() => {
        if (!open) return;
        const onClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, [open]);

    const go = (path: string) => {
        navigate(path);
        setOpen(false);
    };

    const signOut = () => {
        dispatch(logoutThunk() as never);
        qc.clear();
        navigate('/auth/login', { replace: true });
        setOpen(false);
    };

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="grid h-9 w-9 place-items-center rounded-full bg-spruce text-sm font-bold text-canvas transition-opacity hover:opacity-90"
                aria-label="Account menu"
            >
                {initials(name)}
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lift scale-in">
                    <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-spruce text-sm font-bold text-canvas">
                            {initials(name)}
                        </span>
                        <div className="min-w-0">
                            <p className="truncate font-display text-sm font-bold text-ink">{name}</p>
                            {user?.email && (
                                <p className="truncate text-xs text-neutral-400">{user.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="p-1.5">
                        <button
                            type="button"
                            onClick={() => go(ROUTES.profile)}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-sand"
                        >
                            <UserRound size={15} className="shrink-0 text-neutral-400" /> Profile
                        </button>
                        <button
                            type="button"
                            onClick={() => go(ROUTES.settings)}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-sand"
                        >
                            <Settings size={15} className="shrink-0 text-neutral-400" /> Settings
                        </button>

                        <div className="my-1 border-t border-neutral-100" />

                        <button
                            type="button"
                            onClick={signOut}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
                        >
                            <LogOut size={15} className="shrink-0" /> Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
