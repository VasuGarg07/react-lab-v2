import { ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { navigate } from '../store/formBuilderSlice';
import { buildBreadcrumbs } from '../helpers/utils';
import { ENTITY_COLORS } from '../helpers/constants';

export default function Breadcrumb() {
    const dispatch = useAppDispatch();
    const { formConfig, path } = useAppSelector((state) => state.formBuilder);
    const breadcrumbs = buildBreadcrumbs(formConfig, path);

    return (
        <nav className="flex items-center gap-1 overflow-x-auto -mx-1">
            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                const colors = ENTITY_COLORS[crumb.type];

                return (
                    <div key={crumb.key} className="flex items-center gap-1 shrink-0">
                        {index > 0 && <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />}
                        <button
                            onClick={() => dispatch(navigate(crumb.path))}
                            disabled={isLast}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-sm transition-all duration-200 ${isLast ? `${colors.bg} ${colors.text} font-medium cursor-default` : 'text-neutral-600 hover:bg-neutral-100 '}`}
                        >
                            {isLast && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                            <span className="max-w-32 truncate">{crumb.label}</span>
                        </button>
                    </div>
                );
            })}
        </nav>
    );
}
