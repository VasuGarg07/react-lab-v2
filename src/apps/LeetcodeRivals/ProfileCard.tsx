import { Avatar, Card, CircularProgress, Grid, LinearProgress, Stack, Typography } from '@mui/joy';
import React from 'react';
import { UserStats } from './utils/interface';
import { Spacer } from '../../components/Spacer';

interface ProfileCardProps {
    username: string
    stats: UserStats,
}

const ProfileCard: React.FC<ProfileCardProps> = ({ stats, username }) => {
    return (
        <Card variant='outlined' sx={{ width: 1 }}>
            <Stack direction='row' spacing={1} alignItems='center'>
                <Avatar>{username.charAt(0)}</Avatar>
                <Typography level="title-md">{username}</Typography>
                <Spacer />
                <Typography level="title-sm" noWrap>Rank: {stats.ranking}</Typography>
            </Stack>
            <Grid container spacing={2}>
                <Grid xs={4} alignItems='center' justifyContent='center' display='flex'>
                    <CircularProgress size="lg" determinate value={(stats.totalSolved / stats.totalQuestions) * 100}>
                        {stats.totalSolved}
                    </CircularProgress>
                </Grid>
                <Grid xs={8}>
                    <Typography level='body-sm'>Easy: <Typography fontWeight='bold'>{stats.easySolved}</Typography>{' / '} {stats.totalEasy} </Typography>
                    <LinearProgress determinate size='lg' color='success' value={stats.easySolved * 100 / stats.totalEasy} />
                    <Typography level='body-sm'>Medium: <Typography fontWeight='bold'>{stats.mediumSolved}</Typography>{' / '} {stats.totalMedium} </Typography>
                    <LinearProgress determinate size='lg' color='warning' value={stats.mediumSolved * 100 / stats.totalMedium} />
                    <Typography level='body-sm'>Hard: <Typography fontWeight='bold'>{stats.hardSolved}</Typography>{' / '} {stats.totalHard} </Typography>
                    <LinearProgress determinate size='lg' color='danger' value={stats.hardSolved * 100 / stats.totalHard} />

                </Grid>
            </Grid>
        </Card>
    )
}

export default ProfileCard