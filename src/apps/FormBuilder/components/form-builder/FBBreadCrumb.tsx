import { cn } from '@/shared/cn';
import { ChevronRight, FileText, Layers, SquareMenu, Type, ArrowLeft } from 'lucide-react';
import React from 'react';
import { ViewType } from '../../helpers/fb.types';
import { useBreadcrumbs, useNavigation } from '../../helpers/useFormEngine';

interface FBBreadcrumbProps {
    className?: string;
}

const FBBreadcrumb: React.FC<FBBreadcrumbProps> = ({ className }) => {
    const breadcrumbs = useBreadcrumbs();
    const { navigateToForm, navigateToStep, navigateToSection, navigateToField } = useNavigation();

    const getIcon = (type: ViewType) => {
        switch (type) {
            case 'form':
                return <FileText size={14} />;
            case 'step':
                return <Layers size={14} />;
            case 'section':
                return <SquareMenu size={14} />;
            case 'field':
                return <Type size={14} />;
            default:
                return null;
        }
    };

    const getTypeColor = (type: ViewType) => {
        switch (type) {
            case 'form':
                return 'text-blue-600 dark:text-blue-400';
            case 'step':
                return 'text-purple-600 dark:text-purple-400';
            case 'section':
                return 'text-green-600 dark:text-green-400';
            case 'field':
                return 'text-orange-600 dark:text-orange-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    const handleBreadcrumbClick = (type: ViewType, path: string[]) => {
        switch (type) {
            case 'form':
                navigateToForm();
                break;
            case 'step':
                if (path.length >= 1) {
                    navigateToStep(path[0]);
                }
                break;
            case 'section':
                if (path.length >= 2) {
                    navigateToSection(path[0], path[1]);
                }
                break;
            case 'field':
                if (path.length >= 3) {
                    navigateToField(path[0], path[1], path[2]);
                }
                break;
        }
    };

    const handleBackToHome = () => {
        // Navigate to formlyst home
        window.location.href = '/formlyst';
    };

    const truncateText = (text: string, maxLength: number = 20) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    if (breadcrumbs.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label="Breadcrumb navigation"
            className={cn(
                "flex-1 h-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-3 flex items-center gap-3",
                className
            )}
        >
            {/* Back to Home Button */}
            <button
                onClick={handleBackToHome}
                className={cn(
                    "flex items-center justify-center p-2 rounded-md transition-colors",
                    "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                    "hover:bg-gray-100 dark:hover:bg-zinc-700",
                    "border border-gray-200 dark:border-zinc-600"
                )}
                title="Back to Formlyst Home"
            >
                <ArrowLeft size={16} />
            </button>

            {/* Breadcrumb List */}
            <ol className="flex items-center gap-2 text-sm min-w-0 flex-1">
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    const isClickable = !isLast;
                    const truncatedLabel = truncateText(crumb.label);

                    return (
                        <li key={crumb.key} className="flex items-center gap-2 min-w-0">
                            {/* Breadcrumb Item */}
                            <div className="flex items-center gap-1.5 min-w-0">
                                {isClickable ? (
                                    <button
                                        onClick={() => handleBreadcrumbClick(crumb.type, crumb.path)}
                                        className={cn(
                                            "flex items-center gap-1.5 px-2 py-1 rounded-md hover:cursor-pointer min-w-0",
                                            "hover:bg-gray-100 dark:hover:bg-zinc-700",
                                            "dark:focus:ring-offset-zinc-800",
                                            getTypeColor(crumb.type)
                                        )}
                                        title={`Navigate to ${crumb.label}`}
                                    >
                                        <div className="flex-shrink-0">
                                            {getIcon(crumb.type)}
                                        </div>
                                        <span className="font-medium truncate">
                                            {truncatedLabel}
                                        </span>
                                    </button>
                                ) : (
                                    <div className={cn(
                                        "flex items-center gap-1.5 px-2 py-1 rounded-md cursor-default min-w-0",
                                        "bg-gray-100 dark:bg-zinc-700",
                                        getTypeColor(crumb.type)
                                    )}>
                                        <div className="flex-shrink-0">
                                            {getIcon(crumb.type)}
                                        </div>
                                        <span className="font-medium truncate" title={crumb.label}>
                                            {truncatedLabel}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Separator */}
                            {!isLast && (
                                <ChevronRight
                                    size={14}
                                    className="text-gray-400 dark:text-gray-500 flex-shrink-0"
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default FBBreadcrumb;