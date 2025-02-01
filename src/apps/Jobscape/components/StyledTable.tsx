import { styled } from '@mui/joy/styles';
import Table from '@mui/joy/Table';

const StyledTable = styled(Table)({
    '& thead th': {
        backgroundColor: 'var(--joy-palette-background-level2)',
        fontWeight: 'bold',
    },
    '& tbody tr:hover': {
        backgroundColor: 'var(--joy-palette-background-level1)',
        transition: 'all 0.2s ease',
    },
    '& th, & td': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    '& .featured-job': {
        background: 'linear-gradient(to right, #F6BA001d 0%, rgba(246, 186, 0, 0) 100%)',
    },
    '& .featured-job:hover': {
        background: '#F6BA002A',
        transition: 'background-color 0.2s ease',
        boxShadow: 'none'
    },
});


export default StyledTable