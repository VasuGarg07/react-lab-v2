import React, { useState } from 'react';
import { Book, Search, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router';
import DrawerMenu from '@/apps/QuickByte/DrawerMenu';
import AppBackground from '@/components/AppBackground';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div
    className="h-full rounded-xl border border-gray-300/30 dark:border-white/20 bg-white/80 dark:bg-white/15 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="p-4">
      <div className="flex flex-col items-center text-center space-y-2">
        {icon}
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-200">{description}</p>
      </div>
    </div>
  </div>
);

const RecipeHaven: React.FC = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (term) {
      navigate(`/recipe-haven/search/${term}`);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-54px)] flex flex-col items-center overflow-hidden px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <AppBackground />

      <div className="relative z-10 w-full flex flex-col items-center space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-white drop-shadow-md">
          Recipe Haven
        </h1>

        <h2 className="text-lg sm:text-xl md:text-2xl text-center text-gray-700 dark:text-gray-200 drop-shadow">
          Easy Eats, Big Treats!
        </h2>

        <div className="w-full max-w-md flex flex-row space-x-1 p-1 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search recipes..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="flex-grow px-3 py-2 bg-transparent outline-none text-gray-800 dark:text-gray-200"
          />
          <button
            onClick={handleSearch}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Search size={20} />
          </button>
        </div>

        <DrawerMenu />

        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
          <div className="w-full sm:w-1/2 max-w-sm">
            <FeatureCard
              icon={<Utensils size={32} className="text-red-600 dark:text-red-500" />}
              title="Easy Recipes"
              description="Find simple, delicious recipes for every skill level"
            />
          </div>
          <div className="w-full sm:w-1/2 max-w-sm">
            <FeatureCard
              icon={<Book size={32} className="text-red-600 dark:text-red-500" />}
              title="Diverse Cuisine"
              description="Explore dishes from around the world"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHaven;