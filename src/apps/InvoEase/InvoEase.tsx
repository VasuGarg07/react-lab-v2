import { generateAndDownloadPDF } from '@/apps/InvoEase/invoice.utils';
import { useInvoice } from '@/apps/InvoEase/InvoiceContext';
import BillingInfo from '@/apps/InvoEase/stepComponents/BillingInfo';
import Details from '@/apps/InvoEase/stepComponents/Details';
import InvoiceItems from '@/apps/InvoEase/stepComponents/InvoiceItems';
import Preview from '@/apps/InvoEase/stepComponents/Preview';
import Summary from '@/apps/InvoEase/stepComponents/Summary';
import { useAuth } from '@/auth/AuthProvider';
import AppBackground from '@/components/AppBackground';
import LoginPrompt from '@/components/LoginPrompt';
import { toastService } from '@/shared/toastr';
import Stepper from '@/ui/Stepper';
import { Download } from 'lucide-react';
import React, { useState } from 'react';

const steps = [
    { label: 'Invoice Details', component: Details },
    { label: 'Billing Information', component: BillingInfo },
    { label: 'Invoice Items', component: InvoiceItems },
    { label: 'Summary', component: Summary },
    { label: 'Preview', component: Preview },
];

const InvoEase: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isStepValid, setIsStepValid] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const { isLoggedIn } = useAuth();
    const {
        currentDate,
        dueDate,
        invoiceNumber,
        currency,
        currencySymbol,
        billTo,
        billFrom,
        items,
        taxRate,
        discountRate,
        notes
    } = useInvoice();

    if (!isLoggedIn) {
        return <LoginPrompt
            title='Welcome to InvoEase'
            caption='Create professional invoices effortlessly. Streamline your billing process with our intuitive invoice generation tools.'
            image='/invoice-hero.png' />;
    }

    const handleNext = () => {
        if (isStepValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setIsStepValid(false);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setIsStepValid(true);
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            await generateAndDownloadPDF({
                currentDate,
                dueDate,
                invoiceNumber,
                currency,
                currencySymbol,
                billTo,
                billFrom,
                items,
                taxRate,
                discountRate,
                notes
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            toastService.error('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const StepComponent = steps[activeStep].component;

    return (
        <div className="relative h-[calc(100vh-54px)] overflow-hidden">
            <AppBackground />
            <div className="p-6 relative w-full max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 font-['SF Pro Display', 'Montserrat', 'sans-serif'] text-blue-800 dark:text-blue-200">
                    InvoEase
                </h1>

                <Stepper
                    steps={steps}
                    activeStep={activeStep}
                />

                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-zinc-700 transition-all duration-200">
                    <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
                        {steps[activeStep].label}
                    </h2>

                    <div className="h-px w-full bg-gray-200 dark:bg-zinc-700 mb-6"></div>

                    <div className="mb-6">
                        <StepComponent onValidStep={(isValid: boolean) => setIsStepValid(isValid)} />
                    </div>

                    <div className="h-px w-full bg-gray-200 dark:bg-zinc-700 mb-4"></div>

                    <div className="flex justify-end gap-3">
                        {activeStep > 0 && (
                            <button
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                        )}
                        {activeStep === steps.length - 1 ? (
                            <button
                                onClick={handleDownload}
                                disabled={isGenerating}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 disabled:opacity-50 transition-colors"
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Download size={18} />
                                        Generate PDF
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!isStepValid}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoEase;