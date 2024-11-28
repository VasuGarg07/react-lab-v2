# Pokédex Application

This project is a comprehensive Pokédex built using React and PokéAPI. It allows users to explore Pokémon data interactively.

## Features

### 1. **Search Pokémon**
- Users can search for a specific Pokémon by name or ID.

### 2. **List Pokémon by Generation**
- Pokémon can be filtered and displayed by their generation (e.g., Gen I, Gen II).

### 3. **List Pokémon by Type**
- Pokémon can be filtered and displayed by their primary or secondary type (e.g., Grass, Fire).

---

## Pokémon Details

### 1. **Pokédex Data**
- **National Dex No.**: The National Pokédex number.
- **Type**: Primary and secondary types.
- **Species**: Pokémon's species designation.
- **Height**: Pokémon's height.
- **Weight**: Pokémon's weight.
- **Abilities**: A list of abilities with brief descriptions.

### 2. **Stats**
- Display base stats (HP, Attack, Defense, Special Attack, Special Defense, and Speed).
- Include total base stats for easy comparison.

### 3. **Effectiveness on Other Types**
- Display a type-effectiveness chart showing:
  - Strengths (e.g., Grass is strong against Water).
  - Weaknesses (e.g., Grass is weak to Fire).
  - Immunities (e.g., Ground is immune to Electric).

### 4. **Evolution Chart**
- Display the complete evolution chain of the Pokémon.
- Include conditions for evolution (e.g., level, item, trade).

### 5. **Moves**
- List all moves the Pokémon can learn, categorized by:
  - **Level-Up**: Moves learned by leveling up.
  - **TM/HM/Move Tutor**: Moves learned via technical or hidden machines.
  - **Egg Moves**: Moves learned through breeding.
- Include detailed information for each move:
  - Power, accuracy, and PP.
  - Description of the move's effect.

### 6. **Images and Cries**
- Display high-quality images for the Pokémon.
- Play the Pokémon’s cry on interaction (e.g., hover or click).

---

## API Endpoints Used

### Pokémon Data
- `/pokemon/{id or name}`: To fetch general Pokémon data including stats, types, and abilities.

### Pokémon Species
- `/pokemon-species/{id or name}`: To get species-level data including evolution chain and flavor text.

### Evolution Chain
- `/evolution-chain/{id}`: To retrieve detailed evolution information.

### Types
- `/type/{id or name}`: For type-effectiveness calculations.

### Moves
- `/move/{id or name}`: To get detailed information on moves.

### Generations
- `/generation/{id or name}`: To filter Pokémon by generation.

---

## Project Structure

### Components
1. **SearchBar**: For searching Pokémon.
2. **PokemonList**: To display lists of Pokémon.
3. **PokemonDetails**: To show detailed information for a specific Pokémon.
4. **TypeChart**: For type-effectiveness chart.
5. **EvolutionChain**: To display the evolution chart.
6. **MoveList**: To display the list of moves.

### Pages
1. **Home Page**: Displays options to filter Pokémon by generation or type.
2. **Details Page**: Shows detailed information about a specific Pokémon.

---

## Design Considerations
- **Responsive Design**: Ensure the UI is mobile-friendly.
- **Caching**: Use caching to minimize API calls for frequently accessed data.
- **Loading States**: Add loading indicators for API calls.
- **Error Handling**: Handle API errors gracefully and show appropriate messages.

---

## Future Enhancements
- Add localization for Pokémon names and descriptions.
- Include shiny versions of Pokémon.
- Allow users to favorite Pokémon and save their list.
- Implement pagination for large lists.

---

## References
- [PokéAPI Documentation](https://pokeapi.co/docs/v2)
