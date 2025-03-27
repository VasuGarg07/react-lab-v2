import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const AppBackground: React.FC<Props> = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <>
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-black z-0" />

                {/* Decorative blurred circles */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl z-0" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl z-0" />
                <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-pink-400/20 dark:bg-pink-600/15 rounded-full blur-3xl z-0" />
                <div className="absolute bottom-1/4 right-1/6 w-60 h-60 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-3xl z-0" />

                {/* Animated gradient overlay */}
                <motion.div
                    className="absolute inset-0 opacity-30 dark:opacity-40 z-0"
                    style={{
                        background: 'linear-gradient(120deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)',
                    }}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            </>

            {children}
        </div>
    )
}

export default AppBackground