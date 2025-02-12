import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import JobscapeService from './helpers/job.service';
import { ApplicantResponse, EmployerResponse, JobRoles } from './helpers/job.types';

interface JobscapeContextType {
    loading: boolean;
    profile: ApplicantResponse | EmployerResponse | null;
    role: JobRoles | null;
    isRegistered: boolean;
    profileId: string | null;
    fetchProfile: () => Promise<void>;
    updateProfile: (profile: ApplicantResponse | EmployerResponse) => void;

    profileService: JobscapeService;
    employerService: JobscapeService | null;
    applicantService: JobscapeService | null;
}

const JobscapeContext = createContext<JobscapeContextType | null>(null);

export const JobscapeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);

    const [profile, setProfile] = useState<ApplicantResponse | EmployerResponse | null>(null);
    const [role, setRole] = useState<JobRoles | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [profileId, setProfileId] = useState<string | null>(null);
    const [employerService, setEmployerService] = useState<JobscapeService | null>(null);
    const [applicantService, setApplicantService] = useState<JobscapeService | null>(null);

    const { isLoggedIn } = useAuth();
    const profileService = new JobscapeService('profile');

    const updateProfile = (profile: ApplicantResponse | EmployerResponse) => setProfile(profile);

    /** Fetch User Profile */
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { role, profile } = await profileService.fetchUserProfile();
            if (profile) {
                setProfile(profile);
                setIsRegistered(true);
                setRole(role);
                setProfileId(profile.id);

                if (role === 'employer') {
                    setEmployerService(new JobscapeService('employer', profile.id));
                    setApplicantService(null);
                } else if (role === 'applicant') {
                    setApplicantService(new JobscapeService('applicant', profile.id));
                    setEmployerService(null);
                }
            } else {
                setIsRegistered(false);
                setRole(null);
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            setIsRegistered(false);
            setRole(null);
        } finally {
            setLoading(false);
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
                loading,
                profile,
                role,
                isRegistered,
                profileId,
                fetchProfile,
                updateProfile,
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
