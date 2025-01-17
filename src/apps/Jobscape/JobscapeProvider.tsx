import React, { createContext, useContext, useEffect, useState } from 'react';
import JobscapeService from './helpers/job.service';
import { ApplicantResponse, IApplicant, IEmployer } from './helpers/job.types';
import { useAuth } from '../../auth/AuthProvider';

interface JobscapeContextType {
    profile: IApplicant | IEmployer | null;
    role: 'applicant' | 'employer' | null;
    isRegistered: boolean;
    profileId: string | null;
    fetchProfile: () => Promise<void>;

    profileService: JobscapeService;
    employerService: JobscapeService | null;
    applicantService: JobscapeService | null;
}

const JobscapeContext = createContext<JobscapeContextType | null>(null);

export const JobscapeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<IApplicant | IEmployer | null>(null);
    const [role, setRole] = useState<'applicant' | 'employer' | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [profileId, setProfileId] = useState<string | null>(null);
    const [employerService, setEmployerService] = useState<JobscapeService | null>(null);
    const [applicantService, setApplicantService] = useState<JobscapeService | null>(null);

    const { isLoggedIn } = useAuth();
    const profileService = new JobscapeService('profile');

    /** Fetch User Profile */
    const fetchProfile = async () => {
        try {
            const userProfile = await profileService.fetchUserProfile();
            if (userProfile) {
                setProfile(userProfile);
                setIsRegistered(true);

                const detectedRole = (userProfile as ApplicantResponse).preference ? 'applicant' : 'employer';
                setRole(detectedRole);
                setProfileId(userProfile.id);

                // Auto-generate role-specific service instances
                if (detectedRole === 'employer') {
                    setEmployerService(new JobscapeService('employer', userProfile.id));
                    setApplicantService(null);
                } else if (detectedRole === 'applicant') {
                    setApplicantService(new JobscapeService('applicant', userProfile.id));
                    setEmployerService(null);
                }
            } else {
                setIsRegistered(false);
                setEmployerService(null);
                setApplicantService(null);
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

    /** Auto-fetch profile if logged in */
    useEffect(() => {
        if (isLoggedIn) {
            fetchProfile();
        }
    }, [isLoggedIn]);

    return (
        <JobscapeContext.Provider
            value={{
                profile,
                role,
                isRegistered,
                profileId,
                fetchProfile,
                profileService, // ✅ Added this line
                employerService,
                applicantService,
            }}
        >
            {children}
        </JobscapeContext.Provider>
    );
};

export const useJobscape = () => {
    const context = useContext(JobscapeContext);
    if (!context) {
        throw new Error('useJobscape must be used within a JobscapeProvider');
    }
    return context;
};
