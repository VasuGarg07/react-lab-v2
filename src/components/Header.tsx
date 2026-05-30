import { useNavigate } from "react-router";
import { NavMenu } from '@react-lab/ui';
import { Apps } from "./apps";
import UserMenu from "../auth/UserMenu";
import { usePageTitle } from "./usePageTitle";

const Header = () => {
    const navigate = useNavigate();
    const pageTitle = usePageTitle();

    return (
        <nav className="flex items-center justify-between w-full px-4 py-3 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
            {/* Left side: sidebar toggle / hamburger */}
            <NavMenu links={Apps} />

            {/* Brand */}
            <h1
                className="text-xl font-semibold cursor-pointer text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => navigate("/")}
            >
                {pageTitle}
            </h1>

            {/* Right side */}
            <div className="flex items-center gap-3">
                <UserMenu />
            </div>
        </nav>
    );
};

export default Header;