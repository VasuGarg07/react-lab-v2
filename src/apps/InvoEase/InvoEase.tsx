import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Accordion } from '@/ui/Accordion';
import { useAuth } from '@/auth/AuthProvider';
import LoginPrompt from '@/components/LoginPrompt';
import { generateAndDownloadPDF } from '@/apps/InvoEase/invoice.utils';
import useInvoiceStore, { useFormValidation } from './invoiceStore';
import { toastService } from '@/shared/toastr';
import {
    Download,
    FileText,
    Users,
    Package,
    Calculator,
    Eye,
    RotateCcw
} from 'lucide-react';
import DetailsSection from './stepComponents/Details';
import BillingSection from './stepComponents/BillingInfo';
import ItemsSection from './stepComponents/InvoiceItems';
import SummarySection from './stepComponents/Summary';
import PreviewSection from './stepComponents/Preview';

const invoiceSchema = z.object({
    _formValidation: z.boolean().default(true),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

const InvoEase = () => {
    const [isGenerating, setIsGenerating] = useState(false);

    const { isLoggedIn } = useAuth();
    const getInvoiceData = useInvoiceStore((state) => state.getInvoiceData);
    const resetForm = useInvoiceStore((state) => state.resetForm);
    const { isValid } = useFormValidation();

    const methods = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            _formValidation: true,
        },
    });

    if (!isLoggedIn) {
        return (
            <LoginPrompt
                title='Welcome to InvoEase'
                caption='Create professional invoices effortlessly. Streamline your billing process with our intuitive invoice generation tools.'
                image='/invoice-hero.png'
            />
        );
    }

    const handleDownload = async () => {
        if (!isValid) {
            toastService.error('Please complete all required fields before generating the invoice.');
            return;
        }

        setIsGenerating(true);
        try {
            const invoiceData = getInvoiceData();
            await generateAndDownloadPDF(invoiceData);
            toastService.success('Invoice generated successfully!');
        } catch (error) {
            console.error('Error generating PDF:', error);
            toastService.error('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleReset = () => {
        resetForm();
        toastService.info('Form reset successfully!');
    };

    const accordionItems = [
        {
            value: 'details',
            trigger: (
                <div className="flex items-center gap-3 w-full">
                    <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-left">Invoice Details</span>
                </div>
            ),
            content: <DetailsSection />,
        },
        {
            value: 'billing',
            trigger: (
                <div className="flex items-center gap-3 w-full">
                    <Users size={18} className="text-purple-600 dark:text-purple-400" />
                    <span className="text-left">Billing Information</span>
                </div>
            ),
            content: <BillingSection />,
        },
        {
            value: 'items',
            trigger: (
                <div className="flex items-center gap-3 w-full">
                    <Package size={18} className="text-green-600 dark:text-green-400" />
                    <span className="text-left">Invoice Items</span>
                </div>
            ),
            content: <ItemsSection />,
        },
        {
            value: 'summary',
            trigger: (
                <div className="flex items-center gap-3 w-full">
                    <Calculator size={18} className="text-orange-600 dark:text-orange-400" />
                    <span className="text-left">Summary & Notes</span>
                </div>
            ),
            content: <SummarySection />,
        },
        {
            value: 'preview',
            trigger: (
                <div className="flex items-center gap-3 w-full">
                    <Eye size={18} className="text-indigo-600 dark:text-indigo-400" />
                    <span className="text-left">Preview</span>
                </div>
            ),
            content: <PreviewSection />,
        },
    ];

    return (
        <div className="relative p-4 max-w-4xl mx-auto">
            {/* Header */}
            <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                InvoEase
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create professional invoices with ease
            </p>

            {/* Form Section */}
            <div className="lg:col-span-2 mb-4">
                <FormProvider {...methods}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Invoice Details
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Fill in the sections below. You can work on any section in any order.
                            </p>
                        </div>

                        <div className="p-4">
                            <Accordion
                                items={accordionItems}
                                type="single"
                                defaultValue="details"
                                collapsible={true}
                                className="space-y-4"
                            />
                        </div>
                    </div>
                </FormProvider>
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3">
                <div className="flex gap-2">
                    <button
                        onClick={handleDownload}
                        disabled={!isValid || isGenerating}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md text-sm font-medium transition-colors"
                    >
                        {isGenerating ? (
                            <>
                                <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <Download size={14} />
                                <span>Generate PDF</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleReset}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-sm transition-colors"
                    >
                        <RotateCcw size={14} />
                        <span>Reset</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoEase;