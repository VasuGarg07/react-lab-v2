import {
  Box,
  Sheet,
  Stack,
  Tab,
  tabClasses,
  TabList,
  TabPanel,
  Tabs,
  useColorScheme
} from '@mui/joy';
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
  const { mode } = useColorScheme();

  // Define tabs with their icons, labels, and content components
  const tabs = [
    {
      icon: <Home size={18} />,
      label: 'Loan Calculator',
      content: (
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4
        }}>
          <Box sx={{ flex: 1 }}>
            <LoanInputs />
          </Box>
          <Box sx={{ flex: 1 }}>
            <LoanSummary />
          </Box>
        </Box>
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
    <Box sx={{
      minHeight: 'calc(100vh - 53px)',
      p: { md: 3, xs: 2 },
      background: mode === 'dark'
        ? 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3a 50%, #252550 100%)'
        : 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
    }}>
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: 'xl',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          mb: 4,
          boxShadow: 'sm'
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value as number)}
          sx={{ bgcolor: 'transparent' }}
        >
          <TabList
            variant="plain"
            disableUnderline
            sx={{
              p: 1,
              gap: 1,
              borderRadius: 'xl',
              bgcolor: 'background.level1',
              justifyContent: 'center',
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: 'sm',
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                disableIndicator
                variant={index === activeTab ? 'solid' : 'plain'}
                color={index === activeTab ? 'primary' : 'neutral'}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  {tab.icon}
                  <span>{tab.label}</span>
                </Stack>
              </Tab>
            ))}
          </TabList>

          {tabs.map((tab, index) => (
            <TabPanel key={index} value={index} sx={{ p: { xs: 1, sm: 2 } }}>
              {tab.content}
            </TabPanel>
          ))}
        </Tabs>
      </Sheet>
    </Box>
  );
};

export default HomeloanWizard;