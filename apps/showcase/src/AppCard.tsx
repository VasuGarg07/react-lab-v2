import { ArrowRight } from 'lucide-react';
import type { AppInfo } from './apps';

export const AppCard = ({ name, tag, url, image, description, techStack, icon: Icon }: AppInfo) => {
    const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            onClick={handleClick}
            className="group relative overflow-hidden shadow-md rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none border border-neutral-200 dark:border-neutral-700"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
            }}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img src={image} alt={name} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm" />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/20 to-black/10 group-hover:from-black/60 group-hover:via-black/40 transition-all duration-300" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 p-4 sm:p-5 h-full flex flex-col justify-between min-h-50 sm:min-h-55">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                            <Icon size={16} className="text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-lg">{name}</h3>
                    </div>
                    <div className="rounded-full p-1.5 sm:p-2 bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all duration-300 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:scale-110 group-hover:rotate-[-5deg]">
                        <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </div>
                </div>

                {/* Footer */}
                <div className="space-y-2 sm:space-y-3">
                    <div className="space-y-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <p className="text-xs sm:text-sm text-white/95 line-clamp-2 drop-shadow-md">{description}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {techStack.slice(0, 3).map((tech, index) => (
                                <span key={index} className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md bg-white/20 border border-white/20 text-white">
                                    {tech}
                                </span>
                            ))}
                            {techStack.length > 3 && (
                                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md bg-white/20 border border-white/20 text-white">
                                    +{techStack.length - 3}
                                </span>
                            )}
                        </div>
                    </div>

                    <span className="inline-flex px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-full bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-md">
                        {tag}
                    </span>
                </div>
            </div>
        </div>
    );
};
