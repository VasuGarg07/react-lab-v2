import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import { ArrowLeft, ArrowRight, Bolt, CheckCircle, CircleUserRound, Globe, GraduationCap, Mail, Pickaxe } from 'lucide-react';
import React, { useState } from 'react';
import { Control, Controller, FieldErrors, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import RichTextEditor from '@/components/RichTextEditor';
import FileUploader from '@/components/UploadFile';
import UploadImage from '@/components/UploadImage';
import { JOB_TYPES, SHIFT_TYPES } from '@/apps/Jobscape/helpers/job.constants';
import { FormProps, IApplicant, IASocialLinks } from '@/apps/Jobscape/helpers/job.types';
import SocialLinkInput, { SocialPlatform } from '@/apps/Jobscape/forms/SocialLinkInput';
import TagsListInput from '@/apps/Jobscape/forms/TagsListInput';
import ExperienceForm from '@/apps/Jobscape/forms/ExperienceForm';
import EducationForm from '@/apps/Jobscape/forms/EducationForm';


const ApplicantForm: React.FC<FormProps<IApplicant>> = ({ onSubmit, btnLabel }) => {

    const [activeTab, setActiveTab] = useState(0);
    const { handleSubmit, control, formState: { errors } } = useFormContext<IApplicant>();

    const tabs = [
        {
            label: 'Profile',
            icon: <CircleUserRound size={20} />,
            content: <PersonalInfo control={control} errors={errors} />
        },
        {
            label: 'Preferences',
            icon: <Bolt size={20} />,
            content: <Preferences control={control} errors={errors} />
        },
        {
            label: 'Experience',
            icon: <Pickaxe size={20} />,
            content: <ExperienceForm control={control} errors={errors} />
        },
        {
            label: 'Education',
            icon: <GraduationCap size={20} />,
            content: <EducationForm control={control} errors={errors} />
        },
        {
            label: 'Social Links',
            icon: <Globe size={20} />,
            content: <SocialLinks control={control} errors={errors} />
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
            minHeight: 'calc(100dvh - 186px)',
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Tabs
                    value={activeTab}
                    onChange={(_, value) => setActiveTab(value as number)}
                    sx={{ bgcolor: 'background.body' }}
                >
                    <TabList
                        variant="plain"
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
        </Box>
    );
}

export default ApplicantForm;

export interface TabPanelComponentProps {
    control: Control<IApplicant>;
    errors: FieldErrors<IApplicant>;
}

const PersonalInfo: React.FC<TabPanelComponentProps> = ({ control, errors }) => {
    return (
        <Stack spacing={3}>
            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <Controller
                        name="photoUrl"
                        control={control}
                        render={({ field }) => (
                            <FormControl error={!!errors.photoUrl}>
                                <FormLabel>Profile Photo</FormLabel>
                                <UploadImage
                                    imageUrl={field.value}
                                    onUpload={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange('')}
                                    width={200}
                                    height={200}
                                />
                                {errors.photoUrl && (
                                    <FormHelperText>{errors.photoUrl.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid xs={12} md={8}>
                    <Stack spacing={3}>
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <FormControl required error={!!errors.fullName}>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="Enter your company name"
                                    />
                                    {errors.fullName && (
                                        <FormHelperText>{errors.fullName.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <FormControl required error={!!errors.phoneNumber}>
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
                                    {errors.phoneNumber && (
                                        <FormHelperText>{errors.phoneNumber.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="contactEmail"
                            control={control}
                            render={({ field }) => (
                                <FormControl required error={!!errors.contactEmail}>
                                    <FormLabel>Email Address</FormLabel>
                                    <Input
                                        {...field}
                                        startDecorator={<Mail size={20} />}
                                        type="email"
                                        placeholder="Email address"
                                    />
                                    {errors.contactEmail && (
                                        <FormHelperText>{errors.contactEmail.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Stack>
                </Grid>
            </Grid>

            <Controller
                name="profileSummary"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.profileSummary}>
                        <FormLabel>Profile Summary</FormLabel>
                        <RichTextEditor
                            value={field.value || ''}
                            onChange={field.onChange}
                            placeholder="Tell us about yourself..."
                        />
                        {errors.profileSummary && (
                            <FormHelperText>{errors.profileSummary.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
        </Stack>
    );
};

const Preferences: React.FC<TabPanelComponentProps> = ({ control, errors }) => {
    // State for tag inputs
    const [skillInput, setSkillInput] = useState('');
    const [languageInput, setLanguageInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [roleInput, setRoleInput] = useState('');
    const [industryInput, setIndustryInput] = useState('');

    return (
        <Stack spacing={3}>
            {/* Resume Upload Section */}
            <Controller
                name="resumeURL"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.resumeURL}>
                        <FormLabel>Resume</FormLabel>
                        <FileUploader
                            onUpload={(url) => field.onChange(url)}
                            onRemove={() => field.onChange('')}
                            fileUrl={field.value}
                            label="Upload Resume"
                            acceptedTypes=".pdf,.doc,.docx"
                            helperText="PDF, DOC, or DOCX"
                        />
                        {errors.resumeURL && (
                            <FormHelperText>{errors.resumeURL.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
            <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.skills}>
                        <FormLabel>Skills</FormLabel>
                        <TagsListInput
                            value={field.value}
                            onChange={field.onChange}
                            inputValue={skillInput}
                            onInputChange={setSkillInput}
                            placeholder="Type and press Enter to add skills"
                        />
                        {errors.skills && (
                            <FormHelperText>{errors.skills.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            <Controller
                name="languages"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.languages}>
                        <FormLabel>Languages</FormLabel>
                        <TagsListInput
                            value={field.value}
                            onChange={field.onChange}
                            inputValue={languageInput}
                            onInputChange={setLanguageInput}
                            placeholder="Type and press Enter to add languages"
                            maxTags={10}
                        />
                        {errors.languages && (
                            <FormHelperText>{errors.languages.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            <Typography level="title-lg" sx={{ mb: 2 }}>
                Job Preferences
            </Typography>

            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <Controller
                        name="preference.expectedSalary"
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.preference?.expectedSalary}>
                                <FormLabel>Expected Salary (Annual)</FormLabel>
                                <Input
                                    {...field}
                                    type="number"
                                    slotProps={{ input: { min: 0, step: 1000 } }}
                                />
                                {errors.preference?.expectedSalary && (
                                    <FormHelperText>{errors.preference.expectedSalary.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <Controller
                        name="preference.jobType"
                        control={control}
                        render={({ field: { onChange, value, ref, ...field } }) => (
                            <FormControl required error={!!errors.preference?.jobType}>
                                <FormLabel>Job Type</FormLabel>
                                <Select
                                    {...field}
                                    value={value || ''}
                                    onChange={(_, newValue) => onChange(newValue)}
                                    ref={ref}
                                >
                                    {JOB_TYPES.map(type => (
                                        <Option
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.displayName}
                                        </Option>
                                    ))}
                                </Select>
                                {errors.preference?.jobType && (
                                    <FormHelperText>{errors.preference.jobType.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <Controller
                        name="preference.shift"
                        control={control}
                        render={({ field: { onChange, value, ref, ...field } }) => (
                            <FormControl error={!!errors.preference?.shift}>
                                <FormLabel>Preferred Shift</FormLabel>
                                <Select
                                    {...field}
                                    value={value || ''}
                                    onChange={(_, newValue) => onChange(newValue)}
                                    ref={ref}
                                >
                                    {SHIFT_TYPES.map(type => (
                                        <Option
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.displayName}
                                        </Option>
                                    ))}
                                </Select>
                                {errors.preference?.shift && (
                                    <FormHelperText>{errors.preference.shift.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>
            <Controller
                name="preference.locations"
                control={control}
                render={({ field }) => (
                    <FormControl required error={!!errors.preference?.locations}>
                        <FormLabel>Preferred Locations</FormLabel>
                        <TagsListInput
                            value={field.value}
                            onChange={field.onChange}
                            inputValue={locationInput}
                            onInputChange={setLocationInput}
                            maxTags={5}
                            placeholder="Type and press Enter to add locations"
                        />
                        {errors.preference?.locations && (
                            <FormHelperText>{errors.preference.locations.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
            <Controller
                name="preference.role"
                control={control}
                render={({ field }) => (
                    <FormControl error={!!errors.preference?.role}>
                        <FormLabel>Preferred Roles</FormLabel>
                        <TagsListInput
                            value={field.value || []}
                            onChange={field.onChange}
                            inputValue={roleInput}
                            onInputChange={setRoleInput}
                            maxTags={5}
                            placeholder="Type and press Enter to add roles"
                        />
                        {errors.preference?.role && (
                            <FormHelperText>{errors.preference.role.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
            <Controller
                name="preference.industry"
                control={control}
                render={({ field }) => (
                    <FormControl error={!!errors.preference?.industry}>
                        <FormLabel>Preferred Industries</FormLabel>
                        <TagsListInput
                            value={field.value || []}
                            onChange={field.onChange}
                            inputValue={industryInput}
                            onInputChange={setIndustryInput}
                            maxTags={5}
                            placeholder="Type and press Enter to add industries"
                        />
                        {errors.preference?.industry && (
                            <FormHelperText>{errors.preference.industry.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
        </Stack>
    );
};


const SocialLinks: React.FC<TabPanelComponentProps> = ({ control, errors }) => {
    const platforms: SocialPlatform[] = [
        'github',
        'linkedin',
        'twitter',
        'youtube',
        'website',
    ];

    return (
        <Stack spacing={3}>
            <Controller
                name="socialLinks"
                control={control}
                render={({ field }) => (
                    <>
                        {platforms.map(platform => (
                            <FormControl key={platform} error={!!errors.socialLinks?.[platform as keyof IASocialLinks]}>
                                <FormLabel>
                                    {`${platform.charAt(0).toUpperCase() + platform.slice(1)} Url`}
                                </FormLabel>
                                <SocialLinkInput
                                    platform={platform}
                                    value={field.value?.[platform as keyof IASocialLinks] || ''}
                                    onChange={(value) => {
                                        const updatedSocialLinks = {
                                            ...field.value,
                                            [platform]: value
                                        };
                                        field.onChange(updatedSocialLinks);
                                    }}
                                />
                                {errors.socialLinks?.[platform as keyof IASocialLinks] && (
                                    <FormHelperText>
                                        {errors.socialLinks[platform as keyof IASocialLinks]?.message}
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