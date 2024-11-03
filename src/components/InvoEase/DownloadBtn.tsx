// components/DownloadInvoiceButton.tsx
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { useInvoice } from './InvoiceContext';
import { Button } from '@mui/joy';

const DownloadInvoiceButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
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

    const downloadInvoice = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-${invoiceNumber}.pdf`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading invoice:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={downloadInvoice}
            disabled={isLoading}
            startDecorator={<Download className={isLoading ? 'animate-pulse' : ''} />}
        >
            {isLoading ? 'Generating PDF...' : 'Download PDF'}
        </Button>
    );
};

export default DownloadInvoiceButton;