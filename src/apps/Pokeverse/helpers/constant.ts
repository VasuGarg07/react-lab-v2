export const GRADIENTS = {
    red: { from: '#FF4B4B', to: '#FFB74B' },        // bright red to golden
    purple: { from: '#9747FF', to: '#FF7747' },     // purple to orange
    green: { from: '#47B247', to: '#B2FF47' },      // forest to lime
    blue: { from: '#4B83FF', to: '#4BFFB7' },       // royal blue to aqua
    pink: { from: '#FF47B2', to: '#FFE247' },       // hot pink to yellow
    orange: { from: '#FF8547', to: '#FFE247' },     // orange to light yellow
    teal: { from: '#47D4D4', to: '#47FF8F' },       // teal to mint
    magenta: { from: '#FF4B98', to: '#FFB54B' },    // magenta to gold
    lime: { from: '#7EFF4B', to: '#47D4FF' },       // lime to sky blue
    violet: { from: '#8A4BFF', to: '#FF4B4B' },     // violet to red
    coral: { from: '#FF6B4B', to: '#FFCD4B' },      // coral to amber
    crimson: { from: '#FF2D55', to: '#FF9F4B' },    // deep red to peach
    orchid: { from: '#B94BFF', to: '#FF4B94' },     // orchid to rose
    emerald: { from: '#4BFF8A', to: '#FFE14B' },    // emerald to yellow
    grape: { from: '#9F4BFF', to: '#FF4B77' },      // grape to salmon
    ruby: { from: '#FF1744', to: '#FFC107' },       // ruby to amber
    sunset: { from: '#FF8C00', to: '#FFD700' },     // deep orange to gold
    ocean: { from: '#0277BD', to: '#4FC3F7' }       // deep blue to light blue
} as const;

export type GradientKey = keyof typeof GRADIENTS;