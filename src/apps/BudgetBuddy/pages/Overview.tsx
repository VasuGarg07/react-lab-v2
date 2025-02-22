import { Alert, Box, Button, CircularProgress, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy';
import { AlertTriangle, Download, History, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { CSVDownloader } from '@/shared/CSVDownloader';
import { useBudget } from '@/apps/BudgetBuddy/BudgetContext';
import TransactionTable from '@/apps/BudgetBuddy/components/TransactionTable';

const Overview: React.FC = () => {
    const { transactions, loading, error, handleAddTransaction, clearAllTransactions } = useBudget();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleClearAll = async () => {
        await clearAllTransactions();
        setShowConfirmDialog(false);
    };

    const handleDownload = () => {
        try {
            const downloader = new CSVDownloader(transactions);
            const fileName = `Expense Report - ${new Date().toDateString()}`;
            downloader.parseData();
            downloader.download(fileName);
        } catch (error) {
            console.error('Failed to download CSV:', error);
            // TODO: You might want to add proper error handling/notification here
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 52px)',
                    p: 3
                }}
            >
                <CircularProgress
                    size="lg"
                    variant="soft"
                    sx={{
                        '--CircularProgress-trackColor': 'rgba(132, 204, 22, 0.1)',
                        '--CircularProgress-progressColor': '#84cc16',
                    }}
                />
            </Box>
        );
    }

    if (error && !transactions.length) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert
                    variant="soft"
                    color="danger"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        boxShadow: 'sm'
                    }}
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    if (!transactions.length) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert
                    variant="soft"
                    color="neutral"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        boxShadow: 'sm'
                    }}
                >
                    No transactions found. Add some transactions to see your balance timeline.
                </Alert>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        borderBottom: '2px solid',
                        borderColor: '#84cc16',
                        pb: 2,
                        mb: 3
                    }}
                >
                    <History size={28} color="#84cc16" />
                    <Typography
                        level="h2"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            fontFamily: 'Montserrat',
                            letterSpacing: 1,
                            textTransform: 'uppercase'
                        }}
                    >
                        Overview
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        mb: 3
                    }}
                >
                    <Button
                        variant="outlined"
                        color="neutral"
                        onClick={handleDownload}
                        startDecorator={<Download size={16} />}
                    >
                        Download CSV
                    </Button>
                    <Button
                        onClick={handleAddTransaction}
                        startDecorator={<Plus size={18} />}
                        sx={{
                            bgcolor: '#683de6',
                            '&:hover': {
                                bgcolor: '#5330b9'
                            }
                        }}
                    >
                        Add Transaction
                    </Button>
                    <Button
                        variant="outlined"
                        color="danger"
                        startDecorator={<Trash2 size={18} />}
                        onClick={() => setShowConfirmDialog(true)}
                    >
                        Clear All
                    </Button>
                </Box>

                <TransactionTable transactions={transactions} />
            </Box>

            <Modal open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
                <ModalDialog
                    variant="outlined"
                    role="alertdialog"
                    aria-labelledby="alert-dialog-modal-title"
                    aria-describedby="alert-dialog-modal-description"
                    sx={{ maxWidth: 400 }}
                >
                    <Typography
                        id="alert-dialog-modal-title"
                        component="h2"
                        level="h4"
                        startDecorator={<AlertTriangle color="#dc2626" />}
                        sx={{ mb: 1 }}
                    >
                        Warning!
                    </Typography>
                    <Divider />
                    <Typography
                        id="alert-dialog-modal-description"
                        textColor="text.tertiary"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Are you sure you want to clear all transactions? This action cannot be undone.
                    </Typography>
                    <Stack direction='row' spacing={2} justifyContent='flex-end'>
                        <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => setShowConfirmDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={handleClearAll}
                        >
                            Clear All
                        </Button>
                    </Stack>
                </ModalDialog>
            </Modal>
        </>
    );
}

export default Overview;