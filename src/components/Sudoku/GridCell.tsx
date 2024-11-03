import React from 'react';
import { Box, Input } from '@mui/joy';

type GridCellProps = {
    cell: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editable: boolean;
};

const inputStyles = {
    width: 40,
    height: 40,
    textAlign: 'center',
    padding: 0,
    '& input[type=number]': {
        MozAppearance: 'textfield',
        textAlign: 'center',
        padding: 0,
    },
    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
};

const boxStyles = {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey.300',
    borderRadius: 'sm',
    textAlign: 'center',
    border: '1px solid',
};

export const GridCell = React.memo(({ cell, onChange, editable }: GridCellProps) => (
    editable ? (
        <Input
            type="number"
            value={cell === 0 ? '' : cell}
            onChange={onChange}
            sx={inputStyles}
        />
    ) : (
        <Box sx={boxStyles}>
            {cell}
        </Box>
    )
));

GridCell.displayName = 'GridCell';