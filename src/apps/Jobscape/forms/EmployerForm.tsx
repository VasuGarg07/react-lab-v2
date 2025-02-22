import { Autocomplete, Box, Button, FormControl, FormLabel, Input, Select, Stack, Tab, TabList, TabPanel, Tabs, Option, Grid, FormHelperText, tabClasses } from '@mui/joy';
import { ArrowLeft, ArrowRight, AtSign, Building, Building2, Calendar, CircleUserRound, Globe, Link, Mail, MapPin, CheckCircle, Users } from 'lucide-react';
import React, { useState } from 'react';
import RichTextEditor from '@/shared/RichTextEditor';
import UploadImage from '@/shared/UploadImage';
import { FormProps, IEmployer, IESocialLinks } from '@/apps/Jobscape/helpers/job.types';
import { INDUSTRY_OPTIONS, TEAM_SIZE_OPTIONS } from '@/apps/Jobscape/helpers/job.constants';
import SocialLinkInput, { SocialPlatform } from '@/apps/Jobscape/forms/SocialLinkInput';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Control, Controller, FieldErrors, useFormContext } from 'react-hook-form';

const EmployerForm: React.FC<FormProps<IEmployer>> = ({ onSubmit, btnLabel }) => {

    const [activeTab, setActiveTab] = useState(0);
    const { handleSubmit, control, formState: { errors } } = useFormContext<IEmployer>();

    const tabs = [
        {
            label: 'Company Info',
            icon: <Building size={20} />,
            content: <CompanyDetails control={control} errors={errors} />
        },
        {
            label: 'Founding Info',
            icon: <CircleUserRound size={20} />,
            content: <FoundingDetails control={control} errors={errors} />
        },
        {
            label: 'Social Links',
            icon: <Globe size={20} />,
            content: <SocialLinks control={control} errors={errors} />
        },
        {
            label: 'Contact',
            icon: <AtSign size={20} />,
            content: <ContactDetails control={control} errors={errors} />
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
        <Box sx={{
            width: '100%',
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Tabs
                    value={activeTab}
                    onChange={(_, value) => setActiveTab(value as number)}
                    sx={{ bgcolor: 'transparent' }}
                >
                    <TabList
                        variant="plain"
                        disableUnderline
                        sx={{
                            p: 1,
                            gap: 1,
                            borderRadius: 'xl',
                            bgcolor: 'background.level1',
                            justifyContent: 'center',
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                            },
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                disableIndicator
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
                            type="submit"
                            endDecorator={<CheckCircle size={20} />}
                        >
                            {btnLabel}
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="solid"
                            color="primary"
                            onClick={handleNext}
                            endDecorator={<ArrowRight size={20} />}
                        >
                            Next
                        </Button>
                    )}
                </Stack>
            </form>
        </Box >
    );
};

export default EmployerForm;


// Tab Panel Components

interface TabPanelComponentProps {
    control: Control<IEmployer>;
    errors: FieldErrors<IEmployer>;
}

const CompanyDetails: React.FC<TabPanelComponentProps> = ({ control, errors }) => {
    return (
        <Stack spacing={3}>
            <Controller
                name="logoURL"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.logoURL}>
                        <FormLabel>Company Logo</FormLabel>
                        <UploadImage
                            imageUrl={field.value}
                            onUpload={(url) => field.onChange(url)}
                            onRemove={() => field.onChange('')}
                            width={200}
                            height={200}
                        />
                        {errors.logoURL && (
                            <FormHelperText>{errors.logoURL.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.companyName}>
                        <FormLabel>Company Name</FormLabel>
                        <Input
                            {...field}
                            placeholder="Enter your company name"
                        />
                        {errors.companyName && (
                            <FormHelperText>{errors.companyName.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            <Controller
                name="companyOverview"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.companyOverview}>
                        <FormLabel>About Company</FormLabel>
                        <RichTextEditor
                            value={field.value || ''}
                            onChange={field.onChange}
                            placeholder="Write about your company..."
                        />
                        {errors.companyOverview && (
                            <FormHelperText>{errors.companyOverview.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
        </Stack>
    );
};

const FoundingDetails: React.FC<TabPanelComponentProps> = ({ control, errors }) => {
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return (
        <Stack spacing={3}>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <Controller
                        name="industry"
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.industry}>
                                <FormLabel>Industry</FormLabel>
                                <Autocomplete
                                    startDecorator={<Building2 size={20} />}
                                    placeholder="Select or type your industry"
                                    options={INDUSTRY_OPTIONS}
                                    value={field.value}
                                    onChange={(_, newValue) => field.onChange(newValue || '')}
                                    freeSolo
                                />
                                {errors.industry && (
                                    <FormHelperText>{errors.industry.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <Controller
                        name="employeeStrength"
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.employeeStrength}>
                                <FormLabel>Team Size</FormLabel>
                                <Select
                                    startDecorator={<Users size={20} />}
                                    placeholder="Select team size"
                                    value={field.value}
                                    onChange={(_, newValue) => field.onChange(newValue || '')}
                                >
                                    {TEAM_SIZE_OPTIONS.map((size) => (
                                        <Option key={size} value={size}>
                                            {size}
                                        </Option>
                                    ))}
                                </Select>
                                {errors.employeeStrength && (
                                    <FormHelperText>{errors.employeeStrength.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <Controller
                        name="yearOfEstablishMent"
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.yearOfEstablishMent}>
                                <FormLabel>Year of Establishment</FormLabel>
                                <Select
                                    startDecorator={<Calendar size={20} />}
                                    placeholder="Select year"
                                    value={field.value}
                                    onChange={(_, newValue) => field.onChange(newValue || '')}
                                >
                                    {yearOptions.map((year) => (
                                        <Option key={year} value={year.toString()}>
                                            {year}
                                        </Option>
                                    ))}
                                </Select>
                                {errors.yearOfEstablishMent && (
                                    <FormHelperText>{errors.yearOfEstablishMent.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <Controller
                        name="websiteUrl"
                        control={control}
                        render={({ field }) => (
                            <FormControl error={!!errors.websiteUrl}>
                                <FormLabel>Company Website</FormLabel>
                                <Input
                                    {...field}
                                    startDecorator={<Link size={20} />}
                                    placeholder="https://example.com"
                                />
                                {errors.websiteUrl && (
                                    <FormHelperText>{errors.websiteUrl.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>

            <Controller
                name="companyVision"
                control={control}
                render={({ field }) => (
                    <FormControl error={!!errors.companyVision}>
                        <FormLabel>Company Vision</FormLabel>
                        <RichTextEditor
                            value={field.value || ''}
                            onChange={field.onChange}
                            placeholder="Tell us about your company vision..."
                        />
                        {errors.companyVision && (
                            <FormHelperText>{errors.companyVision.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
        </Stack>
    );
};

const SocialLinks: React.FC<TabPanelComponentProps> = ({ control, errors }) => {
    const platforms: SocialPlatform[] = [
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'youtube'
    ];

    return (
        <Stack spacing={3}>
            <Controller
                name="socialLinks"
                control={control}
                render={({ field }) => (
                    <>
                        {platforms.map(platform => (
                            <FormControl key={platform} error={!!errors.socialLinks?.[platform as keyof IESocialLinks]}>
                                <FormLabel>
                                    {`${platform.charAt(0).toUpperCase() + platform.slice(1)} Url`}
                                </FormLabel>
                                <SocialLinkInput
                                    platform={platform}
                                    value={field.value?.[platform as keyof IESocialLinks] || ''}
                                    onChange={(value) => {
                                        const updatedSocialLinks = {
                                            ...field.value,
                                            [platform]: value
                                        };
                                        field.onChange(updatedSocialLinks);
                                    }}
                                />
                                {errors.socialLinks?.[platform as keyof IESocialLinks] && (
                                    <FormHelperText>
                                        {errors.socialLinks[platform as keyof IESocialLinks]?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        ))}
                    </>
                )}
            />
        </Stack>
    );
};


const ContactDetails: React.FC<TabPanelComponentProps> = ({ control, errors }) => {
    return (
        <Stack spacing={3}>
            <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.contactNumber}>
                        <FormLabel>Contact Number</FormLabel>
                        <PhoneInput
                            country={'in'}
                            value={field.value}
                            onChange={(phone) => field.onChange(phone)}
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
                        {errors.contactNumber && (
                            <FormHelperText>{errors.contactNumber.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            {...field}
                            startDecorator={<Mail size={20} />}
                            type="email"
                            placeholder="Email address"
                        />
                        {errors.email && (
                            <FormHelperText>{errors.email.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            <Controller
                name="address"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.address}>
                        <FormLabel>Address</FormLabel>
                        <Input
                            {...field}
                            startDecorator={<MapPin size={20} />}
                            placeholder="Map location"
                        />
                        {errors.address && (
                            <FormHelperText>{errors.address.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
        </Stack>
    );
};
