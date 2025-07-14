import { Apps } from '@/shared/apps';
import { navigate } from '@/shared/Router';
import { Menu, Home, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import { cn } from '@/shared/cn';

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
        className={cn(
          "p-2 rounded-md",
          "text-slate-700 dark:text-slate-300",
          "hover:bg-slate-100 dark:hover:bg-slate-800",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        )}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar Drawer */}
      <BaseDialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <BaseDialog.Popup
            className={cn(
              "fixed left-0 top-0 z-50 h-full w-80 flex flex-col",
              "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
              "duration-300"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700">
              <BaseDialog.Title className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                React Lab
              </BaseDialog.Title>
              <BaseDialog.Close
                className={cn(
                  "p-1.5 rounded-md",
                  "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                  "hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
                aria-label="Close menu"
              >
                <X size={16} />
              </BaseDialog.Close>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 min-h-0">
              <ul className="space-y-1">
                {/* Dashboard */}
                <li>
                  <button
                    onClick={() => handleRouting('/')}
                    className={cn(
                      "w-full flex items-center gap-2 p-2 rounded-md text-sm font-medium",
                      "text-slate-700 dark:text-slate-300",
                      "hover:bg-slate-100 dark:hover:bg-slate-800",
                      "focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800"
                    )}
                  >
                    <Home size={16} className="text-slate-500 dark:text-slate-400" />
                    <span className="flex-1 text-left">Dashboard</span>
                    <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
                  </button>
                </li>

                {/* Apps */}
                {Apps.filter(app => app.visible).map((app, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleRouting(app.path)}
                      className={cn(
                        "w-full flex items-center gap-2 p-2 rounded-md text-sm font-medium",
                        "text-slate-700 dark:text-slate-300",
                        "hover:bg-slate-100 dark:hover:bg-slate-800",
                        "focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800"
                      )}
                    >
                      <app.icon size={16} className="text-slate-500 dark:text-slate-400" />
                      <span className="flex-1 text-left">{app.name}</span>
                      <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-700 mt-auto">
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                © {currentYear} React Lab
              </p>
            </div>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </>
  );
};

export default SideNav;