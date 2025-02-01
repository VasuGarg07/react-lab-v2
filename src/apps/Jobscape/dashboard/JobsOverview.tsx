import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import { styled } from '@mui/joy/styles';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { Archive, CheckCircle, Clock, MoreVertical, Pencil, Star, Trash2, Users } from 'lucide-react';
import React from 'react';
import { formatString } from '../../../shared/utilities';
import { JobResponse, JobRoles } from '../helpers/job.types';
import { useJobscape } from '../JobscapeProvider';
import { useAlert } from '../../../shared/AlertProvider';
import { AxiosError } from 'axios';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/joy/Stack';

const StyledTable = styled(Table)({
    '& thead th': {
        backgroundColor: 'var(--joy-palette-background-level2)',
        fontWeight: 'bold',
    },
    '& tbody tr:hover': {
        backgroundColor: 'var(--joy-palette-background-level1)',
        transition: 'all 0.2s ease',
    },
    // Apply width and alignment to table cells
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

interface JobsOverviewProps {
    role: JobRoles | null;
    jobs: JobResponse[]
}

const JobsOverview: React.FC<JobsOverviewProps> = ({ jobs, role }) => {

    const { employerService, applicantService } = useJobscape();
    const { alert } = useAlert();
    const navigate = useNavigate();

    const handleArchive = async (jobId: string, archive: boolean) => {
        try {
            await employerService!.archiveJob(jobId, archive);
            alert(`Job ${archive ? 'A' : 'Una'}rchived`, 'success');
        } catch (error) {
            console.error(error);
            let errorMessage = "Something Went Wrong. Please try again later."
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.error;
            }
            alert(errorMessage, 'danger');
        }
    }

    const handleDelete = async (jobId: string) => {
        try {
            await employerService!.deleteJob(jobId);
            alert("Job deleted successfully", 'primary');
        } catch (error) {
            console.error(error);
            let errorMessage = "Something Went Wrong. Please try again later."
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.error;
            }
            alert(errorMessage, 'danger');
        }
    }

    const handleEdit = (jobId: string) => navigate(`/jobscape/employer/edit/${jobId}`)

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

    const handleApplyJob = async (job: JobResponse) => {
        try {
            await applicantService!.applyForJob(job.id);
            alert("Applied", 'success')
        } catch (error) {
            console.error(error);
            let errorMessage = "Something Went Wrong. Please try again later."
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.error;
            }
            alert(errorMessage, 'danger');
        }
    }

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
                            <tr key={job.id} className={job.isFeatured ? "featured-job" : ''}>
                                <td>
                                    <Stack spacing={0.5}>
                                        <Stack direction='row' spacing={0.5} alignItems='center'>
                                            {job.isFeatured && <Star size={16} color='#F6BA00' />}
                                            <Typography level="title-sm" overflow='hidden' textOverflow='ellipsis'>{job.title}</Typography>
                                        </Stack>
                                        <Typography level="body-xs" sx={{ display: 'flex', gap: 1, color: 'neutral.400' }}>
                                            {formatString(job.jobLevel)} • {' '}
                                            {formatString(job.employmentType)}
                                        </Typography>
                                    </Stack>
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
                                    {role === 'employer' ? (
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                size="sm"
                                                variant="soft"
                                                color="primary"
                                            >
                                                View Applications
                                            </Button>
                                            <JobMenu
                                                job={job}
                                                handleArchive={handleArchive}
                                                handleDelete={handleDelete}
                                                handleEdit={handleEdit}
                                            />
                                        </Box>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="soft"
                                            color="primary"
                                            onClick={() => handleApplyJob(job)}
                                        >
                                            Apply
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </StyledTable>
        </Sheet>
    );
};

export default JobsOverview;

interface JobMenuProps {
    job: JobResponse;
    handleArchive: (jobId: string, archive: boolean) => Promise<void>;
    handleDelete: (jobId: string) => Promise<void>;
    handleEdit: (jobId: string) => void;
}

const JobMenu: React.FC<JobMenuProps> = ({ job, handleArchive, handleDelete, handleEdit }) => {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreVertical size={16} />
            </MenuButton>
            <Menu
                placement="bottom-end"
                size="sm"
                sx={{
                    minWidth: 120,
                    '--ListItemDecorator-size': '24px'
                }}
            >
                <MenuItem onClick={() => handleEdit(job.id)}>
                    <Pencil size={16} />
                    <Typography level="body-sm" sx={{ ml: 1 }}>Edit</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => handleArchive(job.id, !job.isArchived)}
                >
                    <Archive size={16} />
                    <Typography level="body-sm" sx={{ ml: 1 }}>
                        {job.isArchived ? 'Unarchive' : 'Archive'}
                    </Typography>
                </MenuItem>
                <MenuItem color='danger' onClick={() => handleDelete(job.id)}>
                    <Trash2 size={16} />
                    <Typography level="body-sm" sx={{ ml: 1 }}>Delete</Typography>
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}