import { Pokemon } from "@/apps/Pokeverse/helpers/model.types";
import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router";

interface PokedexContextType {
    pokemons: Record<number, Pokemon>; // Stores Pokémon objects keyed by ID
    addPokemon: (pokemon: Pokemon) => void;
    getPokemonById: (id: number) => Pokemon | null; // Retrieves a Pokémon by ID
}

const PokedexContext = createContext<PokedexContextType | null>(null);

export const PokedexProvider: React.FC = () => {
    const [pokemons, setPokemons] = useState<Record<number, Pokemon>>({});

    // Adds a new Pokémon or retrieves an existing one
    const addPokemon = (pokemon: Pokemon) => {
        setPokemons((prev) => ({ ...prev, [pokemon.id]: { ...prev[pokemon.id], ...pokemon } }));
    };

    // Retrieves a Pokémon by its ID
    const getPokemonById = (id: number): Pokemon | null => {
        return pokemons[id] || null;
    };

    return (
        <PokedexContext.Provider value={{ pokemons, addPokemon, getPokemonById }}>
            <Outlet />
        </PokedexContext.Provider>
    );
};

// Hook to access the Pokedex context
export const usePokedex = () => {
    const context = useContext(PokedexContext);
    if (!context) {
        throw new Error("usePokedex must be used within a PokedexProvider");
    }
    return context;
};
