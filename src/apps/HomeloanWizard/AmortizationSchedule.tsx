import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    Sheet,
    Divider,
    FormControl,
    Select,
    Option,
    ToggleButtonGroup,
    IconButton,
} from '@mui/joy';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import { BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import { useLoan } from './LoanContext';
import { formatCurrency } from './loan.utils';

type ChartType = 'bar' | 'line' | 'area';

const AmortizationSchedule: React.FC = () => {
    const { amortizationSchedule } = useLoan();
    const [chartType, setChartType] = useState<ChartType>('bar');
    const [displayOption, setDisplayOption] = useState<string>('yearly-payment');

    // Format data for the chart based on the display option
    const getChartData = () => {
        switch (displayOption) {
            case 'yearly-payment':
                return amortizationSchedule.map(year => ({
                    year: `Year ${year.year}`,
                    principal: year.principalPaid,
                    interest: year.interestPaid
                }));
            case 'remaining-balance':
                return amortizationSchedule.map(year => ({
                    year: `Year ${year.year}`,
                    balance: year.remainingBalance
                }));
            case 'cumulative':
                let cumulativePrincipal = 0;
                let cumulativeInterest = 0;

                return amortizationSchedule.map(year => {
                    cumulativePrincipal += year.principalPaid;
                    cumulativeInterest += year.interestPaid;

                    return {
                        year: `Year ${year.year}`,
                        principal: cumulativePrincipal,
                        interest: cumulativeInterest,
                        total: cumulativePrincipal + cumulativeInterest
                    };
                });
            default:
                return amortizationSchedule.map(year => ({
                    year: `Year ${year.year}`,
                    principal: year.principalPaid,
                    interest: year.interestPaid
                }));
        }
    };

    // Render the appropriate chart based on the chart type
    const renderChart = () => {
        const data = getChartData();

        switch (chartType) {
            case 'bar':
                return (
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        {displayOption !== 'remaining-balance' && (
                            <Bar dataKey="principal" name="Principal" fill="#36A2EB" />
                        )}
                        {displayOption !== 'remaining-balance' && (
                            <Bar dataKey="interest" name="Interest" fill="#FF6384" />
                        )}
                        {displayOption === 'remaining-balance' && (
                            <Bar dataKey="balance" name="Remaining Balance" fill="#4BC0C0" />
                        )}
                        {displayOption === 'cumulative' && (
                            <Bar dataKey="total" name="Total Paid" fill="#FFCE56" />
                        )}
                    </BarChart>
                );

            case 'line':
                return (
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        {displayOption !== 'remaining-balance' && (
                            <Line type="monotone" dataKey="principal" name="Principal" stroke="#36A2EB" activeDot={{ r: 8 }} />
                        )}
                        {displayOption !== 'remaining-balance' && (
                            <Line type="monotone" dataKey="interest" name="Interest" stroke="#FF6384" />
                        )}
                        {displayOption === 'remaining-balance' && (
                            <Line type="monotone" dataKey="balance" name="Remaining Balance" stroke="#4BC0C0" />
                        )}
                        {displayOption === 'cumulative' && (
                            <Line type="monotone" dataKey="total" name="Total Paid" stroke="#FFCE56" />
                        )}
                    </LineChart>
                );

            case 'area':
                return (
                    <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        {displayOption !== 'remaining-balance' && (
                            <Area type="monotone" dataKey="principal" name="Principal" stackId="1" stroke="#36A2EB" fill="#36A2EB" />
                        )}
                        {displayOption !== 'remaining-balance' && (
                            <Area type="monotone" dataKey="interest" name="Interest" stackId="1" stroke="#FF6384" fill="#FF6384" />
                        )}
                        {displayOption === 'remaining-balance' && (
                            <Area type="monotone" dataKey="balance" name="Remaining Balance" stroke="#4BC0C0" fill="#4BC0C0" />
                        )}
                        {displayOption === 'cumulative' && (
                            <Area type="monotone" dataKey="total" name="Total Paid" stroke="#FFCE56" fill="#FFCE56" />
                        )}
                    </AreaChart>
                );

            default:
                return <></>;
        }
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography level="title-lg" sx={{ mb: 2 }}>
                    Amortization Schedule
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2, flexWrap: 'wrap' }}>
                    <FormControl size="sm">
                        <Select
                            value={displayOption}
                            onChange={(_, value) => value && setDisplayOption(value)}
                            placeholder="Display Options"
                        >
                            <Option value="yearly-payment">Yearly Payments</Option>
                            <Option value="remaining-balance">Remaining Balance</Option>
                            <Option value="cumulative">Cumulative Payments</Option>
                        </Select>
                    </FormControl>

                    <ToggleButtonGroup
                        value={chartType}
                        onChange={(_, value) => value && setChartType(value as ChartType)}
                        size="sm"
                    >
                        <IconButton value="bar" color="primary" variant={chartType === 'bar' ? 'solid' : 'soft'}>
                            <BarChart2 size={16} />
                        </IconButton>
                        <IconButton value="line" color="primary" variant={chartType === 'line' ? 'solid' : 'soft'}>
                            <LineChartIcon size={16} />
                        </IconButton>
                        <IconButton value="area" color="primary" variant={chartType === 'area' ? 'solid' : 'soft'}>
                            <PieChartIcon size={16} />
                        </IconButton>
                    </ToggleButtonGroup>
                </Box>

                <Box sx={{ height: 400, mb: 3, px: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart()}
                    </ResponsiveContainer>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography level="title-md" sx={{ mb: 2 }}>
                    Year-by-Year Breakdown
                </Typography>

                <Sheet variant="outlined" sx={{ height: '300px', overflow: 'auto' }}>
                    <Table stickyHeader hoverRow>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Year</th>
                                <th style={{ textAlign: 'center' }}>Principal</th>
                                <th style={{ textAlign: 'center' }}>Interest</th>
                                <th style={{ textAlign: 'center' }}>Total Payment</th>
                                <th style={{ textAlign: 'center' }}>Remaining Balance</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {amortizationSchedule.map((year) => (
                                <tr key={year.year}>
                                    <td>{year.year}</td>
                                    <td>{formatCurrency(year.principalPaid)}</td>
                                    <td>{formatCurrency(year.interestPaid)}</td>
                                    <td>{formatCurrency(year.totalPaid)}</td>
                                    <td>{formatCurrency(year.remainingBalance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
            </CardContent>
        </Card>
    );
};

export default AmortizationSchedule;