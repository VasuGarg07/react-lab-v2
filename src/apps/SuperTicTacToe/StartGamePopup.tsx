// StartGamePopup.tsx
import React from 'react';
import { Modal, ModalDialog, Typography, Button } from '@mui/joy';

interface StartGamePopupProps {
    open: boolean;
    onStart: () => void;
}

const StartGamePopup: React.FC<StartGamePopupProps> = ({ open, onStart }) => {
    return (
        <Modal open={open}>
            <ModalDialog>
                <Typography level="h4" textAlign="center">Welcome to Super Tic Tac Toe</Typography>
                <Typography level="body-md" textAlign="center" mt={2}>
                    Are you ready to start the game?
                </Typography>
                <Button variant="solid" color="primary" onClick={onStart} sx={{ mt: 2 }}>
                    Start Game
                </Button>
            </ModalDialog>
        </Modal>
    );
};

export default StartGamePopup;
