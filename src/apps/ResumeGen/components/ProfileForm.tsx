import React from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Box, FormControl, FormLabel, Textarea } from '@mui/joy';
import { FileText } from 'lucide-react';
import { MAX_PROFILE_LENGTH } from '../helpers/constants';

const ProfileForm: React.FC = () => {
    const { state, dispatch } = useResumeContext();
    const { profile } = state.resume;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: event.target.value,
        });
    };

    return (
        <Box>
            <FormControl>
                <FormLabel><FileText size={18} /> Professional Profile</FormLabel>
                <Textarea
                    value={profile}
                    onChange={handleChange}
                    minRows={3}
                    maxRows={5}
                    placeholder="Write a brief professional summary..."
                    slotProps={{
                        textarea: {
                            maxLength: MAX_PROFILE_LENGTH,
                        },
                    }}
                />
            </FormControl>
            <Box sx={{ mt: 1, textAlign: 'right', fontSize: 'sm', color: 'text.secondary' }}>
                {profile.length}/{MAX_PROFILE_LENGTH}
            </Box>
        </Box>
    );
};

export default ProfileForm;