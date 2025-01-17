import { Autocomplete, Box, Button, FormControl, FormLabel, Input, Select, Stack, Tab, TabList, TabPanel, Tabs, Option, Grid } from '@mui/joy';
import { ArrowLeft, ArrowRight, AtSign, Building, Building2, Calendar, CircleUserRound, Globe, Link, Mail, MapPin, Upload, Users } from 'lucide-react';
import React, { useState } from 'react';
import RichTextEditor from '../../../shared/RichTextEditor';
import UploadImage from '../../../shared/UploadImage';
import { FormProps, IEmployer, IESocialLinks } from '../helpers/job.types';
import { INDUSTRY_OPTIONS, TEAM_SIZE_OPTIONS } from '../helpers/job.constants';
import SocialLinkInput, { SocialPlatform } from './SocialLinkInput';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const EmployerForm: React.FC<FormProps<IEmployer>> = ({ data, setData, btnLabel, handleSubmit }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleFieldChange = (field: string, value: any) => {
        if (field === 'socialLinks') {
            setData(prev => ({
                ...prev,
                socialLinks: value
            }));
        } else {
            setData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const tabs = [
        {
            label: 'Company Info',
            icon: <Building size={20} />,
            content: <CompanyDetails
                data={data}
                onChange={handleFieldChange}
            />
        },
        {
            label: 'Founding Info',
            icon: <CircleUserRound size={20} />,
            content: <FoundingDetails data={data}
                onChange={handleFieldChange}
            />
        },
        {
            label: 'Social Media Links',
            icon: <Globe size={20} />,
            content: <SocialLinks data={data}
                onChange={handleFieldChange}
            />
        },
        {
            label: 'Contact',
            icon: <AtSign size={20} />,
            content: <ContactDetails data={data}
                onChange={handleFieldChange}
            />
        },
    ];

    const handleNext = () => {
        if (activeTab < tabs.length - 1) {
            setActiveTab(activeTab + 1);
        }
    };

    const handlePrev = () => {
        if (activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    };

    return (
        <Box sx={{ width: '100%', minHeight: 'calc(100dvh - 186px)' }}>
            <Tabs
                value={activeTab}
                onChange={(_, value) => setActiveTab(value as number)}
                sx={{ bgcolor: 'background.body' }}
            >
                <TabList
                    variant="plain"
                    sx={{
                        pt: 2,
                        justifyContent: 'center',
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            variant={index === activeTab ? 'solid' : 'plain'}
                            color={index === activeTab ? 'primary' : 'neutral'}
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                {tab.icon}
                                <span>{tab.label}</span>
                            </Stack>
                        </Tab>
                    ))}
                </TabList>

                {tabs.map((tab, index) => (
                    <TabPanel key={index} value={index}>
                        {tab.content}
                    </TabPanel>
                ))}
            </Tabs>

            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ mt: 3, px: 2, pb: 2 }}
            >
                <Button
                    variant="outlined"
                    color="neutral"
                    onClick={handlePrev}
                    disabled={activeTab === 0}
                    startDecorator={<ArrowLeft size={20} />}
                >
                    Previous
                </Button>

                {activeTab === tabs.length - 1 ? (
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={handleSubmit}
                        endDecorator={<Upload size={20} />}
                    >
                        {btnLabel}
                    </Button>
                ) : (
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={handleNext}
                        endDecorator={<ArrowRight size={20} />}
                    >
                        Next
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default EmployerForm;


// Tab Panel Components

interface CompanyDetailsProps {
    data: {
        companyName: string;
        logoURL: string;
        companyOverview?: string;
    };
    onChange: (field: string, value: string) => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ data, onChange }) => {
    return (
        <Stack spacing={3}>
            <FormControl required>
                <FormLabel>Company Logo</FormLabel>
                <UploadImage
                    imageUrl={data.logoURL}
                    onUpload={(url) => onChange('logoURL', url)}
                    onRemove={() => onChange('logoURL', '')}
                    width={200}
                    height={200}
                />
            </FormControl>

            <FormControl required>
                <FormLabel>Company Name</FormLabel>
                <Input
                    placeholder="Enter your company name"
                    value={data.companyName}
                    onChange={(e) => onChange('companyName', e.target.value)}
                />
            </FormControl>

            <FormControl required>
                <FormLabel>About Company</FormLabel>
                <RichTextEditor
                    value={data.companyOverview || ''}
                    onChange={(content) => onChange('companyOverview', content)}
                    placeholder="Write about your company..."
                />
            </FormControl>
        </Stack>
    );
};

interface FoundingDetailsProps {
    data: {
        industry: string;
        employeeStrength: string;
        yearOfEstablishMent: string;
        websiteUrl?: string;
        companyVision?: string;
    };
    onChange: (field: string, value: string) => void;
}

const FoundingDetails: React.FC<FoundingDetailsProps> = ({ data, onChange }) => {
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return (
        <Stack spacing={3}>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Industry</FormLabel>
                        <Autocomplete
                            startDecorator={<Building2 size={20} />}
                            placeholder="Select or type your industry"
                            options={INDUSTRY_OPTIONS}
                            value={data.industry}
                            onChange={(_, newValue) => onChange('industry', newValue || '')}
                            freeSolo
                        />
                    </FormControl>
                </Grid>

                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Team Size</FormLabel>
                        <Select
                            startDecorator={<Users size={20} />}
                            placeholder="Select team size"
                            value={data.employeeStrength}
                            onChange={(_, newValue) => onChange('employeeStrength', newValue || '')}
                        >
                            {TEAM_SIZE_OPTIONS.map((size) => (
                                <Option key={size} value={size}>
                                    {size}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid xs={12} md={6}>
                    <FormControl required>
                        <FormLabel>Year of Establishment</FormLabel>
                        <Select
                            startDecorator={<Calendar size={20} />}
                            placeholder="Select year"
                            value={data.yearOfEstablishMent}
                            onChange={(_, newValue) => onChange('yearOfEstablishMent', newValue || '')}
                        >
                            {yearOptions.map((year) => (
                                <Option key={year} value={year.toString()}>
                                    {year}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid xs={12} md={6}>
                    <FormControl>
                        <FormLabel>Company Website</FormLabel>
                        <Input
                            startDecorator={<Link size={20} />}
                            placeholder="https://example.com"
                            value={data.websiteUrl}
                            onChange={(e) => onChange('websiteUrl', e.target.value)}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <FormControl>
                <FormLabel>Company Vision</FormLabel>
                <RichTextEditor
                    value={data.companyVision || ''}
                    onChange={(content) => onChange('companyVision', content)}
                    placeholder="Tell us about your company vision..."
                />
            </FormControl>
        </Stack>
    );
};


interface SocialLinksProps {
    data: {
        socialLinks?: Partial<IESocialLinks>;
    };
    onChange: (field: string, value: any) => void;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ data, onChange }) => {

    const handleSocialChange = (platform: SocialPlatform, value: string) => {
        const updatedSocialLinks = {
            ...data.socialLinks,
            [platform]: value
        };
        onChange('socialLinks', updatedSocialLinks);
    };

    const platforms: SocialPlatform[] = [
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'youtube'
    ];

    return (
        <Stack spacing={3}>
            {platforms.map(platform => (
                <FormControl key={platform}>
                    <FormLabel>{`${platform.charAt(0).toUpperCase() + platform.slice(1)} Url`}</FormLabel>
                    <SocialLinkInput
                        platform={platform}
                        value={data.socialLinks?.[platform as keyof IESocialLinks] || ''}
                        onChange={(value) => handleSocialChange(platform, value)}
                    />
                </FormControl>
            ))}
        </Stack>
    );
};

interface ContactDetailsProps {
    data: {
        contactNumber: string;
        email: string;
        address: string;
    };
    onChange: (field: string, value: string) => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ data, onChange }) => {

    return (
        <Stack spacing={3}>
            <FormControl required>
                <FormLabel>Contact Number</FormLabel>
                <PhoneInput
                    country={'in'} // Default country
                    value={data.contactNumber}
                    onChange={(phone) => onChange('contactNumber', phone)}
                    inputStyle={{
                        width: '100%',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: '1px solid var(--joy-palette-neutral-300)',
                        backgroundColor: 'var(--joy-palette-background-surface)',
                    }}
                    buttonStyle={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRight: '1px solid var(--joy-palette-neutral-300)',
                        borderRadius: '6px 0 0 6px',
                    }}
                    dropdownStyle={{
                        backgroundColor: 'var(--joy-palette-background-surface)',
                        color: 'var(--joy-palette-text-primary)'
                    }}
                />
            </FormControl>

            <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input
                    startDecorator={<Mail size={20} />}
                    type="email"
                    placeholder="Email address"
                    value={data.email}
                    onChange={(e) => onChange('email', e.target.value)}
                />
            </FormControl>

            <FormControl required>
                <FormLabel>Address</FormLabel>
                <Input
                    startDecorator={<MapPin size={20} />}
                    placeholder="Map location"
                    value={data.address}
                    onChange={(e) => onChange('address', e.target.value)}
                />
            </FormControl>
        </Stack>
    );
};
