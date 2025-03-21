import Signup from "@/auth/Signup";
import SideNav from "@/components/SideNav";
import { navigate } from "@/shared/Router";
import ThemeToggle from "@/styles/ThemeToggle";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/jobscape")) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between w-full py-2 px-4 shadow-md backdrop-blur-md bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
      <SideNav />
      <h1
        className="text-xl font-semibold cursor-pointer text-neutral-900 dark:text-neutral-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        onClick={() => navigate("/")}
      >
        React Lab
      </h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Signup />
      </div>
    </nav>
  );
};

export default Navbar;