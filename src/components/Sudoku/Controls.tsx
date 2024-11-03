import React from 'react';
import { Stack, Sheet, Typography, Divider, Button } from '@mui/joy';

type ControlsProps = {
    onNew: () => void;
    onHint: () => void;
    onSolve: () => void;
};

const controlStyles = {
    container: {
        my: 2,
        p: 1,
        borderRadius: 'md'
    }
};

export const Controls: React.FC<ControlsProps> = ({ onNew, onHint, onSolve }) => (
    <Stack
        component={Sheet}
        variant='outlined'
        direction='row'
        spacing={1}
        alignItems='center'
        sx={controlStyles.container}
    >
        <Typography level="h4" component="h1" gutterBottom>
            Sudoku Solver
        </Typography>
        <Divider orientation='vertical' />
        <Button size='sm' onClick={onNew}>New</Button>
        <Button size='sm' color="warning" onClick={onHint}>Hint</Button>
        <Button size='sm' color='success' onClick={onSolve}>Solve</Button>
    </Stack>
);