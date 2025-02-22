import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Stack, Typography } from "@mui/joy";
import { LoanData } from "@/apps/HomeloanWizard/helpers";

interface Props {
  data: LoanData
}

const Result = ({ data }: Props) => {
  const { loanAmount, loanTerm, interestRate } = data;

  // Calculate monthly payment
  const totalLoanMonths = loanTerm * 12;
  const interestPerMonth = interestRate / 100 / 12;
  const monthlyPayment =
    (loanAmount * interestPerMonth * (1 + interestPerMonth) ** totalLoanMonths) /
    ((1 + interestPerMonth) ** totalLoanMonths - 1);

  // Since loanAmount is in millions, monthlyPayment is in millions
  // Convert to thousands (K) for display
  const monthlyPaymentInK = monthlyPayment * 1000;

  // Calculate total interest (keeping in millions)
  const totalInterestGenerated = monthlyPayment * totalLoanMonths - loanAmount;
  const totalAmount = loanAmount + totalInterestGenerated;

  // Calculate percentages
  const principalPercent = ((loanAmount / totalAmount) * 100).toFixed(2);
  const interestPercent = ((totalInterestGenerated / totalAmount) * 100).toFixed(2);

  const COLORS = ['#38BDF8', '#FB7185'];

  const pieData = [
    { name: `Principal ${principalPercent}%`, value: loanAmount },
    { name: `Interest ${interestPercent}%`, value: totalInterestGenerated }
  ];

  return (
    <Stack gap={3}>
      <Typography textAlign="center" level="h3">
        Monthly Payment: Rs {monthlyPaymentInK.toFixed(2)} K
      </Typography>
      <Stack direction="row" justifyContent="center" sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={false}
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </Stack>
    </Stack>
  );
};

export default Result;