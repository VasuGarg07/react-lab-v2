import CookNav from "@/apps/QuickByte/Navigation/CookNav";
import SideNav from "@/components/SideNav";
import Signup from "@/auth/Signup";
import ThemeToggle from "@/components/ThemeToggle";
import { navigate } from "@/shared/Router";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/recipe-haven")) {
    return <CookNav />;
  }

  if (location.pathname.startsWith("/jobscape")) {
    return null;
  }

  return (
    <nav className="flex items-center w-full py-3 px-4 shadow-md backdrop-blur-md">
      <SideNav />
      <div className="flex-grow" /> {/* Spacer replacement */}
      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        React Lab
      </h1>
      <div className="flex-grow" /> {/* Spacer replacement */}
      <ThemeToggle />
      <Signup />
    </nav>
  );
};

export default Navbar;
