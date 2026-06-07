import { ArrowUpRight } from 'lucide-react';
import type { AppInfo } from './apps';

export const AppCard = ({ name, tag, url, image, description, techStack, icon: Icon }: AppInfo) => {
    const handleClick = () => window.open(url, '_blank', 'noopener,noreferrer');

    return (
        <div
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
            }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer border border-neutral-200 bg-neutral-900 min-h-60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
            {/* Cover */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/45 to-ink/10 transition-colors duration-300 group-hover:from-ink/95 group-hover:via-ink/55" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <span className="grid place-items-center w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white">
                            <Icon size={16} strokeWidth={2} />
                        </span>
                        <h3 className="font-display text-lg font-semibold text-white drop-shadow-sm">
                            {name}
                        </h3>
                    </div>
                    <span className="grid place-items-center w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all duration-300 group-hover:bg-white group-hover:text-ink group-hover:rotate-12">
                        <ArrowUpRight size={16} strokeWidth={2.25} />
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {/* Hover reveal sits ABOVE the chip and collapses to zero height at rest,
                        so the chip stays pinned to the card's bottom edge. */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <div className="overflow-hidden">
                            <div className="space-y-2.5 pb-0.5">
                                <p className="text-sm text-white/90 leading-relaxed drop-shadow-sm line-clamp-2">
                                    {description}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {techStack.slice(0, 3).map((tech) => (
                                        <span key={tech} className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-white/15 border border-white/15 text-white/90">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="inline-flex w-fit items-center px-2.5 py-1 text-[11px] font-bold rounded-full bg-white/90 text-ink backdrop-blur-sm">
                        {tag}
                    </span>
                </div>
            </div>
        </div>
    );
};
