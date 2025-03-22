import React from 'react';

const AboutVisualizer: React.FC = () => {
    return (
        <div className="p-6 pt-2">
            <div className="bg-sky-50 dark:bg-violet-900/20 border border-sky-100 dark:border-violet-800 rounded-lg p-4 mb-4">
                <h2 className="text-sky-800 dark:text-violet-300 font-medium mb-2">About This Tool</h2>
                <p className="text-neutral-800 dark:text-neutral-200">
                    This application visualizes various sorting algorithms to help you understand how they work.
                </p>
            </div>

            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                You can adjust the array size and animation speed, and select different algorithms to see how they compare.
            </p>

            <h3 className="font-bold mb-3 text-neutral-900 dark:text-white">Available Algorithms:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                <div className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded text-neutral-800 dark:text-neutral-200 text-center">Bubble Sort</div>
                <div className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded text-neutral-800 dark:text-neutral-200 text-center">Selection Sort</div>
                <div className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded text-neutral-800 dark:text-neutral-200 text-center">Insertion Sort</div>
                <div className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded text-neutral-800 dark:text-neutral-200 text-center">Merge Sort</div>
                <div className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded text-neutral-800 dark:text-neutral-200 text-center">Quick Sort</div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Built with React, Tailwind CSS, Radix UI, and Framer Motion
                </p>
            </div>
        </div>
    );
};

export default AboutVisualizer;