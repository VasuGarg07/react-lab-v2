import { BookOpenText } from 'lucide-react';
import { useLoaderData, useNavigate } from 'react-router';
import { Meal } from '@/apps/QuickByte/utils/recipe.helpers';
import { motion } from 'framer-motion';

interface GalleryData {
  title: string;
  meals: Meal[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const Gallery = () => {
  const { title, meals } = useLoaderData() as GalleryData;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4 tracking-wide text-neutral-800 dark:text-neutral-100">
          {title}
        </h2>
      </motion.div>

      <motion.div variants={containerVariants} className="flex flex-wrap -mx-2">
        {meals.map((meal) => (
          <motion.div key={meal.id} variants={itemVariants} className="w-1/2 sm:w-1/3 px-2 mb-4">
            <MealCard meal={meal} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

const MealCard = ({ meal }: { meal: Meal }) => {
  const navigate = useNavigate();

  const handleMealNav = (id: string) => {
    navigate(`/recipe-haven/meal/${id}`)
  }

  return (
    <div
      className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer transform transition-transform duration-200 hover:-translate-y-1"
      onClick={() => handleMealNav(meal.id)}
    >
      <div className="overflow-hidden">
        <div className="relative pt-[75%]">
          <img
            src={meal.image}
            alt={meal.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="p-3">
        <div className="mt-1 flex items-center gap-1">
          <h3 className="text-lg truncate flex-grow font-['Overlock'] tracking-wide uppercase text-neutral-800 dark:text-neutral-100">
            {meal.name}
          </h3>
          <button className="p-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-xl">
            <BookOpenText size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Gallery