import { Alert, Card, CardContent, Chip, Divider, IconButton, Sheet, Table, Typography } from '@mui/joy';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useLoan } from './LoanContext';
import { calculateTotalInterest, formatCurrency } from './loan.utils';

const ComparisonTable: React.FC = () => {
    const { savedScenarios, removeScenario, loanParams, monthlyPayment } = useLoan();

    // Add current scenario to comparison
    const allScenarios = [
        {
            id: 'current',
            name: 'Current Scenario',
            params: loanParams,
            monthlyPayment
        },
        ...savedScenarios
    ];

    // Format tenure as years
    const formatTenure = (years: number) => {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
    };

    // Format interest rate as percentage
    const formatInterestRate = (rate: number) => {
        return `${rate.toFixed(2)}%`;
    };

    // Calculate total interest for a scenario
    const getTotalInterest = (scenarioParams: any) => {
        return calculateTotalInterest(scenarioParams);
    };

    // Calculate total amount paid
    const getTotalPaid = (scenarioParams: any) => {
        return scenarioParams.loanAmount + getTotalInterest(scenarioParams);
    };

    // Find the best scenario based on lowest total paid
    const getBestScenario = () => {
        if (allScenarios.length < 2) return null;

        return allScenarios.reduce((best, current) => {
            const bestTotal = getTotalPaid(best.params);
            const currentTotal = getTotalPaid(current.params);

            return currentTotal < bestTotal ? current : best;
        });
    };

    const bestScenario = getBestScenario();

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography level="title-lg" sx={{ mb: 2 }}>
                    Loan Options Comparison
                </Typography>

                {savedScenarios.length === 0 ? (
                    <Alert
                        variant="soft"
                        color="neutral"
                        sx={{ mb: 2 }}
                    >
                        No saved scenarios yet. Create different loan scenarios and save them for comparison.
                    </Alert>
                ) : (
                    bestScenario && (
                        <Alert
                            variant="soft"
                            color="success"
                            sx={{ mb: 2 }}
                        >
                            <Typography level="title-sm">Recommended Option: {bestScenario.name}</Typography>
                            <Typography level="body-sm">
                                This option offers the lowest total cost (₹{(getTotalPaid(bestScenario.params) / 100000).toFixed(2)} Lakh)
                            </Typography>
                        </Alert>
                    )
                )}

                <Sheet variant="outlined" sx={{ overflow: 'auto' }}>
                    <Table hoverRow>
                        <thead>
                            <tr>
                                <th style={{ minWidth: '150px' }}>Scenario</th>
                                <th>Loan Amount</th>
                                <th>Interest Rate</th>
                                <th>Term</th>
                                <th>Monthly Payment</th>
                                <th>Total Interest</th>
                                <th>Total Cost</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allScenarios.map((scenario) => (
                                <tr key={scenario.id}>
                                    <td>
                                        {scenario.name}
                                        {scenario.id === 'current' && (
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                color="primary"
                                                sx={{ ml: 1 }}
                                            >
                                                Current
                                            </Chip>
                                        )}
                                        {bestScenario && scenario.id === bestScenario.id && scenario.id !== 'current' && (
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                color="success"
                                                sx={{ ml: 1 }}
                                            >
                                                Best
                                            </Chip>
                                        )}
                                    </td>
                                    <td>{formatCurrency(scenario.params.loanAmount)}</td>
                                    <td>{formatInterestRate(scenario.params.interestRate)}</td>
                                    <td>{formatTenure(scenario.params.loanTenure)}</td>
                                    <td>{formatCurrency(scenario.monthlyPayment)}</td>
                                    <td>{formatCurrency(getTotalInterest(scenario.params))}</td>
                                    <td>{formatCurrency(getTotalPaid(scenario.params))}</td>
                                    <td>
                                        {scenario.id !== 'current' && (
                                            <IconButton
                                                variant="plain"
                                                color="danger"
                                                size="sm"
                                                onClick={() => removeScenario(scenario.id)}
                                            >
                                                <Trash2 size={16} />
                                            </IconButton>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Sheet>

                <Divider sx={{ my: 2 }} />

                <Typography level="body-sm" color="neutral">
                    Tip: Create different scenarios by adjusting loan parameters and save them for comparison.
                    The "Best" option is calculated based on the lowest total cost of the loan.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ComparisonTable;