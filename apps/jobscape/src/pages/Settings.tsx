import { openAlertDialog, useModal } from '@react-lab/ui';
import { useJobscape } from '../hooks/useJobscape';
import { useDeleteAccount } from '../hooks/useJobscapeMutations';

export default function Settings() {
    const { profileId, role } = useJobscape();
    const modal = useModal();
    const del = useDeleteAccount();

    const confirmDelete = () => {
        if (!profileId) return;
        openAlertDialog(modal, {
            title: 'Delete your profile?',
            message:
                'This permanently removes your Jobscape profile and everything tied to it — jobs, applications, and saved roles. Your sign-in account stays. This cannot be undone.',
            confirmText: 'Delete profile',
            onConfirm: () => del.mutateAsync(profileId),
        });
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 fade-up">
            <header className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">Account</p>
                <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink">Settings</h1>
                <p className="mt-2 text-neutral-500">
                    You're set up as {role === 'employer' ? 'an employer' : 'a candidate'}.
                </p>
            </header>

            <section className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
                <h2 className="font-display text-base font-bold text-red-700">Danger zone</h2>
                <p className="mt-1 text-sm text-neutral-500">
                    Deleting your profile clears all of your Jobscape data. There's no undo.
                </p>
                <button
                    onClick={confirmDelete}
                    className="mt-4 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
                >
                    Delete profile
                </button>
            </section>
        </div>
    );
}
