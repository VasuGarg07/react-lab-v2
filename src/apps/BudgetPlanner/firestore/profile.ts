// helpers/firestore.ts
import { UserSettings } from '../helpers/types';
import { db } from '../../../shared/firebase-config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

/**
 * Get the user profile from Firestore
 * @param userId - The ID of the user
 * @returns The profile data
 */
export const getUserProfile = async (userId: string): Promise<UserSettings | null> => {
    const profileRef = doc(db, 'users', userId);
    const profileDoc = await getDoc(profileRef);

    if (profileDoc.exists()) {
        return profileDoc.data() as UserSettings;
    } else {
        return null;
    }
};

/**
 * Set the user profile in Firestore
 * @param userId - The ID of the user
 * @param profile - The profile data to set
 */
export const setUserProfile = async (userId: string, profile: UserSettings): Promise<void> => {
    const profileRef = doc(db, 'users', userId);
    await setDoc(profileRef, profile);
};
