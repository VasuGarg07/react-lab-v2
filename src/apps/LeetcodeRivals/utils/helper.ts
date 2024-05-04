
import axios from 'axios';
import { UserDetails, UserProfile, UserStats } from './interface';

export const fetchUserProfile = async (username: string): Promise<UserProfile> => {
    const url = `https://alfa-leetcode-api.onrender.co/${username}`;
    const response = await axios.get(url);
    return response.data
}

export const fetchUserStats = async (username: string): Promise<UserStats> => {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    const response = await axios.get(url);
    return response.data
}

// Function to fetch both user profile and stats
export const fetchUserDetails = async (username: string): Promise<UserDetails> => {
    try {
        const userProfilePromise = fetchUserProfile(username);
        const userStatsPromise = fetchUserStats(username);

        // Use Promise.all to wait for both promises to resolve
        const [userProfile, userStats] = await Promise.all([userProfilePromise, userStatsPromise]);

        // Return both results in a combined object
        return {
            profile: userProfile,
            stats: userStats
        };
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error; // Rethrow or handle as necessary
    }
}