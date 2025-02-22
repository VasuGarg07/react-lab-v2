import apiClient from "@/shared/apiClient";
import { Invoice } from "@/apps/InvoEase/types";

export const CurrencyOptions = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
    { value: 'JPY', label: 'JPY (¥)', symbol: '¥' },
    { value: 'CAD', label: 'CAD (C$)', symbol: 'C$' },
    { value: 'AUD', label: 'AUD (A$)', symbol: 'A$' },
    { value: 'CHF', label: 'CHF (Fr)', symbol: 'Fr' },
    { value: 'CNY', label: 'CNY (¥)', symbol: '¥' },
    { value: 'INR', label: 'INR (₹)', symbol: '₹' },
    { value: 'NZD', label: 'NZD (NZ$)', symbol: 'NZ$' },
];

export function generateCompactId(): string {
    const now = new Date();

    // Get date and time components
    const year = String(now.getFullYear()).slice(-2); // Last two digits of year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Combine components with a single underscore
    const id = `${year}${month}${day}_${hours}${minutes}`;

    return id;
}

export const generateAndDownloadPDF = async (invoice: Invoice): Promise<void> => {
    try {
        const response = await apiClient.post('/invoice/generate', invoice, {
            responseType: 'blob', // Important for handling PDF blob response
            headers: {
                'Accept': 'application/pdf',
            },
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `invoice-${invoice.invoiceNumber}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};