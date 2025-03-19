import { Apps } from '@/shared/apps';
import { navigate } from '@/shared/Router';
import { Menu, X, Home, ChevronRight } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  const handleRouting = (path: string) => {
    navigate(path);
    closeSidebar();
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={openSidebar}
        className="p-2 rounded-lg text-neutral-700 hover:bg-primary-50 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Dialog */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-hidden" onClose={closeSidebar}>

          {/* Sidebar Panel */}
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed inset-y-0 left-0 flex max-w-xs p-2">
              <Dialog.Panel className="w-64 bg-white dark:bg-neutral-900 shadow-lg flex flex-col h-full rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                {/* Header */}
                <div className="p-3 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700">
                  <Dialog.Title className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                    React Lab
                  </Dialog.Title>
                  <button
                    onClick={closeSidebar}
                    className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Navigation List */}
                <nav className="flex-1 overflow-y-auto py-1">
                  <ul className="px-2 space-y-0.5">
                    <li>
                      <button
                        onClick={() => handleRouting('/')}
                        className="w-full px-2.5 py-2 flex items-center justify-between rounded-lg group transition-colors hover:bg-primary-50 dark:hover:bg-neutral-800"
                      >
                        <div className="flex items-center gap-2.5">
                          <Home size={18} className="text-neutral-800 dark:text-neutral-100" />
                          <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">Dashboard</span>
                        </div>
                        <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
                      </button>
                    </li>

                    {Apps.filter(app => app.visible).map((app, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleRouting(app.path)}
                          className="w-full px-2.5 py-2 flex items-center justify-between rounded-lg group transition-colors hover:bg-primary-50 dark:hover:bg-neutral-800"
                        >
                          <div className="flex items-center gap-2.5">
                            <app.icon size={18} className="text-neutral-800 dark:text-neutral-100" />
                            <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">{app.name}</span>
                          </div>
                          <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
                    © {currentYear} React Lab
                  </p>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default SideNav;