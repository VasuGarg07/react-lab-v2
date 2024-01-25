// Utility Components

import { Sheet } from "@mui/joy";

export const Spacer = () => <span className="spacer" />;

export const MatIcon = ({ icon }: { icon: string }) => <span className="material-icons" style={{ width: '24px' }}>{icon}</span>;

export const MatIconOutlined = ({ icon }: { icon: string }) => <span className="material-icons-outlined" style={{ width: '24px' }}>{icon}</span>;

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Sheet
      color="danger"
      variant="solid"
      sx={{ width: 1, p: 1, mb: 1, borderRadius: 'md', }}
      className="text-center text-capitalize"
    >
      {message}
    </Sheet>
  );
};
