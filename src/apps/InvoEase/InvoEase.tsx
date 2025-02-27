import React, { useState } from 'react';
import { Button, Typography, Card, Divider, Stack, Box, Sheet, useColorScheme } from '@mui/joy';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import { useInvoice } from '@/apps/InvoEase/InvoiceContext';
import Details from '@/apps/InvoEase/stepComponents/Details';
import BillingInfo from '@/apps/InvoEase/stepComponents/BillingInfo';
import InvoiceItems from '@/apps/InvoEase/stepComponents/InvoiceItems';
import Summary from '@/apps/InvoEase/stepComponents/Summary';
import Preview from '@/apps/InvoEase/stepComponents/Preview';
import { Check, Download } from 'lucide-react';
import { useAuth } from '@/auth/AuthProvider';
import InvoiceLoginPrompt from '@/apps/InvoEase/InvoiceLoginPrompt';
import { generateAndDownloadPDF } from '@/apps/InvoEase/invoice.utils';
import { toastService } from '@/shared/toastr';

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
    const { mode } = useColorScheme();
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
        return <InvoiceLoginPrompt mode={mode} />;
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
        <Sheet
            sx={{
                minHeight: 'calc(100dvh - 52px)', p: 2,
                background: mode === 'light'
                    ? `
                            radial-gradient(circle at 30% 20%, rgba(102, 84, 241, 0.4), transparent 70%),
                            radial-gradient(circle at 70% 80%, rgba(105, 234, 203, 0.4), transparent 70%),
                            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4), transparent 70%)
                        `
                    : `
                            radial-gradient(circle at 30% 20%, rgba(0, 147, 130, 0.4), transparent 70%),
                            radial-gradient(circle at 70% 80%, rgba(162, 0, 0, 0.4), transparent 70%),
                            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), transparent 70%)
                        `,
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                <Typography
                    level="h1"
                    sx={{
                        fontFamily: 'Montserrat',
                        color: mode === 'light' ? 'primary.800' : 'primary.200',
                        mb: 4
                    }}
                >
                    InvoEase
                </Typography>

                <Stepper sx={{ mb: 4 }}>
                    {steps.map((step, index) => (
                        <Step
                            key={step.label}
                            indicator={
                                <StepIndicator
                                    variant={activeStep === index ? 'solid' : (activeStep > index ? 'soft' : 'outlined')}
                                    color={activeStep === index ? 'primary' : (activeStep > index ? 'success' : 'neutral')}
                                >
                                    {activeStep > index ? <Check /> : index + 1}
                                </StepIndicator>
                            }
                            completed={activeStep > index}
                        >
                            {step.label}
                        </Step>
                    ))}
                </Stepper>

                <Card variant="outlined" sx={{ p: 3, borderRadius: 'lg', boxShadow: 'md' }}>
                    <Typography level="h3" sx={{ mb: 2, textAlign: 'center' }}>
                        {steps[activeStep].label}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 2 }}>
                        <StepComponent onValidStep={(isValid: boolean) => setIsStepValid(isValid)} />
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        {activeStep > 0 && (
                            <Button
                                variant="outlined"
                                color="neutral"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        )}
                        {activeStep === steps.length - 1 ? (
                            <Button
                                onClick={handleDownload}
                                startDecorator={<Download />}
                                loading={isGenerating}
                            >
                                Generate PDF
                            </Button>
                        ) : (
                            <Button onClick={handleNext} disabled={!isStepValid}>
                                Next
                            </Button>
                        )}
                    </Stack>
                </Card>
            </Box>
        </Sheet>
    );
};

export default InvoEase;