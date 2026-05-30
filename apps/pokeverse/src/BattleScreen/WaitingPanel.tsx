export default function WaitingPanel({ playerName }: { playerName: string }) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-neutral-400 dark:border-neutral-500 border-t-blue-500 rounded-full animate-spin" />
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Waiting for opponent...</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{playerName} has acted</p>
        </div>
    );
}
