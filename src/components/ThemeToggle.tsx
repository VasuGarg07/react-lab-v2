import { IconButton, useColorScheme } from "@mui/joy";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  const switchTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <IconButton onClick={switchTheme}>
      {mode == 'light' ? <Moon /> : <Sun />}
    </IconButton>
  )
}
export default ThemeToggle;