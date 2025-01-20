import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import { styled } from '@mui/joy/styles';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { CheckCircle, Clock, MoreVertical, Users } from 'lucide-react';
import React from 'react';
import { formatString } from '../../../shared/utilities';
import { JobResponse } from '../helpers/job.types';

const StyledTable = styled(Table)({
    '& thead th': {
        backgroundColor: 'var(--joy-palette-background-level2)',
        fontWeight: 'bold',
    },
    '& tbody tr:hover': {
        backgroundColor: 'var(--joy-palette-background-level1)',
        transition: 'background-color 0.2s ease',
        boxShadow: '0 0 4px var(--joy-palette-background-level2) inset'
    },
    // Apply width and alignment to table cells
    '& th, & td': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
});

interface JobsOverviewProps {
    jobs: JobResponse[]
}

const JobsOverview: React.FC<JobsOverviewProps> = ({ jobs }) => {

    const getStatusChip = (job: JobResponse) => {
        return (
            <Chip
                variant="soft"
                color={job.isArchived ? 'danger' : 'success'}
                startDecorator={job.isArchived
                    ? <Clock size={16} />
                    : <CheckCircle size={16} />
                }
                size="sm"
            >
                {job.isArchived ? 'Expired' : 'Active'}
            </Chip>
        );
    };

    return (
        <Sheet sx={{ background: 'transparent' }}>
            <StyledTable hoverRow>
                <thead>
                    <tr>
                        <th style={{ width: '30%', borderRadius: '4px 0 0 4px' }}> JOBS </th>
                        <th style={{ width: '20%' }}> STATUS </th>
                        <th style={{ width: '20%' }}> EXP. REQUIRED </th>
                        <th style={{ width: '30%', borderRadius: '0 4px 4px 0' }}> ACTIONS </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        jobs.map((job) => (
                            <tr key={job.id}>
                                <td>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Typography level="title-sm" > {job.title} </Typography>
                                        <Typography level="body-xs" sx={{ display: 'flex', gap: 1, color: 'neutral.400' }}>
                                            {formatString(job.jobLevel)} • {' '}
                                            {formatString(job.employmentType)}
                                        </Typography>
                                    </Box>
                                </td>
                                <td> {getStatusChip(job)} </td>
                                <td>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Users size={16} />
                                        < Typography level="body-sm" >
                                            {job.experienceRequired}
                                        </Typography>
                                    </Box>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            size="sm"
                                            variant="soft"
                                            color="primary"
                                        >
                                            View Applications
                                        </Button>
                                        < IconButton
                                            size="sm"
                                            variant="plain"
                                            color="neutral"
                                        >
                                            <MoreVertical size={16} />
                                        </IconButton>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </StyledTable>
        </Sheet>
    );
};

export default JobsOverview