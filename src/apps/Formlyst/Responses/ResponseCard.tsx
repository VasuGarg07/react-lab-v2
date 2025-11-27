import { useNavigate } from 'react-router';
import { ChevronRight, Globe, Monitor, Smartphone, Trash2 } from 'lucide-react';
import type { FormResponse, FormConfig } from '../helpers/types';
import { formatDate } from '../helpers/utils';

interface ResponseCardProps {
    response: FormResponse;
    formConfig: FormConfig;
    index: number;
    onDelete: (id: string) => void;
}

export default function ResponseCard({ response, formConfig, index, onDelete }: ResponseCardProps) {
    const navigate = useNavigate();

    // Count total answered fields
    const answeredCount = Object.keys(response.responses).length;

    // Count total fields in form
    const totalFields = formConfig.steps.reduce(
        (sum, step) => sum + step.sections.reduce(
            (sSum, section) => sSum + section.fields.length, 0
        ), 0
    );

    // Detect device from user agent
    const getDeviceIcon = () => {
        const ua = response.userAgent?.toLowerCase() || '';
        if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
            return <Smartphone className="w-3.5 h-3.5" />;
        }
        return <Monitor className="w-3.5 h-3.5" />;
    };

    const handleClick = () => {
        navigate(`/formlyst/${response.formId}/responses/${response.id}`);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(response.id);
    };

    return (
        <div
            onClick={handleClick}
            className="group flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm cursor-pointer transition-all duration-200"
        >
            {/* Index Badge */}
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                    {index}
                </span>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        Response #{index}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">•</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(response.submittedAt)}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                    {/* Device */}
                    <span className="flex items-center gap-1">
                        {getDeviceIcon()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />

                    {/* IP */}
                    <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        {response.ipAddress || 'Unknown'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />

                    {/* Answer count */}
                    <span>
                        {answeredCount}/{totalFields} answered
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={handleDelete}
                    className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    aria-label="Delete response"
                >
                    <Trash2 className="w-4 h-4" />
                </button>

                <ChevronRight className="w-5 h-5 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
            </div>
        </div>
    );
}