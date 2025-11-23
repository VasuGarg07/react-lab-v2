export default function BattleLog({ logs, turn }: { logs: string[]; turn: number }) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-700 dark:border-neutral-600 shadow-lg">
            <div className="bg-neutral-900 dark:bg-neutral-700 px-4 py-2 rounded-t-lg">
                <p className="text-sm font-bold text-white">
                    Battle Log • Turn {turn}
                </p>
            </div>
            <div className="p-4 space-y-1.5 max-h-48 overflow-y-auto">
                {logs.slice(-8).map((log, index) => (
                    <p
                        key={index}
                        className="text-sm text-neutral-900 dark:text-neutral-100 leading-relaxed"
                    >
                        {log}
                    </p>
                ))}
            </div>
        </div>
    );
}