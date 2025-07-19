import { Meal } from '@/apps/QuickByte/utils/recipe.helpers';
import { motion } from 'framer-motion';
import { useLoaderData } from 'react-router';
import MealCard from './MealCard';
import { useCacheLoaderData } from './utils/useRecipeQueries';

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
  const loaderData = useLoaderData() as GalleryData;

  // Cache the loader data for faster back/forward navigation
  const { data } = useCacheLoaderData(
    ['gallery', window.location.pathname],
    loaderData,
    1000 * 60 * 10 // 10 minutes
  );

  const { title, meals } = data!;

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
};


export default Gallery;