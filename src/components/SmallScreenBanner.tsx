import { MonitorX } from "lucide-react";

const SmallScreenBanner = () => {
  return (
    <div className="sm:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium border-b rounded-lg
      bg-yellow-100 text-yellow-800 border-yellow-300
      dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700">
      <MonitorX className="w-5 h-5 shrink-0" />
      <p>
        For a better experience, please use this app on a larger screen.
      </p>
    </div>
  );
};

export default SmallScreenBanner;
