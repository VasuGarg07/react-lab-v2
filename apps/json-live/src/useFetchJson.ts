import { useState } from 'react';

interface FetchJsonResult {
    isLoading: boolean;
    error: string | null;
    fetchJson: (url: string) => Promise<string | null>;
    clearError: () => void;
}

export const useFetchJson = (): FetchJsonResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchJson = async (url: string): Promise<string | null> => {
        if (!url.trim()) {
            setError('Please enter a valid URL');
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' },
                signal: AbortSignal.timeout(10000),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.text();

            try {
                JSON.parse(data);
                return data;
            } catch {
                setError('Response is not valid JSON');
                return null;
            }
        } catch (err) {
            if (err instanceof Error) {
                if (err.name === 'TimeoutError') {
                    setError('Request timeout. Please try again.');
                } else if (err.message.includes('Failed to fetch')) {
                    setError('Network error. Please check your connection and CORS settings.');
                } else {
                    setError(err.message);
                }
            } else {
                setError('An unexpected error occurred');
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, fetchJson, clearError: () => setError(null) };
};
