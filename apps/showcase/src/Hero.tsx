import { ArrowDown } from 'lucide-react';

interface HeroProps {
    count: number;
}

const Hero = ({ count }: HeroProps) => {
    return (
        <section className="pt-12 sm:pt-20 pb-10 fade-up">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-5">
                <span className="w-6 h-px bg-neutral-400" />
                A lab of small web things
            </p>

            <h1 className="font-display text-5xl sm:text-7xl font-semibold tracking-tight text-ink leading-[0.95] text-balance">
                Vasu Garg Labs
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-neutral-600 leading-relaxed">
                {count} self-contained Web Projects — games, tools, and experiments.
                Each one is its own little product, designed and built end to end.
            </p>

            <div className="mt-8 flex items-center gap-2.5 text-sm font-semibold text-neutral-500">
                <ArrowDown className="w-4 h-4" />
                Pick something to explore
            </div>
        </section>
    );
};

export default Hero;
