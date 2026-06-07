import { Apps } from './apps';
import { AppCard } from './AppCard';
import Hero from './Hero';

const Homepage = () => {
    const visibleApps = Apps.filter(app => app.visible);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <Hero count={visibleApps.length} />

            <section className="pb-20">
                <div className="flex items-baseline justify-between gap-4 mb-6">
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                        Projects
                    </h2>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 tabular-nums">
                        {visibleApps.length} total
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 stagger">
                    {visibleApps.map((app) => (
                        <AppCard key={app.path} {...app} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
