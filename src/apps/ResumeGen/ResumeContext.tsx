import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ResumeModel, ContactInfo, TechnicalSkill, WorkExperience, Education, Project, Achievement } from './helpers/interfaces';
import { INITIAL_RESUME } from './helpers/constants';

interface ResumeState {
    resume: ResumeModel;
    isDirty: boolean;
}

interface ResumeContextType {
    state: ResumeState;
    dispatch: React.Dispatch<ResumeAction>;
}

type ResumeAction =
    | { type: 'UPDATE_CONTACT_INFO'; payload: Partial<ContactInfo> }
    | { type: 'UPDATE_PROFILE'; payload: string }
    | { type: 'ADD_SKILL'; payload: TechnicalSkill }
    | { type: 'UPDATE_SKILL'; payload: { index: number; skill: Partial<TechnicalSkill> } }
    | { type: 'REMOVE_SKILL'; payload: number }
    | { type: 'ADD_WORK_EXPERIENCE'; payload: WorkExperience }
    | { type: 'UPDATE_WORK_EXPERIENCE'; payload: { index: number; experience: Partial<WorkExperience> } }
    | { type: 'REMOVE_WORK_EXPERIENCE'; payload: number }
    | { type: 'ADD_EDUCATION'; payload: Education }
    | { type: 'UPDATE_EDUCATION'; payload: { index: number; education: Partial<Education> } }
    | { type: 'REMOVE_EDUCATION'; payload: number }
    | { type: 'ADD_PROJECT'; payload: Project }
    | { type: 'UPDATE_PROJECT'; payload: { index: number; project: Partial<Project> } }
    | { type: 'REMOVE_PROJECT'; payload: number }
    | { type: 'ADD_ACHIEVEMENT'; payload: Achievement }
    | { type: 'UPDATE_ACHIEVEMENT'; payload: { index: number; achievement: Partial<Achievement> } }
    | { type: 'REMOVE_ACHIEVEMENT'; payload: number }
    | { type: 'RESET_RESUME' }
    | { type: 'SET_RESUME'; payload: ResumeModel };

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const resumeReducer = (state: ResumeState, action: ResumeAction): ResumeState => {
    switch (action.type) {
        case 'UPDATE_CONTACT_INFO':
            return {
                ...state,
                resume: { ...state.resume, contactInfo: { ...state.resume.contactInfo, ...action.payload } },
                isDirty: true
            };
        case 'UPDATE_PROFILE':
            return { ...state, resume: { ...state.resume, profile: action.payload }, isDirty: true };
        case 'ADD_SKILL':
            return {
                ...state,
                resume: { ...state.resume, technicalSkills: [...state.resume.technicalSkills, action.payload] },
                isDirty: true
            };
        case 'UPDATE_SKILL':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    technicalSkills: state.resume.technicalSkills.map((skill, index) =>
                        index === action.payload.index ? { ...skill, ...action.payload.skill } : skill
                    )
                },
                isDirty: true
            };
        case 'REMOVE_SKILL':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    technicalSkills: state.resume.technicalSkills.filter((_, index) => index !== action.payload)
                },
                isDirty: true
            };
        case 'ADD_WORK_EXPERIENCE':
            return {
                ...state,
                resume: { ...state.resume, workExperience: [...state.resume.workExperience, action.payload] },
                isDirty: true
            };
        case 'UPDATE_WORK_EXPERIENCE':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    workExperience: state.resume.workExperience.map((exp, index) =>
                        index === action.payload.index ? { ...exp, ...action.payload.experience } : exp
                    )
                },
                isDirty: true
            };
        case 'REMOVE_WORK_EXPERIENCE':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    workExperience: state.resume.workExperience.filter((_, index) => index !== action.payload)
                },
                isDirty: true
            };
        case 'ADD_EDUCATION':
            return {
                ...state,
                resume: { ...state.resume, education: [...state.resume.education, action.payload] },
                isDirty: true
            };
        case 'UPDATE_EDUCATION':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    education: state.resume.education.map((edu, index) =>
                        index === action.payload.index ? { ...edu, ...action.payload.education } : edu
                    )
                },
                isDirty: true
            };
        case 'REMOVE_EDUCATION':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    education: state.resume.education.filter((_, index) => index !== action.payload)
                },
                isDirty: true
            };
        case 'ADD_PROJECT':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    projects: [...(state.resume.projects || []), action.payload]
                },
                isDirty: true
            };
        case 'UPDATE_PROJECT':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    projects: state.resume.projects?.map((project, index) =>
                        index === action.payload.index ? { ...project, ...action.payload.project } : project
                    ) || []
                },
                isDirty: true
            };
        case 'REMOVE_PROJECT':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    projects: state.resume.projects?.filter((_, index) => index !== action.payload) || []
                },
                isDirty: true
            };
        case 'ADD_ACHIEVEMENT':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    achievements: [...(state.resume.achievements || []), action.payload]
                },
                isDirty: true
            };
        case 'UPDATE_ACHIEVEMENT':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    achievements: state.resume.achievements?.map((achievement, index) =>
                        index === action.payload.index ? { ...achievement, ...action.payload.achievement } : achievement
                    ) || []
                },
                isDirty: true
            };
        case 'REMOVE_ACHIEVEMENT':
            return {
                ...state,
                resume: {
                    ...state.resume,
                    achievements: state.resume.achievements?.filter((_, index) => index !== action.payload) || []
                },
                isDirty: true
            };
        case 'RESET_RESUME':
            return { resume: INITIAL_RESUME, isDirty: false };
        case 'SET_RESUME':
            return { resume: action.payload, isDirty: false };
        default:
            return state;
    }
};

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(resumeReducer, { resume: INITIAL_RESUME, isDirty: false });

    return (
        <ResumeContext.Provider value={{ state, dispatch }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResumeContext must be used within a ResumeProvider');
    }
    return context;
};