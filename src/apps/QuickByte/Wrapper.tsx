import AppBackground from '@/components/AppBackground';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';
import { useLoaderData } from 'react-router';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; path: string }[]>([]);
  const loaderData = useLoaderData() as any;

  useEffect(() => {
    const generateBreadcrumbs = () => {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const breadcrumbItems = [{ label: 'Home', path: '/recipe-haven' }];

      // Determine the middle breadcrumb based on the route pattern
      if (pathSegments.length >= 2) {
        const routeType = pathSegments[1];
        let middleLabel = '';

        switch (routeType) {
          case 'search':
            middleLabel = `Search Results: "${params.searchTerm}"`;
            breadcrumbItems.push({
              label: middleLabel,
              path: location.pathname
            });
            break;
          case 'category':
            middleLabel = `Category: ${capitalizeFirstLetter(params.categoryId || '')}`;
            breadcrumbItems.push({
              label: middleLabel,
              path: location.pathname
            });
            break;
          case 'region':
          case 'area':
            middleLabel = `${capitalizeFirstLetter(params.areaId || '')} Cuisine`;
            breadcrumbItems.push({
              label: middleLabel,
              path: location.pathname
            });
            break;
          case 'alphabet':
            middleLabel = `Recipes: "${params.letter?.toUpperCase()}"`;
            breadcrumbItems.push({
              label: middleLabel,
              path: location.pathname
            });
            break;
          case 'meal':
            // For meal details, we need to check if we have the meal name from loader data
            if (loaderData && loaderData.name) {
              breadcrumbItems.push({
                label: loaderData.name,
                path: location.pathname
              });
            } else {
              breadcrumbItems.push({
                label: 'Recipe Details',
                path: location.pathname
              });
            }
            break;
        }
      }

      setBreadcrumbs(breadcrumbItems);
    };

    generateBreadcrumbs();
  }, [location, params, loaderData]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-[calc(100vh-54px)] w-full overflow-hidden">
      <AppBackground />

      <div className="relative w-full max-w-4xl mx-auto z-10 flex flex-col p-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index === 0 ? (
                <button
                  onClick={() => handleNavigate(crumb.path)}
                  className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Home size={16} className="mr-1" />
                  {crumb.label}
                </button>
              ) : (
                <>
                  <ChevronRight size={16} className="mx-2 text-gray-500 dark:text-gray-400" />
                  <span className={index === breadcrumbs.length - 1 ? "font-semibold text-blue-600 dark:text-blue-400" : "hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"}>
                    {crumb.label}
                  </span>
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Main Content */}
        {children}
      </div>
    </div>
  );
};

export default Wrapper;