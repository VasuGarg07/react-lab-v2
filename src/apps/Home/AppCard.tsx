import React from 'react';
import { useNavigate } from 'react-router';
import { AppInfo } from '@/shared/apps';
import { ArrowRight, Info } from 'lucide-react';
import { AspectRatio } from 'radix-ui';

export const AppCard: React.FC<AppInfo> = ({ name, tag, path, image, description, techStack, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="group relative overflow-hidden rounded-xl mb-4 border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:translate-y-0 cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <AspectRatio.Root ratio={5 / 3}>
          <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </AspectRatio.Root>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <Icon size={16} className="text-neutral-800 dark:text-neutral-200" />
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white">
              {name}
            </h3>
          </div>
          <div className="rounded-full p-1.5 bg-secondary-500 text-white">
            <ArrowRight size={14} />
          </div>
        </div>
        <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
          {tag}
        </span>
      </div>

      {/* Hover Overlay */}
      <div
        className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-xs flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Info className="mb-3 text-neutral-800 dark:text-neutral-100" />
        <p className="text-sm text-center mb-4 text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-300 dark:bg-cyan-600 text-neutral-800 dark:text-neutral-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};