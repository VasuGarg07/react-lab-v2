import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Input,
    FormControl,
    FormLabel,
    Grid,
    Divider,
    LinearProgress,
    Alert,
    Sheet
} from '@mui/joy';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { useLoan } from './LoanContext';
import { formatCurrency } from './loan.utils';

const AffordabilityCalculator: React.FC = () => {
    const {
        monthlyPayment,
        monthlyIncome,
        monthlyExpenses,
        updateAffordabilityInputs,
        affordabilityMetrics
    } = useLoan();

    // Handle income change
    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= 0) {
            updateAffordabilityInputs(value, monthlyExpenses);
        }
    };

    // Handle expenses change
    const handleExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= monthlyIncome) {
            updateAffordabilityInputs(monthlyIncome, value);
        }
    };

    // Get progress bar color based on DTI ratio
    const getDTIProgressColor = () => {
        if (!affordabilityMetrics) return 'primary';

        const { debtToIncomeRatio } = affordabilityMetrics;

        if (debtToIncomeRatio <= 36) return 'success';
        if (debtToIncomeRatio <= 43) return 'warning';
        return 'danger';
    };

    // Get alert component based on affordability status
    const getAffordabilityAlert = () => {
        if (!affordabilityMetrics) return null;

        const { affordabilityStatus, debtToIncomeRatio } = affordabilityMetrics;

        switch (affordabilityStatus) {
            case 'good':
                return (
                    <Alert
                        variant="soft"
                        color="success"
                        startDecorator={<CheckCircle />}
                    >
                        <Typography level="title-sm">Good affordability</Typography>
                        <Typography level="body-sm">
                            Your debt-to-income ratio is {debtToIncomeRatio}%, which is within the recommended limit of 36%.
                            Lenders typically view this favorably.
                        </Typography>
                    </Alert>
                );

            case 'caution':
                return (
                    <Alert
                        variant="soft"
                        color="warning"
                        startDecorator={<AlertCircle />}
                    >
                        <Typography level="title-sm">Proceed with caution</Typography>
                        <Typography level="body-sm">
                            Your debt-to-income ratio is {debtToIncomeRatio}%, which is above the ideal limit of 36% but below
                            the maximum of 43% that most lenders allow.
                        </Typography>
                    </Alert>
                );

            case 'warning':
                return (
                    <Alert
                        variant="soft"
                        color="danger"
                        startDecorator={<AlertTriangle />}
                    >
                        <Typography level="title-sm">Affordability concern</Typography>
                        <Typography level="body-sm">
                            Your debt-to-income ratio is {debtToIncomeRatio}%, which exceeds the 43% limit that most lenders allow.
                            Consider reducing your loan amount or increasing your income.
                        </Typography>
                    </Alert>
                );

            default:
                return null;
        }
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography level="title-lg" sx={{ mb: 2 }}>
                    Affordability Calculator
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Monthly Income (After Tax)</FormLabel>
                            <Input
                                type="number"
                                value={monthlyIncome || ''}
                                onChange={handleIncomeChange}
                                placeholder="Enter your monthly income"
                                startDecorator="₹"
                                slotProps={{
                                    input: {
                                        min: 0,
                                        step: 1000,
                                    }
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Monthly Expenses (Excluding Housing)</FormLabel>
                            <Input
                                type="number"
                                value={monthlyExpenses || ''}
                                onChange={handleExpensesChange}
                                placeholder="Enter your monthly expenses"
                                startDecorator="₹"
                                slotProps={{
                                    input: {
                                        min: 0,
                                        max: monthlyIncome,
                                        step: 1000,
                                    }
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                {!monthlyIncome ? (
                    <Alert
                        variant="soft"
                        color="neutral"
                    >
                        Enter your monthly income and expenses to see affordability metrics.
                    </Alert>
                ) : (
                    <Box>
                        <Sheet
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 'md',
                                mb: 2
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid xs={12} md={6}>
                                    <Typography level="title-sm">Monthly Payment</Typography>
                                    <Typography level="h4">{formatCurrency(monthlyPayment)}</Typography>
                                </Grid>

                                <Grid xs={12} md={6}>
                                    <Typography level="title-sm">Available Income (After Expenses)</Typography>
                                    <Typography level="h4">{formatCurrency(monthlyIncome - monthlyExpenses)}</Typography>
                                </Grid>

                                {affordabilityMetrics && (
                                    <>
                                        <Grid xs={12}>
                                            <Divider sx={{ my: 2 }} />
                                        </Grid>

                                        <Grid xs={12} md={6}>
                                            <Typography level="title-sm">Maximum Recommended Payment</Typography>
                                            <Typography level="h4">{formatCurrency(affordabilityMetrics.maxRecommendedPayment)}</Typography>
                                            <Typography level="body-xs" color="neutral">
                                                Based on 28% of monthly income
                                            </Typography>
                                        </Grid>

                                        <Grid xs={12} md={6}>
                                            <Typography level="title-sm">Debt-to-Income Ratio</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <LinearProgress
                                                        determinate
                                                        value={Math.min(affordabilityMetrics.debtToIncomeRatio, 100)}
                                                        color={getDTIProgressColor()}
                                                        sx={{ my: 1 }}
                                                    />
                                                </Box>
                                                <Typography level="body-md">{affordabilityMetrics.debtToIncomeRatio}%</Typography>
                                            </Box>
                                            <Typography level="body-xs" color="neutral">
                                                (Housing + Expenses) ÷ Income
                                            </Typography>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Sheet>

                        {getAffordabilityAlert()}

                        <Divider sx={{ my: 2 }} />

                        <Typography level="body-sm" color="neutral">
                            General guideline: Your total debt payments (including this loan) should ideally be below 36% of your gross income, and most lenders set a maximum limit of 43%.
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default AffordabilityCalculator;