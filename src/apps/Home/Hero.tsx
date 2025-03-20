import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <div className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 mb-4">
            <div className="flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="w-full md:w-5/12 p-6 flex items-center justify-center">
                    <motion.div
                        className="w-full max-w-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="/homepage.svg"
                            alt="React Lab Logo"
                            className="w-full h-auto object-contain"
                        />
                    </motion.div>
                </div>

                {/* Right side - Text */}
                <div className="w-full md:w-7/12 p-6 md:pl-2 flex items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary-600 dark:text-primary-400">
                            REACT LAB
                        </h1>
                        <p className="text-neutral-700 dark:text-neutral-300 text-base">
                            Welcome to React Lab! 🚀 This is where my React experiments hang out.
                            Dive into a mix of quirky, cool, and maybe even a bit wild projects that I've thrown together.
                            Whether you're here for inspiration or just to see what happens when you combine React
                            with a dash of creativity, you're in the right place.
                            So, let's dive in and see what kind of React magic we can brew up! 🎉✨
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;