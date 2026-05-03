import type { AlgoInfo } from './algorithms.data';

interface CodePreviewProps {
    info: AlgoInfo;
}

export default function CodePreview({ info }: CodePreviewProps) {
    return (
        <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-2 mb-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{info.name}</h3>
                    <div className="flex gap-1.5">
                        <span className="text-xs px-2 py-0.5 rounded font-mono bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                            T: {info.timeComplexity}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded font-mono bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                            S: {info.spaceComplexity}
                        </span>
                    </div>
                </div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{info.description}</p>
            </div>

            <pre className="text-xs font-mono bg-neutral-50 dark:bg-neutral-950 rounded-lg p-3 overflow-x-auto text-neutral-800 dark:text-neutral-200 leading-relaxed border border-neutral-200 dark:border-neutral-800">
                <code>{info.code}</code>
            </pre>
        </div>
    );
}