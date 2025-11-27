import type { FormConfig } from './types';

export interface FormTemplate {
    id: string;
    name: string;
    description: string;
    config: FormConfig;
}

export const TEMPLATES: FormTemplate[] = [
    {
        id: 'blank',
        name: 'Blank Form',
        description: 'Start from scratch',
        config: {
            title: 'New Form',
            description: '',
            steps: [],
        },
    },
    {
        id: 'contact',
        name: 'Contact Form',
        description: 'Collect name, email, and message',
        config: {
            title: 'Contact Us',
            description: 'We\'d love to hear from you',
            steps: [
                {
                    key: 'contact_info',
                    title: 'Contact Information',
                    description: '',
                    sections: [
                        {
                            key: 'details',
                            title: 'Your Details',
                            description: '',
                            fields: [
                                { key: 'name', label: 'Full Name', type: 'text', required: true },
                                { key: 'email', label: 'Email Address', type: 'text', required: true },
                                { key: 'message', label: 'Message', type: 'text', required: true },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'feedback',
        name: 'Feedback Survey',
        description: 'Gather customer feedback with ratings',
        config: {
            title: 'Feedback Survey',
            description: 'Help us improve our service',
            steps: [
                {
                    key: 'rating',
                    title: 'Your Rating',
                    description: '',
                    sections: [
                        {
                            key: 'experience',
                            title: 'Rate Your Experience',
                            description: '',
                            fields: [
                                { key: 'overall', label: 'Overall Satisfaction', type: 'range', required: true, min: 1, max: 10 },
                                { key: 'recommend', label: 'Would you recommend us?', type: 'boolean', required: true },
                            ],
                        },
                    ],
                },
                {
                    key: 'comments',
                    title: 'Additional Comments',
                    description: '',
                    sections: [
                        {
                            key: 'feedback',
                            title: 'Your Feedback',
                            description: '',
                            fields: [
                                { key: 'liked', label: 'What did you like?', type: 'text', required: false },
                                { key: 'improve', label: 'What can we improve?', type: 'text', required: false },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'registration',
        name: 'Event Registration',
        description: 'Register attendees for an event',
        config: {
            title: 'Event Registration',
            description: 'Register for our upcoming event',
            steps: [
                {
                    key: 'attendee',
                    title: 'Attendee Information',
                    description: '',
                    sections: [
                        {
                            key: 'personal',
                            title: 'Personal Details',
                            description: '',
                            fields: [
                                { key: 'name', label: 'Full Name', type: 'text', required: true },
                                { key: 'email', label: 'Email', type: 'text', required: true },
                                { key: 'phone', label: 'Phone Number', type: 'text', required: false },
                            ],
                        },
                    ],
                },
                {
                    key: 'preferences',
                    title: 'Preferences',
                    description: '',
                    sections: [
                        {
                            key: 'options',
                            title: 'Event Options',
                            description: '',
                            fields: [
                                { key: 'session', label: 'Preferred Session', type: 'select', required: true, options: ['Morning', 'Afternoon', 'Evening'] },
                                { key: 'dietary', label: 'Dietary Requirements', type: 'multi_select', required: false, options: ['Vegetarian', 'Vegan', 'Gluten-free', 'None'] },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'application',
        name: 'Job Application',
        description: 'Collect job applications',
        config: {
            title: 'Job Application',
            description: 'Apply for a position at our company',
            steps: [
                {
                    key: 'personal',
                    title: 'Personal Information',
                    description: '',
                    sections: [
                        {
                            key: 'basic',
                            title: 'Basic Information',
                            description: '',
                            fields: [
                                { key: 'name', label: 'Full Name', type: 'text', required: true },
                                { key: 'email', label: 'Email', type: 'text', required: true },
                                { key: 'phone', label: 'Phone', type: 'text', required: true },
                            ],
                        },
                    ],
                },
                {
                    key: 'experience',
                    title: 'Experience',
                    description: '',
                    sections: [
                        {
                            key: 'work',
                            title: 'Work Experience',
                            description: '',
                            fields: [
                                { key: 'years', label: 'Years of Experience', type: 'number', required: true },
                                { key: 'current_role', label: 'Current Role', type: 'text', required: false },
                                { key: 'skills', label: 'Key Skills', type: 'multi_select', required: true, options: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Other'] },
                            ],
                        },
                    ],
                },
                {
                    key: 'additional',
                    title: 'Additional Information',
                    description: '',
                    sections: [
                        {
                            key: 'other',
                            title: 'Other Details',
                            description: '',
                            fields: [
                                { key: 'start_date', label: 'Available Start Date', type: 'text', required: true },
                                { key: 'relocate', label: 'Willing to Relocate?', type: 'boolean', required: true },
                                { key: 'notes', label: 'Additional Notes', type: 'text', required: false },
                            ],
                        },
                    ],
                },
            ],
        },
    },
];