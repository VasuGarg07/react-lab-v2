import { IconButton, Tooltip, useColorScheme } from "@mui/joy";
import { Moon, Sun } from "lucide-react";
import React from "react";

interface BtnProps {
  size?: number
}

const ThemeToggle: React.FC<BtnProps> = ({ size }) => {
  const { mode, setMode } = useColorScheme();

  const switchTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <Tooltip variant="soft" title="Switch Theme">
      <IconButton onClick={switchTheme}>
        {mode == 'light' ? <Moon size={size} /> : <Sun size={size} />}
      </IconButton>
    </Tooltip>
  )
}
export default ThemeToggle;