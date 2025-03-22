import { Apps } from '@/shared/apps';
import { navigate } from '@/shared/Router';
import { Menu, Home, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Dialog from '@/ui/Dialog';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleRouting = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md text-neutral-700 hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/10 transition-colors"
        aria-label="Menu"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar Dialog */}
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        size="lg"
        title="React Lab"
        contentClassName="w-72 h-full"
      >
        <div className="flex flex-col h-full border-t border-neutral-200 dark:border-neutral-800">
          {/* Navigation List */}
          <nav className="flex-1 overflow-y-auto py-2 scrollbar-hide min-h-0">
            <ul className="px-2 space-y-1">
              <li>
                <button
                  onClick={() => handleRouting('/')}
                  className="w-full px-3 py-2 flex items-center justify-between rounded-md group transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Home size={16} className="text-neutral-700 dark:text-white" />
                    <span className="font-medium text-sm text-neutral-800 dark:text-white">Dashboard</span>
                  </div>
                  <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
                </button>
              </li>

              {Apps.filter(app => app.visible).map((app, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleRouting(app.path)}
                    className="w-full px-3 py-2 flex items-center justify-between rounded-md group transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <app.icon size={16} className="text-neutral-700 dark:text-white" />
                      <span className="font-medium text-sm text-neutral-800 dark:text-white">{app.name}</span>
                    </div>
                    <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-4 py-3 mt-auto border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
              © {currentYear} React Lab
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SideNav;