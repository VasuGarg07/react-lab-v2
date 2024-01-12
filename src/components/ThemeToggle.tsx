import { IconButton, useColorScheme } from "@mui/joy";
import { MatIconOutlined } from "./Utils";

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  const switchTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <IconButton onClick={switchTheme}>
      <MatIconOutlined icon='dark_mode' />
    </IconButton>
  )
}
export default ThemeToggle;