import { Stack, Input, Button, IconButton, ToggleButtonGroup } from '@mui/joy'
import { MatIcon } from '../../components/Utils';
import React from 'react';

interface SearchBarProps {
    loading: boolean,
    value: string | null,
    onSearchInput: React.Dispatch<React.SetStateAction<string>>,
    onToggleChange: React.Dispatch<React.SetStateAction<string | null>>
    onSubmit: (reset?: boolean) => Promise<void>
}

const SearchBar: React.FC<SearchBarProps> = ({ loading, value, onSearchInput, onSubmit, onToggleChange }) => {
    return (
        <Stack direction='row' justifyContent='center' flexWrap='wrap' gap={1} sx={{ width: 1, maxWidth: 800 }}>
            <Input
                placeholder="Search Images from unsplash"
                variant="outlined"
                color='neutral'
                onChange={(e) => onSearchInput(e.target.value)}
                sx={{ flexGrow: 1 }}
                disabled={loading}
            />

            <ToggleButtonGroup
                variant="outlined"
                value={value}
                onChange={(_, newValue) => {
                    onToggleChange(newValue);
                }}
            >
                <Button value=''>All</Button>
                <IconButton value="landscape">
                    <MatIcon icon="crop_landscape" outlined />
                </IconButton>
                <IconButton value="portrait">
                    <MatIcon icon="crop_portrait" outlined />
                </IconButton>
                <IconButton value="squarish">
                    <MatIcon icon="crop_square" outlined />
                </IconButton>
            </ToggleButtonGroup>

            <Button
                color='warning' variant='solid'
                onClick={() => { onSubmit(true) }}
                startDecorator={<MatIcon icon="search" />}
                loading={loading}
            >
                Search
            </Button>
        </Stack>
    )
}

export default SearchBar