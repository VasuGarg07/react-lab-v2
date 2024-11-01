import { Alert, Avatar, Button, Card, CardContent, Divider, FormControl, FormHelperText, FormLabel, Input, Sheet, Stack, Typography, useColorScheme } from '@mui/joy';
import { Loader2, Phone, Upload, User } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

interface UpdateData {
    displayName?: string;
    phoneNumber?: string;
}


const UpdateProfile = () => {
    const { user, updateProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { mode } = useColorScheme();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData(event.currentTarget);
            const updateData: UpdateData = {};

            const displayName = formData.get('displayName') as string;
            if (displayName?.trim()) {
                updateData.displayName = displayName;
            }

            const phoneNumber = formData.get('phoneNumber') as string;
            if (phoneNumber?.trim()) {
                updateData.phoneNumber = phoneNumber;
            }

            await updateProfile(updateData);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet
            sx={{
                width: '100%',
                minHeight: 'calc(100vh - 56px)',
                background: mode === 'light'
                    ? 'linear-gradient(45deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)'
                    : 'linear-gradient(45deg, #2c3e50 0%, #1a2a3d 99%, #1a2a3d 100%)',
                py: 3,
                px: { xs: 2, md: 6 }
            }}
        >
            <Card
                sx={{
                    maxWidth: 600,
                    mx: 'auto',
                    borderRadius: 'lg',
                    boxShadow: 'md'
                }}
            >
                <CardContent>
                    <Typography level="h4" component="h1" sx={{ mb: 3 }}>
                        Update Profile
                    </Typography>

                    {error && (
                        <Alert color="danger" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert color="success" sx={{ mb: 2 }}>
                            Profile updated successfully!
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            {/* Profile Image Upload */}
                            <FormControl>
                                <FormLabel sx={{ mx: 'auto' }}>Profile Picture</FormLabel>
                                <Avatar
                                    size="lg"
                                    variant="soft"
                                    src={user?.photoURL ?? undefined}
                                    sx={{
                                        '--Avatar-size': '100px',
                                        mx: 'auto'
                                    }}
                                >
                                    {!user?.photoURL && <User size={40} />}
                                </Avatar>
                            </FormControl>

                            <Divider />

                            {/* Basic Information */}
                            <FormControl>
                                <FormLabel>Display Name</FormLabel>
                                <Input
                                    name="displayName"
                                    defaultValue={user?.displayName || ''}
                                    placeholder="Enter your name"
                                    startDecorator={<User size={18} />}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    sx={{ '--Input-disabled-opacity': 0.6 }}
                                />
                                <FormHelperText>
                                    Email cannot be changed
                                </FormHelperText>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Phone Number</FormLabel>
                                <Input
                                    name="phoneNumber"
                                    type="tel"
                                    defaultValue={user?.phoneNumber || ''}
                                    placeholder="+1 (555) 000-0000"
                                    startDecorator={<Phone size={18} />}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                loading={loading}
                                loadingPosition="start"
                                startDecorator={loading ? <Loader2 size={18} /> : <Upload size={18} />}
                                sx={{ mt: 2 }}
                            >
                                Update Profile
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Sheet>
    );
};

export default UpdateProfile;