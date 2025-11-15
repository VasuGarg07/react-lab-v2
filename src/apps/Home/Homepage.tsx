import { Apps } from "../../shared/apps";
import { AppCard } from "./Appcard";
import Hero from "./Hero";

const Homepage = () => {
    const visibleApps = Apps.filter(app => app.visible);

    return (
        <main className="max-w-6xl mx-auto py-6 sm:py-8 grow flex flex-col px-4 sm:px-6">
            <Hero />

            <div className="w-full my-8 sm:my-10">
                {/* Section Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex-1 h-px bg-l;inear-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />
                    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                        Explore My Projects
                    </h2>
                    <div className="flex-1 h-px bg-l;inear-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                    {visibleApps.map((app) => (
                        <AppCard key={app.path} {...app} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Homepage;