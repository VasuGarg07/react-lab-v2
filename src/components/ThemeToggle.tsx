import { IconButton, Tooltip, useColorScheme } from "@mui/joy";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  const switchTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <Tooltip variant="soft" title="Switch Theme">
      <IconButton onClick={switchTheme}>
        {mode == 'light' ? <Moon /> : <Sun />}
      </IconButton>
    </Tooltip>
  )
}
export default ThemeToggle;