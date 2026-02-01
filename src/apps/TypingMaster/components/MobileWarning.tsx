import { useState, useEffect } from "react";

export function MobileWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setShow(window.innerWidth < 640);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
        <div className="mb-4 flex justify-center">
          <svg
            className="h-12 w-12 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-center text-slate-900 dark:text-white mb-2">
          Screen Too Small
        </h2>
        
        <p className="text-sm text-center text-slate-600 dark:text-slate-300 mb-6">
          This typing test works best on larger screens. Please use a tablet, laptop, or desktop for the optimal experience.
        </p>

        <div className="text-xs text-center text-slate-500 dark:text-slate-400">
          Minimum recommended width: 640px
        </div>
      </div>
    </div>
  );
}