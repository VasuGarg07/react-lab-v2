import React from 'react';
import { Algorithms } from './algorithms';

interface AlgorithmInfoProps {
    algorithm: string;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {

    const info = Algorithms[algorithm as keyof typeof Algorithms];

    return (
        <div className='p-6 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 shadow-sm'>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{info.name}</h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{info.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
                <div className='p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'>
                    <h3 className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">Time Complexity</h3>
                    <p className="text-lg font-mono text-gray-900 dark:text-white">{info.timeComplexity}</p>
                </div>
                <div className='p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'>
                    <h3 className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">Space Complexity</h3>
                    <p className="text-lg font-mono text-gray-900 dark:text-white">{info.spaceComplexity}</p>
                </div>
            </div>

            <div className="p-4 rounded-lg bg-green-50 dark:bg-violet-900/20 border border-green-100 dark:border-violet-800">
                <h3 className="text-sm font-medium mb-2 text-green-800 dark:text-violet-300">Best Used When</h3>
                <p className="text-gray-800 dark:text-gray-200">
                    {info.caption}
                </p>
            </div>
        </div>
    );
};

export default AlgorithmInfo;