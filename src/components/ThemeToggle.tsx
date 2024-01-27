import { IconButton, useColorScheme } from "@mui/joy";
import { MatIcon } from "./Utils";

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  const switchTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <IconButton onClick={switchTheme}>
      <MatIcon outlined={true} icon='dark_mode' />
    </IconButton>
  )
}
export default ThemeToggle;