# Pokémon Battle Simulator Development Guide

## Table of Contents
- [Overview](#overview)
- [Data Structures](#data-structures)
- [Components Architecture](#components-architecture)
- [Battle Mechanics](#battle-mechanics)
- [Implementation Guide](#implementation-guide)
- [API Integration](#api-integration)

## Overview

### Project Scope
Creating a Pokémon battle simulator using PokéAPI that allows:
- Two players to battle
- Team selection (6 Pokémon each)
- Turn-based combat
- Move selection and damage calculation
- Type effectiveness
- Level 100 stat calculation

### Tech Stack
- React + TypeScript
- PokéAPI
- Framer Motion (animations)
- Joy UI (components)

## Data Structures

### Core Interfaces

```typescript
interface BattlePokemon extends Pokemon {
  level: number;
  currentHP: number;
  maxHP: number;
  selectedMoves: Move[];
  calculatedStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  status?: StatusCondition;
  volatileStatus: VolatileStatus[];
}

interface BattlePlayer {
  name: string;
  team: BattlePokemon[];
  activePokemon: number;
  isReady: boolean;
}

interface BattleState {
  turn: number;
  weather?: Weather;
  field?: FieldEffect[];
  lastMove?: Move;
  isActive: boolean;
  winner?: string;
}

interface Move {
  id: number;
  name: string;
  type: string;
  power?: number;
  accuracy?: number;
  pp: number;
  currentPp: number;
  category: 'Physical' | 'Special' | 'Status';
  priority: number;
  effects?: MoveEffect[];
}
```

## Components Architecture

### 1. Battle Setup Flow

```
BattleSetup/
├── PlayerRegistration.tsx
├── TeamSelection/
│   ├── PokemonGrid.tsx
│   ├── PokemonCard.tsx
│   ├── SelectedTeam.tsx
│   └── TeamConfirmation.tsx
└── BattleInitialization.tsx
```

### 2. Battle Interface

```
BattleInterface/
├── BattleField/
│   ├── PokemonSprite.tsx
│   ├── HealthBar.tsx
│   ├── StatusIndicator.tsx
│   └── WeatherAnimation.tsx
├── BattleControls/
│   ├── MoveSelection.tsx
│   ├── SwitchPokemon.tsx
│   └── BattleLog.tsx
└── BattleStats/
    ├── TeamPreview.tsx
    └── EffectDisplay.tsx
```

## Battle Mechanics

### 1. Stats Calculation

```typescript
const calculateStats = (pokemon: Pokemon, level: number = 100): CalculatedStats => {
  return {
    hp: calculateHP(pokemon.stats[0].base_stat, level),
    attack: calculateOtherStat(pokemon.stats[1].base_stat, level),
    defense: calculateOtherStat(pokemon.stats[2].base_stat, level),
    specialAttack: calculateOtherStat(pokemon.stats[3].base_stat, level),
    specialDefense: calculateOtherStat(pokemon.stats[4].base_stat, level),
    speed: calculateOtherStat(pokemon.stats[5].base_stat, level)
  };
};
```

### 2. Damage Calculation

```typescript
const calculateDamage = (
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move,
  weather: Weather
): number => {
  // Base damage
  const baseDamage = ((2 * attacker.level) / 5 + 2) * move.power;
  
  // Attack/Defense ratio
  const atkDefRatio = move.category === 'Physical' 
    ? attacker.calculatedStats.attack / defender.calculatedStats.defense
    : attacker.calculatedStats.specialAttack / defender.calculatedStats.specialDefense;
  
  // Modifiers
  const stab = attacker.types.includes(move.type) ? 1.5 : 1;
  const typeEffectiveness = calculateTypeEffectiveness(move.type, defender.types);
  const weatherModifier = calculateWeatherModifier(move.type, weather);
  
  return Math.floor((baseDamage * atkDefRatio / 50 + 2) * stab * typeEffectiveness * weatherModifier);
};
```

## Implementation Guide

### 1. Battle Setup Phase

```typescript
// Battle Context
interface BattleContextType {
  battleState: BattleState;
  players: [BattlePlayer, BattlePlayer];
  dispatch: (action: BattleAction) => void;
}

// Battle Actions
type BattleAction =
  | { type: 'SELECT_MOVE'; playerId: number; moveIndex: number }
  | { type: 'SWITCH_POKEMON'; playerId: number; pokemonIndex: number }
  | { type: 'APPLY_DAMAGE'; targetId: number; amount: number }
  | { type: 'END_TURN' };
```

### 2. Battle Flow

```typescript
const executeTurn = async (
  player1Action: BattleAction,
  player2Action: BattleAction,
  battleState: BattleState
): Promise<BattleState> => {
  const actions = determineTurnOrder(player1Action, player2Action, battleState);
  
  for (const action of actions) {
    await executeAction(action, battleState);
    await checkWinCondition(battleState);
  }
  
  return applyEndTurnEffects(battleState);
};
```

### 3. Move Selection Logic

```typescript
const selectIntelligentMoves = (pokemon: Pokemon, allMoves: Move[]): Move[] => {
  const moves: Move[] = [];
  const pokemonTypes = new Set(pokemon.types);
  
  // Ensure at least one STAB move
  const stabMoves = allMoves.filter(move => pokemonTypes.has(move.type));
  if (stabMoves.length) moves.push(selectBestMove(stabMoves));
  
  // Add coverage move
  const coverageMoves = allMoves.filter(move => !pokemonTypes.has(move.type));
  if (coverageMoves.length) moves.push(selectBestMove(coverageMoves));
  
  // Add status move
  const statusMoves = allMoves.filter(move => move.category === 'Status');
  if (statusMoves.length) moves.push(selectBestMove(statusMoves));
  
  // Fill remaining slots with strong moves
  while (moves.length < 4) {
    const remainingMoves = allMoves.filter(move => !moves.includes(move));
    if (!remainingMoves.length) break;
    moves.push(selectBestMove(remainingMoves));
  }
  
  return moves;
};
```

## API Integration

### Required Endpoints

1. Base Pokémon Data:
```typescript
const fetchPokemonData = async (id: number): Promise<Pokemon> => {
  const [pokemon, species] = await Promise.all([
    fetch(`${BASE_API}/pokemon/${id}`),
    fetch(`${BASE_API}/pokemon-species/${id}`)
  ]);
  
  return processRawPokemonData(pokemon, species);
};
```

2. Move Data:
```typescript
const fetchMoveData = async (moveUrl: string): Promise<Move> => {
  const response = await fetch(moveUrl);
  const data = await response.json();
  
  return processMoveData(data);
};
```

3. Type Effectiveness:
```typescript
const fetchTypeEffectiveness = async (): Promise<TypeChart> => {
  const types = await Promise.all(
    TYPE_LIST.map(type => fetch(`${BASE_API}/type/${type}`))
  );
  
  return processTypeChart(types);
};
```