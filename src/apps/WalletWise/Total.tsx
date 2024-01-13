import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Aggregate, ChartData, Transaction, calculateData, calculateTotalAmount, generateRandomColor } from './helper';
import { useWalletContext } from './Context';
import { useEffect, useState } from 'react';
import { Button, IconButton, Sheet, Table, Typography } from '@mui/joy';
import { MatIcon, Spacer } from '../../components/Utils';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const prepChart = (groupedData: Aggregate[]) => {
  // Prepare data for the chart
  const colors = generateRandomColor(groupedData.length)
  const chartData = {
    labels: groupedData.map(item => item.type),
    datasets: [
      {
        data: groupedData.map(item => item.amount),
        backgroundColor: colors.map(color => `${color}33`),
        borderColor: colors,
        borderWidth: 1
      },
    ],
  };
  return chartData;
}

interface Props {
  transactions: Transaction[],
  openDialog: () => void,
  setEditTxn: React.Dispatch<React.SetStateAction<Transaction | null>>,

}

const Total = () => {
  const { transactions, openDialog, setEditTxn }: Props = useWalletContext();

  const [total, setTotal] = useState<number>(0);
  const [table, setTable] = useState<Aggregate[]>([]);
  const [chartData, setChartData] = useState<ChartData>();
  const [showChart, setShowChart] = useState<boolean>(true);

  useEffect(() => {

    setTotal(calculateTotalAmount(transactions));
    const data = calculateData(transactions);

    setTable(data);
    setChartData(prepChart(data));

  }, [transactions])

  const handleAdd = () => {
    setEditTxn(null);
    openDialog();
  }

  const switchView = () => {
    setShowChart(showChart => !showChart);
  }

  return (
    <Sheet sx={{ p: 2, borderRadius: 'md' }}>
      <div className='flex-centered'>
        <Typography level='title-lg'>Total: &#8377;{total}</Typography>
        <Spacer />

        <Button variant="soft" color='primary'
          endDecorator={<MatIcon icon='add' />}
          size='sm' onClick={handleAdd}>
          Add
        </Button>
        {transactions && transactions.length > 0 &&
          (showChart
            ? <IconButton size='sm' onClick={switchView} color="neutral">
              <MatIcon icon='view_list' />
            </IconButton>
            : <IconButton size='sm' onClick={switchView} color="neutral">
              <MatIcon icon='donut_large' />
            </IconButton>
          )}
      </div>

      {transactions && transactions.length > 0 && chartData &&
        (showChart
          ? <Doughnut className='chart' data={chartData} />
          : <Table
            borderAxis="both"
            size="md"
            stickyHeader
            stripe="odd"
            variant="outlined"
            sx={{ textAlign: 'center', mt: 2 }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Category</th>
                <th style={{ textAlign: 'center' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row: Aggregate, i: number) => (
                <tr key={i} className='w-100'>
                  <td>{row.type}</td>
                  <td>{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </Sheet>
  )
}

export default Total