import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface CacheData<T> {
    data: T;
    timestamp: number;
}

interface UseAxiosOptions extends Omit<AxiosRequestConfig, 'url'> {
    cacheTime?: number;  // Cache duration in milliseconds
}

const cache = new Map<string, CacheData<any>>();
const DEFAULT_CACHE_TIME = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100; // Maximum number of entries

function useCacheApi<T>(url: string, options: UseAxiosOptions = {}) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const { cacheTime = DEFAULT_CACHE_TIME, ...axiosConfig } = options;

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Check cache first
            const cachedData = cache.get(url);
            if (cachedData && Date.now() - cachedData.timestamp < cacheTime) {
                setData(cachedData.data);
                setLoading(false);
                return;
            }

            const response = await axios(url, axiosConfig);

            // If cache is at max size, remove oldest entry
            if (cache.size >= MAX_CACHE_SIZE) {
                const firstKey = cache.keys().next().value;
                firstKey && cache.delete(firstKey);
            }

            // Update cache
            cache.set(url, {
                data: response.data,
                timestamp: Date.now()
            });

            setData(response.data);
        } catch (err) {
            const error = err as AxiosError;
            setError(new Error(error.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
}

export default useCacheApi;