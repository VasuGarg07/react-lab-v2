import { Home, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

interface WrapperProps {
    children: ReactNode;
}

const MealWrapper = ({ children }: WrapperProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const generateBreadcrumbs = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [{ label: 'Home', path: '/recipe-haven' }];

        if (pathSegments.length >= 2) {
            const routeType = pathSegments[1];

            switch (routeType) {
                case 'search':
                    breadcrumbs.push({
                        label: `"${params.searchTerm}"`,
                        path: location.pathname
                    });
                    break;
                case 'category':
                    breadcrumbs.push({
                        label: params.categoryId ? capitalize(params.categoryId) : 'Category',
                        path: location.pathname
                    });
                    break;
                case 'region':
                case 'area':
                    breadcrumbs.push({
                        label: params.areaId ? capitalize(params.areaId) : 'Region',
                        path: location.pathname
                    });
                    break;
                case 'alphabet':
                    breadcrumbs.push({
                        label: params.letter?.toUpperCase() || 'Letter',
                        path: location.pathname
                    });
                    break;
                case 'meal':
                    breadcrumbs.push({
                        label: 'Recipe',
                        path: location.pathname
                    });
                    break;
            }
        }

        return breadcrumbs;
    };

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const breadcrumbs = generateBreadcrumbs();
    const isLastItem = (index: number) => index === breadcrumbs.length - 1;

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 mb-6 text-sm">
                {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                        {index === 0 ? (
                            <button
                                onClick={() => navigate(crumb.path)}
                                className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors"
                            >
                                <Home size={16} />
                                <span>{crumb.label}</span>
                            </button>
                        ) : (
                            <>
                                <ChevronRight size={16} className="text-stone-400 dark:text-stone-600" />
                                {isLastItem(index) ? (
                                    <span className="font-medium text-stone-900 dark:text-stone-100">
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => navigate(crumb.path)}
                                        className="text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors"
                                    >
                                        {crumb.label}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </nav>

            {children}
        </div>
    );
};

export default MealWrapper;