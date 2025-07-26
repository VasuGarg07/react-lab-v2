export const formatString = (input: string) => input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};


export function getComplementaryColor(hex: string): string {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the hex string into its three components
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate the complement for each color component
    const rComplement = (255 - r).toString(16).padStart(2, '0');
    const gComplement = (255 - g).toString(16).padStart(2, '0');
    const bComplement = (255 - b).toString(16).padStart(2, '0');

    // Combine the complements to get the complementary color
    return `#${rComplement}${gComplement}${bComplement}`;
}


export enum GameState {
    Setup = 'setup',
    Playing = 'playing',
    Gameover = 'gameover'
}

export enum GameMode {
    Easy = 'easy',
    Medium = 'medium',
    Difficult = 'difficult'
}

export function shuffleArray<T>(array: T[]): T[] {
    const result = [...array]; // create a shallow copy to avoid mutating the original
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
};
