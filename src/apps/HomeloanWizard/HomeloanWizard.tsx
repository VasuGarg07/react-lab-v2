import { motion } from 'framer-motion';
import { BarChart, Calculator, Home, PieChart } from 'lucide-react';
import React, { useState } from 'react';

// Import components
import AffordabilityCalculator from './AffordabilityCalculator';
import AmortizationSchedule from './AmortizationSchedule';
import ComparisonTable from './ComparisonTable';
import LoanInputs from './LoanInputs';
import LoanSummary from './LoanSummary';

const HomeloanWizard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Using matchMedia approach for responsive design
  const [isMobile, setIsMobile] = useState(() => {
    // Check if window is defined (for SSR compatibility)
    if (typeof window !== 'undefined') {
      return window.matchMedia("(max-width: 767px)").matches;
    }
    return false;
  });

  // Media query listener
  React.useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    // Handler function
    const handleMediaQueryChange = (e: any) => {
      setIsMobile(e.matches);
    };

    // Add listener
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Define tabs with their icons, labels, and content components
  const tabs = [
    {
      icon: <Home size={isMobile ? 20 : 18} />,
      label: 'Loan Calculator',
      content: (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <LoanInputs />
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <LoanSummary />
          </div>
        </div>
      )
    },
    {
      icon: <BarChart size={isMobile ? 20 : 18} />,
      label: 'Amortization',
      content: <AmortizationSchedule />
    },
    {
      icon: <PieChart size={isMobile ? 20 : 18} />,
      label: 'Compare Options',
      content: <ComparisonTable />
    },
    {
      icon: <Calculator size={isMobile ? 20 : 18} />,
      label: 'Affordability',
      content: <AffordabilityCalculator />
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto p-3 md:p-5">
      {/* Main container with bottom padding on mobile to make room for nav */}
      <div className="overflow-hidden bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm dark:shadow-2xl rounded-2xl border border-white/30 dark:border-neutral-800/30 mb-6 pb-16 md:pb-6">
        {/* Desktop tab navigation - hidden on mobile */}
        {!isMobile && (
          <div className="p-1.5 bg-zinc-100 dark:bg-neutral-800/80 backdrop-blur-sm">
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${activeTab === index
                      ? 'bg-violet-500 text-white'
                      : 'bg-white/70 dark:bg-neutral-700/70 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700'}
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile header - just a title of current section */}
        {isMobile && (
          <div className="p-3 bg-zinc-100 dark:bg-neutral-800/80 backdrop-blur-sm flex justify-center">
            <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {tabs[activeTab].label}
            </h2>
          </div>
        )}

        {/* Tab content */}
        <div className="p-2 sm:p-4 md:p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-x-auto" // Enable horizontal scrolling if content overflows
          >
            {tabs[activeTab].content}
          </motion.div>
        </div>
      </div>

      {/* Mobile bottom navigation bar - fixed to bottom of viewport */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 shadow-lg border-t border-neutral-200 dark:border-neutral-800 z-10">
          <div className="flex justify-around max-w-7xl mx-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  flex flex-col items-center justify-center py-3 px-2 w-1/4
                  ${activeTab === index
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-neutral-600 dark:text-neutral-400'}
                `}
              >
                <div className="mb-1">
                  {tab.icon}
                </div>
                <span className="text-xs font-medium truncate">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Branding footer (hidden on mobile) */}
      {!isMobile && (
        <div className="text-center">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Home Loan Calculator • {new Date().getFullYear()}
          </p>
        </div>
      )}
    </div>
  );
};

export default HomeloanWizard;