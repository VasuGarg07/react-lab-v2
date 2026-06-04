import { Home, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate, useParams, Outlet } from 'react-router';
import { useScrollToTop } from '@react-lab/shared';
import { ThemeToggle } from '@react-lab/ui';

const MealWrapper = () => {
    useScrollToTop();

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const generateBreadcrumbs = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [{ label: 'Home', path: '/recipe-haven' }];

        if (pathSegments.length >= 2) {
            const routeType = pathSegments[1];
            switch (routeType) {
                case 'search':
                    breadcrumbs.push({ label: `"${params.searchTerm}"`, path: location.pathname });
                    break;
                case 'category':
                    breadcrumbs.push({ label: params.categoryId ? capitalize(params.categoryId) : 'Category', path: location.pathname });
                    break;
                case 'region':
                case 'area':
                    breadcrumbs.push({ label: params.areaId ? capitalize(params.areaId) : 'Region', path: location.pathname });
                    break;
                case 'alphabet':
                    breadcrumbs.push({ label: params.letter?.toUpperCase() || 'Letter', path: location.pathname });
                    break;
                case 'meal':
                    breadcrumbs.push({ label: 'Recipe', path: location.pathname });
                    break;
            }
        }

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();
    const isLastItem = (index: number) => index === breadcrumbs.length - 1;

    return (
        <div className="min-h-screen bg-ivory dark:bg-onyx">

            {/* Header */}
            <header className="sticky top-0 z-20 bg-ivory/90 dark:bg-onyx/90 backdrop-blur-sm border-b border-iron/15 dark:border-ivory/8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/recipe-haven')}
                        className="font-serif text-lg text-iron dark:text-ivory hover:text-carrot dark:hover:text-pollen transition-colors"
                    >
                        Recipe Haven
                    </button>
                    <ThemeToggle />
                </div>
            </header>

            {/* Breadcrumb + content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <nav className="flex items-center gap-2 mb-6 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {index === 0 ? (
                                <button
                                    onClick={() => navigate(crumb.path)}
                                    className="flex items-center gap-1.5 text-iron/60 dark:text-ivory/50 hover:text-carrot dark:hover:text-pollen transition-colors"
                                >
                                    <Home size={16} />
                                    <span>{crumb.label}</span>
                                </button>
                            ) : (
                                <>
                                    <ChevronRight size={16} className="text-iron/30 dark:text-ivory/25" />
                                    {isLastItem(index) ? (
                                        <span className="font-medium text-iron dark:text-ivory">{crumb.label}</span>
                                    ) : (
                                        <button
                                            onClick={() => navigate(crumb.path)}
                                            className="text-iron/60 dark:text-ivory/50 hover:text-carrot dark:hover:text-pollen transition-colors"
                                        >
                                            {crumb.label}
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </nav>

                <Outlet />
            </div>
        </div>
    );
};

export default MealWrapper;
