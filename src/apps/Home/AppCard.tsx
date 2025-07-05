import React from 'react';
import { useNavigate } from 'react-router';
import { AppInfo } from '@/shared/apps';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/shared/cn';

export const AppCard: React.FC<AppInfo> = ({ name, tag, path, image, description, techStack, icon: Icon }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(path);
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200",
        "hover:shadow-xl hover:-translate-y-1",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between min-h-[200px]">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Icon size={18} className="text-white" />
            <h3 className="text-lg font-bold text-white">
              {name}
            </h3>
          </div>
          <div className="rounded-full p-2 bg-white/20 backdrop-blur-sm text-white transition-all group-hover:bg-white/30 group-hover:scale-110">
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-3">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm text-white/90 mb-3 line-clamp-2">
              {description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {techStack.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-white/20 backdrop-blur-sm text-white"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-white/20 backdrop-blur-sm text-white">
                  +{techStack.length - 3}
                </span>
              )}
            </div>
          </div>

          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500 text-white shadow-xs">
            {tag}
          </span>
        </div>
      </div>
    </div>
  );
};