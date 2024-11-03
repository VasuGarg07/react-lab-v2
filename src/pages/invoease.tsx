
import React, { useState, useRef } from 'react';
import { Button, Typography, Card, Divider, Stack, Box, Sheet, useColorScheme } from '@mui/joy';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Details from '@/components/InvoEase/Details';
import BillingInfo from '@/components/InvoEase/BillingInfo';
import InvoiceItems from '@/components/InvoEase/InvoiceItems';
import Summary from '@/components/InvoEase/Summary';
import Preview from '@/components/InvoEase/Preview';
import { Check, Download } from 'lucide-react';
import { InvoiceProvider } from '@/components/InvoEase/InvoiceContext';
import DownloadInvoiceButton from '@/components/InvoEase/DownloadBtn';

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
    const { mode } = useColorScheme();
    const previewRef = useRef<HTMLDivElement>(null);

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

    const StepComponent = steps[activeStep].component;

    return (
        <InvoiceProvider>
            <Sheet
                sx={{
                    minHeight: 'calc(100vh - 52px)',
                    background: mode === 'light'
                        ? 'linear-gradient(45deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)'
                        : 'linear-gradient(45deg, #2c3e50 0%, #1a2a3d 99%, #1a2a3d 100%)',
                    p: 2,
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                    <Typography level="h1" sx={{ fontFamily: 'Montserrat', color: mode === 'light' ? 'primary.800' : 'primary.200', mb: 4 }}>
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
                            <div ref={previewRef}>
                                <StepComponent onValidStep={(isValid: boolean) => setIsStepValid(isValid)} />
                            </div>
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
                                <DownloadInvoiceButton />
                            ) : (
                                <Button onClick={handleNext} disabled={!isStepValid}>Next</Button>
                            )}
                        </Stack>
                    </Card>
                </Box>
            </Sheet>
        </InvoiceProvider>
    );
};

export default InvoEase;