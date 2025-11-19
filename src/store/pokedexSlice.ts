import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Region } from '../apps/Pokeverse/helpers/types';
import { REGIONS } from '../apps/Pokeverse/helpers/constants';

interface PokedexState {
    selectedRegion: Region;
    searchQuery: string;
    activeDetailTab: string;
}

const initialState: PokedexState = {
    selectedRegion: REGIONS[0],
    searchQuery: '',
    activeDetailTab: 'info',
};

const pokedexSlice = createSlice({
    name: 'pokedex',
    initialState,
    reducers: {
        setSelectedRegion: (state, action: PayloadAction<Region>) => {
            state.selectedRegion = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setActiveDetailTab: (state, action: PayloadAction<string>) => {
            state.activeDetailTab = action.payload;
        },
        resetPokedex: () => initialState,
    },
});

export const {
    setSelectedRegion,
    setSearchQuery,
    setActiveDetailTab,
    resetPokedex,
} = pokedexSlice.actions;

export default pokedexSlice.reducer;