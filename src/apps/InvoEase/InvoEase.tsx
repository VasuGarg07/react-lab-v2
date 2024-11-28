import React, { useState, useRef } from 'react';
import { Button, Typography, Card, Divider, Stack, Box, Sheet, useColorScheme } from '@mui/joy';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import { InvoiceProvider } from './InvoiceContext';
import Details from './Details';
import BillingInfo from './BillingInfo';
import InvoiceItems from './InvoiceItems';
import Summary from './Summary';
import Preview from './Preview';
import { Check, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

    const handleDownload = async () => {
        if (previewRef.current) {
            try {
                const canvas = await html2canvas(previewRef.current, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                const margin = 10; // 10mm margin
                const maxWidth = pageWidth - (2 * margin);
                const maxHeight = pageHeight - (2 * margin);

                const imgProps = pdf.getImageProperties(imgData);
                const imgWidth = imgProps.width;
                const imgHeight = imgProps.height;

                let pdfWidth, pdfHeight;

                if (imgWidth / maxWidth > imgHeight / maxHeight) {
                    // Image is wider relative to the page
                    pdfWidth = maxWidth;
                    pdfHeight = (imgHeight * maxWidth) / imgWidth;
                } else {
                    // Image is taller relative to the page
                    pdfHeight = maxHeight;
                    pdfWidth = (imgWidth * maxHeight) / imgHeight;
                }

                const x = (pageWidth - pdfWidth) / 2;
                const y = (pageHeight - pdfHeight) / 2;

                pdf.addImage(imgData, 'PNG', x, y, pdfWidth, pdfHeight);
                pdf.save('invoice.pdf');
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        }
    };


    const StepComponent = steps[activeStep].component;

    return (
        <InvoiceProvider>
            <Sheet
                sx={{
                    minHeight: 'calc(100vh - 52px)',
                    position: 'relative',
                    background: mode === 'dark'
                        ? 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3a 50%, #252550 100%)'
                        : 'linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: mode === 'dark'
                            ? ` repeating-linear-gradient(45deg, transparent 0, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 37px),
                                repeating-linear-gradient(-45deg, transparent 0, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 37px)`
                            : `repeating-linear-gradient(45deg, transparent 0, transparent 35px, rgba(0,0,0,0.03) 35px, rgba(0,0,0,0.03) 37px),
                                repeating-linear-gradient(-45deg, transparent 0, transparent 35px, rgba(0,0,0,0.03) 35px, rgba(0,0,0,0.03) 37px)`,
                        backgroundSize: '100px 100px',
                    },
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
                                <Button
                                    onClick={handleDownload}
                                    startDecorator={<Download />}
                                >
                                    Download PDF
                                </Button>
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