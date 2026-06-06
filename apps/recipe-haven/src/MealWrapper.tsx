import { Home, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate, useParams, Outlet } from 'react-router';
import { useScrollToTop } from '@react-lab/shared';

const MealWrapper = () => {
    useScrollToTop();

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const generateBreadcrumbs = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [{ label: 'Home', path: '/' }];

        if (pathSegments.length >= 1) {
            const routeType = pathSegments[0];
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
        <div className="min-h-screen bg-page">

            {/* Header */}
            <header className="sticky top-0 z-20 bg-page/95 backdrop-blur-sm border-b border-shadow/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="font-serif text-xl font-semibold text-shadow tracking-tight hover:text-magenta transition-colors"
                    >
                        Recipe Haven
                    </button>
                </div>
            </header>

            {/* Breadcrumb + content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-7 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                            {index === 0 ? (
                                <button
                                    onClick={() => navigate(crumb.path)}
                                    className="flex items-center gap-1 text-shadow/50 hover:text-magenta transition-colors"
                                >
                                    <Home size={14} />
                                    <span>{crumb.label}</span>
                                </button>
                            ) : (
                                <>
                                    <ChevronRight size={14} className="text-shadow/30" aria-hidden />
                                    {isLastItem(index) ? (
                                        <span className="font-medium text-shadow" aria-current="page">{crumb.label}</span>
                                    ) : (
                                        <button
                                            onClick={() => navigate(crumb.path)}
                                            className="text-shadow/50 hover:text-magenta transition-colors"
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
