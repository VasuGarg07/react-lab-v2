import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Card, Divider } from '@mui/joy';
import { InvoiceProvider } from './InvoiceContext';
import Details from './Details';
import BillingInfo from './BillingInfo';
import InvoiceItems from './InvoiceItems';
import Summary from './Summary';
import Preview from './Preview';

const InvoiceGenerator: React.FC = () => {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <InvoiceProvider>
            <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
                <Typography level="h2" sx={{ mb: 1, textAlign: 'center' }}>Invoice Generator</Typography>

                <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 'lg' }}>
                    <Typography level="h4">Invoice Details</Typography>
                    <Divider />
                    <Details />
                </Card>

                <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 'lg' }}>
                    <Typography level="h4">Billing Information</Typography>
                    <Divider />
                    <BillingInfo />
                </Card>

                <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 'lg' }}>
                    <Typography level="h4">Invoice Items</Typography>
                    <Divider />
                    <InvoiceItems />
                </Card>

                <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 'lg' }}>
                    <Typography level="h4">Summary</Typography>
                    <Divider />
                    <Summary />
                </Card>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                        size="lg"
                        onClick={() => setShowPreview(true)}
                        sx={{ minWidth: 200, borderRadius: 'md' }}
                    >
                        Review Invoice
                    </Button>
                </Box>
            </Box>

            <Modal
                open={showPreview}
                onClose={() => setShowPreview(false)}
            >
                <Card
                    variant="outlined"
                    sx={{
                        maxWidth: 800,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        borderRadius: 'lg',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <Preview />
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => setShowPreview(false)}
                            sx={{ borderRadius: 'md' }}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => {/* Handle save or print */ }}
                            sx={{ borderRadius: 'md' }}
                        >
                            Save/Print
                        </Button>
                    </Box>
                </Card>
            </Modal>
        </InvoiceProvider>
    );
};

export default InvoiceGenerator;