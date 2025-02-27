import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalClose,
    ModalDialog,
    Typography
} from '@mui/joy';
import { Calendar, Save, TrendingDown } from 'lucide-react';
import React, { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useLoan } from './LoanContext';
import { formatCurrency } from './loan.utils';

const LoanSummary: React.FC = () => {
    const {
        loanParams,
        monthlyPayment,
        paymentSplit,
        extraPaymentImpact,
        saveScenario
    } = useLoan();

    const [open, setOpen] = useState(false);
    const [scenarioName, setScenarioName] = useState('');
    const [showExtraPaymentInfo, setShowExtraPaymentInfo] = useState(false);

    const { extraPayment = 0 } = loanParams;
    const { principalPercentage, interestPercentage } = paymentSplit;

    // Data for the pie chart
    const data = [
        { name: 'Principal', value: principalPercentage },
        { name: 'Interest', value: interestPercentage }
    ];

    // Colors for the pie chart
    const COLORS = ['#36A2EB', '#FF6384'];

    // Save scenario handler
    const handleSaveScenario = () => {
        if (scenarioName.trim()) {
            saveScenario(scenarioName);
            setScenarioName('');
            setOpen(false);
        }
    };

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography level="title-lg" sx={{ mb: 2 }}>
                        Loan Summary
                    </Typography>

                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Typography level="h2" component="div">
                            {formatCurrency(monthlyPayment)}
                        </Typography>
                        <Typography level="body-sm" color="neutral">
                            Monthly Payment
                        </Typography>
                    </Box>

                    <Box sx={{ height: 240, mb: 2 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => [`${value.toFixed(2)}%`, 'Percentage']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {extraPayment > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <Button
                                variant="soft"
                                color="primary"
                                fullWidth
                                startDecorator={<Calendar />}
                                onClick={() => setShowExtraPaymentInfo(!showExtraPaymentInfo)}
                                sx={{ mb: 1 }}
                            >
                                View Extra Payment Impact
                            </Button>

                            {showExtraPaymentInfo && (
                                <Alert
                                    variant="soft"
                                    color="success"
                                    sx={{ mt: 1 }}
                                    startDecorator={<TrendingDown />}
                                >
                                    <Box>
                                        <Typography level="title-sm">
                                            Loan Term Reduction
                                        </Typography>
                                        <Typography level="body-sm">
                                            {extraPaymentImpact.timeShortened.years} years, {extraPaymentImpact.timeShortened.months} months
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <Typography level="title-sm">
                                            Interest Savings
                                        </Typography>
                                        <Typography level="body-sm">
                                            {formatCurrency(extraPaymentImpact.interestSaved)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <Typography level="title-sm">
                                            New Payoff Date
                                        </Typography>
                                        <Typography level="body-sm">
                                            {extraPaymentImpact.newPayoffDate.toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Alert>
                            )}
                        </Box>
                    )}

                    <Button
                        variant="soft"
                        color="primary"
                        fullWidth
                        startDecorator={<Save />}
                        onClick={() => setOpen(true)}
                    >
                        Save Scenario for Comparison
                    </Button>
                </CardContent>
            </Card>

            {/* Save Scenario Modal */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <ModalClose />
                    <Typography level="title-md">Save Current Scenario</Typography>
                    <Divider sx={{ my: 2 }} />
                    <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Scenario Name</FormLabel>
                        <Input
                            value={scenarioName}
                            onChange={(e) => setScenarioName(e.target.value)}
                            placeholder="e.g., 10-year loan with 10% rate"
                        />
                    </FormControl>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveScenario}>Save</Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    );
};

export default LoanSummary;