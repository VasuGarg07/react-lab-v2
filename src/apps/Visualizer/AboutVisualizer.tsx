import { BarChart3 } from 'lucide-react';

const AboutVisualizer = () => {
    return (
        <div className="p-4 pt-2 max-h-[70vh] overflow-y-auto">
            {/* Introduction */}
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border border-sky-100 dark:border-violet-800 rounded-lg p-2 mb-4">
                <h2 className="text-sky-800 dark:text-violet-300 font-medium mb-2 flex items-center gap-2 text-sm">
                    <BarChart3 size={20} />
                    About This Tool
                </h2>
                <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed text-xs">
                    An interactive sorting algorithm visualizer that helps you understand how different sorting techniques work.
                    Watch algorithms step-by-step with real-time statistics and performance analysis.
                </p>
            </div>

            {/* Legend */}
            <div className="mb-3">
                <h3 className="font-bold mb-3 text-neutral-900 dark:text-white">Color Legend:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded border"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Unsorted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-amber-500 rounded border"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Comparing</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded border"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Swapping</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded border"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Pivot</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-cyan-500 rounded border"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Current</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded border"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Sorted</span>
                    </div>
                </div>
            </div>

            {/* Usage Tips */}
            <div className="mb-3">
                <h3 className="font-bold mb-3 text-neutral-900 dark:text-white">Usage Tips:</h3>
                <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        Start with smaller arrays (10-30 elements) to better observe algorithm behavior
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        Try different algorithms on the same array to compare their approaches
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">•</span>
                        Adjust animation speed based on complexity - slower for learning, faster for overview
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        Watch the statistics panel to understand performance differences
                    </li>
                </ul>
            </div>

            {/* Difficulty Guide */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 border border-neutral-200 dark:border-neutral-600">
                <h4 className="font-medium mb-2 text-neutral-900 dark:text-white text-sm">Difficulty Guide:</h4>
                <div className="space-y-1 text-xs">
                    <div><span className="font-mono">🔴</span> <strong>Beginner:</strong> Simple logic, easy to understand, O(n²) complexity</div>
                    <div><span className="font-mono">🟡</span> <strong>Intermediate:</strong> More complex but still intuitive, mixed complexity</div>
                    <div><span className="font-mono">🟢</span> <strong>Advanced:</strong> Sophisticated algorithms, O(n log n) complexity</div>
                </div>
            </div>
        </div>
    );
};

export default AboutVisualizer;