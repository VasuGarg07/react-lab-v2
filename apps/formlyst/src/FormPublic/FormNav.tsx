import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FormNavProps {
    currentStep: number;
    onBack: () => void;
    onNext: () => void;
}

export default function FormNav({ currentStep, onBack, onNext }: FormNavProps) {
    const isFirstStep = currentStep === 0;

    return (
        <div className="flex items-center gap-3 pt-4">
            <button
                type="button"
                onClick={onBack}
                disabled={isFirstStep}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                <ArrowLeft className="w-4 h-4" />Back
            </button>
            <button
                type="button"
                onClick={onNext}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
            >
                Next<ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}
