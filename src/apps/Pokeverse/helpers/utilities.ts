export namespace PokedexUtils {
    // Helper function to convert hex to RGB
    const hexToRGB = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    };

    // Helper function to convert RGB to hex
    const rgbToHex = (r: number, g: number, b: number) => {
        return '#' + [r, g, b]
            .map(x => Math.round(x).toString(16).padStart(2, '0'))
            .join('');
    };

    // Function to get complementary color
    export const getComplementaryColor = (hex: string) => {
        const { r, g, b } = hexToRGB(hex);
        return rgbToHex(255 - r, 255 - g, 255 - b);
    };

    // Function to get a softer version of the complementary color
    export const getSoftComplementaryColor = (hex: string) => {
        const { r, g, b } = hexToRGB(hex);
        // Mix with white to soften
        const softenFactor = 0.7; // Adjust this to control how soft the complement is
        return rgbToHex(
            255 - (255 - r) * softenFactor,
            255 - (255 - g) * softenFactor,
            255 - (255 - b) * softenFactor
        );
    };
}