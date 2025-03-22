import { useLoaderData, useNavigate } from 'react-router';
import { MealDetails } from '@/apps/QuickByte/utils/recipe.helpers';
import { Info, LoaderPinwheel, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const imageVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const chipVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const Details = () => {
  const navigate = useNavigate();
  const meal: MealDetails = useLoaderData() as MealDetails;

  const handleAreaNav = () => {
    navigate(`/recipe-haven/area/${meal.area?.toLocaleLowerCase()}`);
  }

  const handleCategoryNav = () => {
    navigate(`/recipe-haven/category/${meal.category?.toLocaleLowerCase()}`);
  }

  const handleExternalUrl = (url: string) => {
    window.open(url, '_blank');
  }

  return (
    <motion.div
      className="flex flex-col gap-2 text-neutral-800 dark:text-neutral-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl md:text-3xl font-semibold text-center capitalize tracking-wide font-['Poiret_One']">
          {meal.name}
        </h2>
      </motion.div>

      <motion.div variants={imageVariants} className='mb-3'>
        <div className="relative w-full pt-[50%] rounded-xl shadow-md overflow-hidden">
          <img
            src={meal.image}
            alt={meal.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-md mb-3"
      >
        <div className="flex flex-row gap-4 justify-center">
          <p className="text-lg uppercase font-['Roboto'] text-neutral-800 dark:text-neutral-100">
            Region: <span
              className="text-red-600 dark:text-red-400 cursor-pointer hover:underline"
              onClick={handleAreaNav}
            >
              {meal.area}
            </span>
          </p>
          <p className="text-lg uppercase font-['Roboto'] text-neutral-800 dark:text-neutral-100">
            Category: <span
              className="text-red-600 dark:text-red-400 cursor-pointer hover:underline"
              onClick={handleCategoryNav}
            >
              {meal.category}
            </span>
          </p>
        </div>

        <div className="flex flex-row gap-2 justify-center mt-3">
          {meal.source &&
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                className="flex items-center px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                onClick={() => handleExternalUrl(meal.source!)}
              >
                <Info className="mr-2" size={18} />
                MORE INFO
              </button>
            </motion.div>
          }
          {meal.youtube &&
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => handleExternalUrl(meal.youtube!)}
              >
                <Play className="mr-2" size={18} />
                YOUTUBE
              </button>
            </motion.div>
          }
        </div>

        <div className="flex flex-row flex-wrap gap-2 justify-center mt-3">
          {meal.tags.map(tag =>
            <motion.div key={tag} variants={chipVariants}>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {tag}
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="h-[1.5px] bg-neutral-400 my-2"></div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold tracking-wide font-['Poiret_One'] text-neutral-800 dark:text-neutral-100">
          Ingredients
        </h2>
      </motion.div>

      <motion.div
        className="flex flex-row flex-wrap gap-x-2 gap-y-4"
        variants={containerVariants}
      >
        {meal.ingredients.map(ingredient => (
          <motion.div key={ingredient} variants={chipVariants}>
            <span className="px-3 py-2 bg-green-600 text-white rounded-md text-sm font-['Roboto'] font-light">
              {ingredient}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <div className="h-[1.5px] bg-neutral-400 my-2"></div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold tracking-wide font-['Poiret_One'] text-neutral-800 dark:text-neutral-100">
          Instructions
        </h2>
      </motion.div>

      <motion.ul variants={containerVariants} className="list-none">
        {meal.instructions.map(step => (step &&
          <motion.li
            key={step}
            variants={itemVariants}
            className="flex items-start py-2"
          >
            <span className="text-blue-600 dark:text-blue-400 mt-1 mr-2">
              <LoaderPinwheel size={20} />
            </span>
            <p className="text-neutral-800 dark:text-neutral-200">{step}</p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default Details;