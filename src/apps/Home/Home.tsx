import { AppCard } from "@/apps/Home/AppCard";
import Footer from "@/apps/Home/Footer";
import Hero from '@/apps/Home/Hero';
import AppBackground from "@/components/AppBackground";
import { Apps } from "@/shared/apps";
import { Separator } from 'radix-ui';
import React from 'react';

const Home = () => {
  const visibleApps = React.useMemo(() => Apps.filter(app => app.visible), []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      <AppBackground />

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

          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
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
