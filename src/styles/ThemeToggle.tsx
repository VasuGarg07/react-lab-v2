import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = ({ size = 20 }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 transition-all duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun size={size} className="text-neutral-50" />
      ) : (
        <Moon size={size} className="text-neutral-900" />
      )}
    </button>
  );
};

export default ThemeToggle;