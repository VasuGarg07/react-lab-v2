// Utility Components

import { Sheet } from "@mui/joy";

export const Spacer = () => <span className="spacer" />;


interface IconProps {
  icon: string,
  outlined?: boolean,
  size?: number
}
export const MatIcon = ({ icon, outlined, size }: IconProps) => {
  return (
    <span
      className={outlined ? 'material-icons-outlined' : 'material-icons'}
      style={
        (size ? {
          fontSize: size,
          width: size,
          height: size
        } : {})
      }
    >
      {icon}
    </span>
  )
};

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
