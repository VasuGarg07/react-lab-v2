import { Button, Input, Stack } from '@mui/joy';
import React from 'react';
import { MatIcon } from '../../components/Utils';

interface SearchBarProps {
    loading: boolean,
    onSearchInput: React.Dispatch<React.SetStateAction<string>>,
    onSubmit: () => Promise<void>
}

const SearchBar: React.FC<SearchBarProps> = ({ loading, onSearchInput, onSubmit }) => {
    return (
        <Stack direction='row' justifyContent='center' flexWrap='wrap' gap={1} sx={{ width: 1, maxWidth: 800 }}>
            <Input
                placeholder="Add Rival"
                variant="outlined"
                color='neutral'
                onChange={(e) => onSearchInput(e.target.value)}
                sx={{ flexGrow: 1 }}
                disabled={loading}
            />

            <Button
                color='success' variant='solid'
                onClick={onSubmit}
                startDecorator={<MatIcon icon="search" />}
                loading={loading}
            >
                Search
            </Button>
        </Stack>
    )
}

export default SearchBar