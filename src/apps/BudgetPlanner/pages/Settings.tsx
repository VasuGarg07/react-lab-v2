// 2. clear user data
// 4. add custom category

import { AspectRatio, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/joy";
import { useAuth } from "../../../shared/AuthContext";
import { formatDateString } from "../helpers/utilities";
import { TransactionService } from "../helpers/firestore";
import { useAlert } from "../../../shared/AlertProvider";
import { useState } from "react";

const Settings = () => {
    const { user } = useAuth();
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(false);


    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            if (user) {
                // Delete all transactions for the user
                await TransactionService.deleteAllTransactions(user.uid);
                // Add additional steps here if you want to delete the user account from Firebase Auth, etc.
                showAlert('success', 'All associated data to your account have been deleted successfully.');
            }
        } catch (error: any) {
            showAlert('danger', `Error deleting account: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Stack p={{ xs: 2, md: 3 }} mt={2} spacing={2}
            alignItems='center'>

            {/* User Profile */}
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 520,
                    width: 1,
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}>
                <Typography level="title-lg">User Profile</Typography>
                <Divider />
                <CardContent>
                    <Stack direction='row' spacing={2}>
                        <AspectRatio ratio="1" sx={{ width: 80 }}>
                            <img src={user!.photoURL as string} loading="lazy" alt=""
                            />
                        </AspectRatio>
                        <Stack justifyContent='center'>
                            <Typography level="title-md">{user!.displayName}</Typography>
                            <Typography level="body-sm" color="primary">{user!.email}</Typography>
                            <Typography level="body-sm">Active since - {formatDateString(user?.metadata?.lastSignInTime)}</Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            {/* Currency Details */}
            <Card
                variant="outlined"
                color="danger"
                sx={{
                    maxWidth: 520,
                    width: 1,
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}>
                <Typography level="title-lg" color="danger">Delete Account</Typography>
                <Divider />
                <CardContent>
                    <Typography level="title-sm">Permanently delete your account and all its associated data, this action cannot be undone.</Typography>
                </CardContent>
                <Stack direction='row-reverse' spacing={1}>
                    <Button color='danger' variant="solid" loading={loading} onClick={handleDeleteAccount}>Delete</Button>
                </Stack>
            </Card>
        </Stack>
    )
}

export default Settings