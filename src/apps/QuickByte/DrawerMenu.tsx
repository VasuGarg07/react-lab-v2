import { ALPHABETS, TABS } from '@/apps/QuickByte/utils/recipe.helpers';
import { Accordion } from '@/ui/Accordion';
import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import { BookA, HandPlatter, Salad, Search, Sparkle, TreePalm, X, Loader2, AlertCircle } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { cn } from '@/shared/cn';
import { useCategories, useAreas, useRandomMeal } from './utils/useRecipeQueries';
import { toastService } from '@/shared/toastr';

const DrawerMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  const [isGettingRandom, setIsGettingRandom] = useState(false);

  // Use Tanstack Query for categories and areas (huge improvement here)
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError
  } = useCategories();

  const {
    data: areas = [],
    isLoading: areasLoading,
    error: areasError
  } = useAreas();

  const { getRandomMeal } = useRandomMeal();

  const handleRandomRoute = useCallback(async () => {
    setIsGettingRandom(true);
    try {
      const randomId = await getRandomMeal();
      navigate(`/recipe-haven/meal/${randomId}`);
      setOpen(false);
    } catch (error) {
      toastService.error('Failed to get random recipe. Please try again.');
    } finally {
      setIsGettingRandom(false);
    }
  }, [getRandomMeal, navigate]);

  const handleSearch = useCallback(() => {
    if (!term.trim()) {
      toastService.error('Please enter a search term');
      return;
    }

    navigate(`/recipe-haven/search/${term.trim()}`);
    setOpen(false);
  }, [term, navigate]);

  const handleRoute = useCallback((path: string, key: string) => {
    navigate(`/recipe-haven/${path}/${key.toLowerCase()}`);
    setOpen(false);
  }, [navigate]);

  const hasErrors = categoriesError || areasError;

  const accordionItems = [
    {
      value: 'categories',
      trigger: (
        <div className="flex items-center gap-2">
          <Salad size={16} />
          <span>Categories</span>
          {categoriesLoading && <Loader2 size={12} className="animate-spin" />}
          {categoriesError && <AlertCircle size={12} className="text-red-500" />}
        </div>
      ),
      content: categoriesError ? (
        <div className="text-red-500 text-sm mt-2">Failed to load categories</div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map(category => (
            <button
              key={category}
              className="px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-blue-300 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
              onClick={() => handleRoute(TABS[0].path, category)}
            >
              {category}
            </button>
          ))}
        </div>
      )
    },
    {
      value: 'regionals',
      trigger: (
        <div className="flex items-center gap-2">
          <TreePalm size={16} />
          <span>Regionals</span>
          {areasLoading && <Loader2 size={12} className="animate-spin" />}
          {areasError && <AlertCircle size={12} className="text-red-500" />}
        </div>
      ),
      content: areasError ? (
        <div className="text-red-500 text-sm mt-2">Failed to load regions</div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          {areas.map(area => (
            <button
              key={area}
              className="px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-red-300 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-slate-700 transition-colors"
              onClick={() => handleRoute(TABS[1].path, area)}
            >
              {area}
            </button>
          ))}
        </div>
      )
    },
    {
      value: 'dictionary',
      trigger: (
        <div className="flex items-center gap-2">
          <BookA size={16} />
          <span>Dictionary</span>
        </div>
      ),
      content: (
        <div className="grid grid-cols-4 gap-2 mt-2">
          {ALPHABETS.map(char => (
            <button
              key={char}
              className="px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-green-300 text-green-600 dark:text-green-400 rounded-md hover:bg-green-50 dark:hover:bg-slate-700 transition-colors"
              onClick={() => handleRoute(TABS[2].path, char)}
            >
              {char}
            </button>
          ))}
        </div>
      )
    }
  ];

  return (
    <>
      <button
        className={cn(
          "flex items-center gap-2 px-4 py-2 mb-4 rounded-md transition-colors",
          "bg-blue-600 hover:bg-blue-700 text-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        )}
        onClick={() => setOpen(true)}
      >
        <HandPlatter size={18} />
        Explore Recipes
      </button>

      <BaseDialog.Root open={open} onOpenChange={setOpen}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <BaseDialog.Popup
            className={cn(
              "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
              "w-full max-w-md max-h-[90vh] flex flex-col rounded-lg border",
              "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-lg",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
              "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
              "duration-200 mx-4 sm:mx-0"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
              <BaseDialog.Title className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Quick Byte
              </BaseDialog.Title>
              <BaseDialog.Close
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </BaseDialog.Close>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 min-h-0">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className={cn(
                      "flex-1 px-3 py-2 text-sm rounded-md border transition-colors",
                      "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
                      "border-slate-300 dark:border-slate-600",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    )}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      "bg-blue-600 hover:bg-blue-700 text-white",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    )}
                    onClick={handleSearch}
                  >
                    <Search size={16} />
                  </button>
                </div>

                {/* Error message for failed API calls */}
                {hasErrors && (
                  <div className="text-amber-600 dark:text-amber-400 text-sm p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                    Some data failed to load. Search and Dictionary still work!
                  </div>
                )}

                {/* Accordions */}
                <div className="space-y-2">
                  <Accordion
                    items={accordionItems}
                    type="single"
                    defaultValue="categories"
                    collapsible={true}
                  />
                </div>

                {/* Surprise Me Button */}
                <button
                  className={cn(
                    "flex items-center justify-center gap-2 w-full py-2.5 rounded-md transition-colors",
                    "bg-amber-500 hover:bg-amber-600 text-white",
                    "focus:outline-none focus:ring-2 focus:ring-amber-500/20",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  onClick={handleRandomRoute}
                  disabled={isGettingRandom}
                >
                  {isGettingRandom ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Getting recipe...
                    </>
                  ) : (
                    <>
                      <Sparkle size={16} />
                      Surprise Me!
                    </>
                  )}
                </button>
              </div>
            </div>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </>
  );
};

export default DrawerMenu;