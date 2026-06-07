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

    const answeredCount = Object.keys(response.responses).length;
    const totalFields = formConfig.steps.reduce(
        (sum, step) => sum + step.sections.reduce((sSum, section) => sSum + section.fields.length, 0), 0
    );

    const getDeviceIcon = () => {
        const ua = response.userAgent?.toLowerCase() || '';
        if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) return <Smartphone className="w-3.5 h-3.5" />;
        return <Monitor className="w-3.5 h-3.5" />;
    };

    const handleDelete = (e: React.MouseEvent) => { e.stopPropagation(); onDelete(response.id); };

    return (
        <div
            onClick={() => navigate(`/${response.formId}/responses/${response.id}`)}
            className="group flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-2xl hover:border-plum/40 hover:shadow-card hover:-translate-y-px cursor-pointer transition-all duration-200"
        >
            <div className="w-10 h-10 rounded-xl bg-plum/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-plum tabular-nums">{index}</span>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-ink">Response #{index}</span>
                    <span className="text-xs text-neutral-300">•</span>
                    <span className="text-xs text-neutral-500">{formatDate(response.submittedAt)}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">{getDeviceIcon()}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{response.ipAddress || 'Unknown'}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span>{answeredCount}/{totalFields} answered</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={handleDelete} className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200" aria-label="Delete response">
                    <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
            </div>
        </div>
    );
}
