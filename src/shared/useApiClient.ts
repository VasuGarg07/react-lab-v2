import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';

// Generic type for any service function that returns a Promise
type ServiceFunction<T, P extends any[]> = (...args: P) => Promise<T>;

interface UseServiceReturn<T, P extends any[]> {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
    refetch: (...args: P) => Promise<void>;
}

export function useApiClient<T, P extends any[]>(
    serviceFunction: ServiceFunction<T, P>,
    initialArgs?: P,
    immediate = true
): UseServiceReturn<T, P> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(immediate);
    const [error, setError] = useState<AxiosError | null>(null);

    const fetchData = useCallback(async (...args: P) => {
        setLoading(true);
        setError(null);

        try {
            const result = await serviceFunction(...args);
            setData(result);
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err);
            } else {
                setError(new AxiosError('An unexpected error occurred'));
            }
        } finally {
            setLoading(false);
        }
    }, [serviceFunction]);

    useEffect(() => {
        if (immediate && initialArgs) {
            fetchData(...initialArgs);
        }
    }, [immediate, fetchData]);

    return { data, loading, error, refetch: fetchData };
}