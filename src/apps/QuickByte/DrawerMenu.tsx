import { areaList, categoryList, random as surpriseMeal } from '@/apps/QuickByte/utils/recipe.api';
import { ALPHABETS, TABS } from '@/apps/QuickByte/utils/recipe.helpers';
import { Accordion } from '@/ui/Accordion'; // Import our Accordion component
import Dialog from '@/ui/Dialog'; // Import the Dialog component
import { BookA, HandPlatter, Salad, Search, Sparkle, TreePalm } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const DrawerMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');

  const [areas, setAreas] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleRandomRoute = () => {
    surpriseMeal().then(id => {
      navigate(`/recipe-haven/meal/${id}`);
      closeDrawer();
    });
  };

  const handleSearch = () => {
    if (term) {
      navigate(`/recipe-haven/search/${term}`);
      closeDrawer();
    }
  };

  const handleRoute = (path: string, key: string) => {
    navigate(`/recipe-haven/${path}/${key.toLowerCase()}`);
    closeDrawer();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategories(await categoryList());
        setAreas(await areaList());
      } catch (_) { }
    };

    fetchData();
  }, []);

  // Create accordion items
  const accordionItems = [
    {
      value: 'categories',
      trigger: (
        <div className="flex items-center gap-2">
          <Salad size={16} />
          <span>Categories</span>
        </div>
      ),
      content: (
        <div className="flex flex-wrap gap-2 mt-1">
          {categories.map(category => (
            <button
              key={category}
              className="px-3 py-1 text-xs bg-white dark:bg-neutral-800 border border-blue-500 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-neutral-700 transition-colors"
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
        </div>
      ),
      content: (
        <div className="flex flex-wrap gap-2 mt-1">
          {areas.map(area => (
            <button
              key={area}
              className="px-3 py-1 text-xs bg-white dark:bg-neutral-800 border border-red-500 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-neutral-700 transition-colors"
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
        <div className="grid grid-cols-4 gap-2 mt-1">
          {ALPHABETS.map(char => (
            <button
              key={char}
              className="px-3 py-1 text-xs bg-white dark:bg-neutral-800 border border-green-500 text-green-600 dark:text-green-400 rounded-md hover:bg-green-50 dark:hover:bg-neutral-700 transition-colors"
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
        className="flex items-center gap-2 px-4 py-2 mb-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        onClick={openDrawer}
      >
        <HandPlatter size={18} />
        Explore Recipes
      </button>

      <Dialog
        isOpen={open}
        onClose={closeDrawer}
        position="center"
        size="md"
        title="Quick Byte"
        contentClassName="overflow-auto max-w-[400px] max-h-[96vh]"
      >
        <div className="flex flex-col p-4 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="flex-grow px-3 py-2 text-sm text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleSearch}
            >
              <Search size={18} />
            </button>
          </div>

          {/* Accordions */}
          <div className="flex-1 overflow-auto">
            <Accordion
              items={accordionItems}
              type="single"
              defaultValue="categories"
              collapsible={true}
            />
          </div>

          {/* Surprise Me Button */}
          <button
            className="flex items-center justify-center gap-2 w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
            onClick={handleRandomRoute}
          >
            <Sparkle size={18} />
            Surprise Me!
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default DrawerMenu;