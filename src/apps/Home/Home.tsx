import { AppCard } from "@/apps/Home/AppCard";
import Footer from "@/apps/Home/Footer";
import Hero from '@/apps/Home/Hero';
import { Apps } from "@/shared/apps";
import { motion } from 'framer-motion';
import { Separator } from 'radix-ui';
import React from 'react';

const Home = () => {
  const visibleApps = React.useMemo(() => Apps.filter(app => app.visible), []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
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

      {/* Main content */}
      <main className="container max-w-6xl mx-auto py-10 flex-grow flex flex-col items-center z-10 px-4 sm:px-6 lg:px-8 relative">
        <Hero />

        <div className="w-full mx-auto my-10">
          <div className="flex items-center justify-center mb-8">
            <Separator.Root className="bg-neutral-200 dark:bg-neutral-800 h-px w-12" />
            <h2 className="text-xl font-medium text-neutral-900 dark:text-white px-4">
              Explore My Projects
            </h2>
            <Separator.Root className="bg-neutral-200 dark:bg-neutral-800 h-px w-12" />
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 w-full">
            {visibleApps.map((app) => (
              <AppCard key={app.path} {...app} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
