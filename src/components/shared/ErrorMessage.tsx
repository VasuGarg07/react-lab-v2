// Utility Components
import { Sheet, Typography } from "@mui/joy";
import React from 'react';


export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Sheet
      color="danger"
      variant="solid"
      sx={{ width: 1, p: 1, mb: 1, borderRadius: 'md', }}
    >
      <Typography level="body-lg" textAlign='center' textTransform='capitalize'>{message}</Typography>
    </Sheet>
  );
};

