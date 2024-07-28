import { Grid, Stack, Typography } from '@mui/joy'
import { ErrorMessage } from '../../components/ErrorMessage'
import SearchBar from './SearchBar'
import { useState } from 'react';
import { UserStats } from './utils/interface';
import { fetchUserStats } from './utils/helper';
import ProfileCard from './ProfileCard';

interface UserData {
    username: string, stats: UserStats
}

const LeetcodeRivals = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [users, setUsers] = useState<UserData[]>([]);

    const handleAddUser = async () => {
        if (!query) {
            setError('Please input your rival\'s username');
            return;
        }

        try {
            setLoading(true);

            // Find if user already added in array;
            const exists = users.some(user => user.username === query);
            if (exists) {
                setError("Rival has already been added");
            } else {
                setError('');
                const data = await fetchUserStats(query);
                const newUser = { username: query, stats: data };
                setUsers([...users, newUser].sort((a, b) => a.stats.ranking - b.stats.ranking))
            }

        } catch (error) {
            console.error(error)
            setError(`Unable to find your rival ${query}. Please verify their username`);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <Stack spacing={2} alignItems='center' sx={{ p: 2, width: 1, maxWidth: 1200, m: 'auto', minHeight: 'calc(100dvh - 54px)' }}>

                <Typography
                    fontFamily={'Kanit'}
                    letterSpacing={1.5}
                    level="h1"
                    children="LEETCODE RIVALS"
                />

                <SearchBar
                    loading={loading}
                    onSearchInput={setQuery}
                    onSubmit={handleAddUser}
                />

                {error && <ErrorMessage message={error} />}

                {/* TODO: User Avatar, User Details, Delete User */}
                <Grid container flexWrap='wrap' spacing={2} width={1}>
                    {users.map((user, index) => (
                        <Grid xs={4} key={index}>
                            <ProfileCard stats={user.stats} username={user.username} />
                        </Grid>
                    ))}
                </Grid>

            </Stack>
        </>
    )
}

export default LeetcodeRivals