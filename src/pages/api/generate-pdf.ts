// pages/api/generate-pdf.ts
import { generateInvoicePDF } from '@/components/InvoEase/utils/pdfGenerator';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const pdfBuffer = await generateInvoicePDF(req.body);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${req.body.invoiceNumber}.pdf`);
        res.send(pdfBuffer);
    } catch (error: any) {
        console.error('API Error:', error);
        res.status(500).json({
            message: 'Error generating PDF',
            error: error.message
        });
    }
}