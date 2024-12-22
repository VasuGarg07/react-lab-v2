import {
    IconButton,
    Sheet,
    styled,
    Table,
    Typography
} from '@mui/joy';
import { ArrowDownCircle, ArrowUpCircle, Edit2, Trash2 } from 'lucide-react';
import React from 'react';
import { useBudget } from '../BudgetContext';
import { formatDate, Transaction } from '../helpers/constants';

interface TransactionTableProps {
    transactions: Transaction[];
}

const columnConfig = {
    title: { width: '20%', align: 'left' as const },
    amount: { width: '11%', align: 'right' as const },
    type: { width: '6%', align: 'center' as const },
    category: { width: '16%', align: 'left' as const },
    date: { width: '12%', align: 'center' as const },
    description: { width: '24%', align: 'left' as const },
    actions: { width: '11%', align: 'center' as const },
};

// Styled components
const StyledTable = styled(Table)({
    '& thead th': {
        backgroundColor: 'var(--joy-palette-background-level2)',
        fontWeight: 'bold',
    },
    '& tbody tr:nth-of-type(odd)': {
        backgroundColor: 'var(--joy-palette-background-level1)',
    },
    '& tbody tr:hover': {
        backgroundColor: 'var(--joy-palette-background-level2)',
        transition: 'background-color 0.2s ease',
    },
    // Apply width and alignment to table cells
    '& th, & td': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
});

const AmountText = styled(Typography)<{ type: 'income' | 'expense' }>(({ type }) => ({
    color: type === 'income' ? 'var(--joy-palette-success-500)' : 'var(--joy-palette-danger-500)',
}));


const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {

    const { deleteTransaction, handleEditTransaction } = useBudget();

    const onDelete = (id?: string) => {
        if (!id) return;
        try {
            deleteTransaction(id);
        } catch (error) {

        }
    }

    return (
        <Sheet variant="outlined" sx={{ borderRadius: 'md', overflow: 'auto' }}>
            <StyledTable
                borderAxis="bothBetween"
                stickyHeader
                hoverRow
                sx={{
                    '--Table-headerUnderlineThickness': '1px',
                    '--TableCell-paddingX': '12px',
                    '--TableCell-paddingY': '8px',
                    tableLayout: 'fixed',
                    minWidth: '900px', // Prevent table from becoming too narrow
                }}
            >
                <thead>
                    <tr>
                        <th style={{ width: columnConfig.title.width, textAlign: columnConfig.title.align }}>Title</th>
                        <th style={{ width: columnConfig.amount.width, textAlign: columnConfig.amount.align }}>Amount</th>
                        <th style={{ width: columnConfig.type.width, textAlign: columnConfig.type.align }}>Type</th>
                        <th style={{ width: columnConfig.category.width, textAlign: columnConfig.category.align }}>Category</th>
                        <th style={{ width: columnConfig.date.width, textAlign: columnConfig.date.align }}>Date</th>
                        <th style={{ width: columnConfig.description.width, textAlign: columnConfig.description.align }}>Description</th>
                        <th style={{ width: columnConfig.actions.width, textAlign: columnConfig.actions.align }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td style={{ textAlign: columnConfig.title.align }}>
                                <Typography
                                    level="body-sm"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {transaction.title}
                                </Typography>
                            </td>
                            <td style={{ textAlign: columnConfig.amount.align }}>
                                <AmountText level="body-sm" type={transaction.type}>
                                    ₹ {Math.abs(transaction.amount).toFixed(2)}
                                </AmountText>
                            </td>
                            <td style={{ textAlign: columnConfig.type.align }}>
                                {transaction.type === 'income' ? (
                                    <ArrowUpCircle size={20} color="var(--joy-palette-success-500)" />
                                ) : (
                                    <ArrowDownCircle size={20} color="var(--joy-palette-danger-500)" />
                                )}
                            </td>
                            <td style={{ textAlign: columnConfig.category.align }}>
                                <Typography
                                    level="body-sm"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {transaction.category}
                                </Typography>
                            </td>
                            <td style={{ textAlign: columnConfig.date.align }}>
                                <Typography level="body-sm">
                                    {formatDate(transaction.date)}
                                </Typography>
                            </td>
                            <td style={{ textAlign: columnConfig.description.align }}>
                                <Typography
                                    level="body-sm"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {transaction.description || '- NA -'}
                                </Typography>
                            </td>
                            <td style={{ textAlign: columnConfig.actions.align }}>
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                    onClick={() => handleEditTransaction(transaction)}
                                    sx={{ mr: 1 }}
                                >
                                    <Edit2 size={18} />
                                </IconButton>
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="danger"
                                    onClick={() => onDelete(transaction.id)}
                                >
                                    <Trash2 size={18} />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </Sheet>
    );

};

export default TransactionTable;