import { Stack, Input, Button, IconButton, ToggleButtonGroup } from '@mui/joy'
import { RectangleHorizontal, RectangleVertical, Search, Square } from 'lucide-react';
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
        <Stack direction='row' justifyContent='center' flexWrap='wrap' gap={1} sx={{ width: 1, maxWidth: 800, m: 'auto' }}>
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
                    <RectangleHorizontal />
                </IconButton>
                <IconButton value="portrait">
                    <RectangleVertical />
                </IconButton>
                <IconButton value="squarish">
                    <Square />
                </IconButton>
            </ToggleButtonGroup>

            <Button
                color='warning' variant='solid'
                onClick={() => { onSubmit(true) }}
                startDecorator={<Search />}
                loading={loading}
            >
                Search
            </Button>
        </Stack>
    )
}

export default SearchBar