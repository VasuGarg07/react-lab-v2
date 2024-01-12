// Utility Components

import { Sheet } from "@mui/joy";

export const Spacer = () => <span className="spacer" />;

export const MatIcon = ({ icon }: { icon: string }) => <span className="material-icons">{icon}</span>;
export const MatIconOutlined = ({ icon }: { icon: string }) => <span className="material-icons-outlined">{icon}</span>;

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Sheet
      color="danger"
      variant="solid"
      sx={{ width: 1, p: 1, mb: 1, borderRadius: 'md', }}
      className="text-center text-uppercase"
    >
      {message}
    </Sheet>
  );
};

export default ErrorMessage;