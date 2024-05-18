import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// Define the hook's return type
interface UseAxiosReturn<T> {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
}

// Define the generic hook function
function useAxios<T>(url: string, options?: AxiosRequestConfig): UseAxiosReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        // Reset states when URL or options change
        setData(null);
        setLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const response = await axios(url, options);
                setData(response.data); // Set the data received from the API
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error); // Set the error if one occurs during the API call
                } else {
                    setError(new AxiosError('An unexpected error occurred'));
                }
            } finally {
                setLoading(false); // Ensure loading is false after the operation completes
            }
        };

        fetchData();
    }, [url, options]); // Dependency array includes URL and options to refetch data when they change

    return { data, loading, error };
}

export default useAxios;
