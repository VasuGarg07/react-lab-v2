import React, { useState } from 'react';
import { BarChart, Calculator, Home, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

// Import components
import AffordabilityCalculator from './AffordabilityCalculator';
import AmortizationSchedule from './AmortizationSchedule';
import ComparisonTable from './ComparisonTable';
import LoanInputs from './LoanInputs';
import LoanSummary from './LoanSummary';
import AppBackground from '@/components/AppBackground';

const HomeloanWizard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Define tabs with their icons, labels, and content components
  const tabs = [
    {
      icon: <Home size={18} />,
      label: 'Loan Calculator',
      content: (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <LoanInputs />
          </div>
          <div className="flex-1">
            <LoanSummary />
          </div>
        </div>
      )
    },
    {
      icon: <BarChart size={18} />,
      label: 'Amortization',
      content: <AmortizationSchedule />
    },
    {
      icon: <PieChart size={18} />,
      label: 'Compare Options',
      content: <ComparisonTable />
    },
    {
      icon: <Calculator size={18} />,
      label: 'Affordability',
      content: <AffordabilityCalculator />
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-53px)] overflow-hidden">
      <AppBackground />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto p-3 md:p-5">
        {/* Tab container */}
        <div className="overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm dark:shadow-2xl rounded-2xl border border-white/30 dark:border-gray-800/30 mb-6">
          {/* Tab list */}
          <div className="p-1.5 bg-slate-100 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${activeTab === index
                      ? 'bg-violet-500 text-white'
                      : 'bg-white/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'}
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-2 sm:p-4 md:p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {tabs[activeTab].content}
            </motion.div>
          </div>
        </div>

        {/* Branding footer (optional) */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Home Loan Calculator • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeloanWizard;