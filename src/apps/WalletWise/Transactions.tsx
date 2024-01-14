import { Box, IconButton, Sheet, Table, Typography } from '@mui/joy';
import { useWalletContext } from './Context';
import { Transaction } from './helper';
import DownloadCsv from './Download';
import { MatIconOutlined } from '../../components/Utils';
import NoData from '../../assets/no-data-1.png';

interface Props {
  transactions: Transaction[],
  deleteTransaction: (transaction: Transaction) => void
}

const Transactions = () => {

  const { transactions, deleteTransaction }: Props = useWalletContext();

  return (
    <Sheet sx={{ p: 2, borderRadius: 'md' }}>
      <div className='flex-justified'>
        <Typography level='title-lg'>Transactions</Typography>
        {transactions && transactions.length > 0 && <DownloadCsv txn={transactions} />}
      </div>

      {transactions && transactions.length
        ? <Table
          borderAxis="both"
          size="md"
          stickyHeader
          stripe="odd"
          variant="soft"
          color='primary'
          sx={{ textAlign: 'center', mt: 2 }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Date</th>
              <th style={{ textAlign: 'center' }}>Amount</th>
              <th style={{ textAlign: 'center' }}>Category</th>
              <th style={{ textAlign: 'center' }}>Note</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn: Transaction) => (
              <tr key={txn.id} className='w-100'>
                <td className='text-ellipsis'>{txn.date}</td>
                <td className='text-ellipsis'>{txn.amount}</td>
                <td className='text-ellipsis'>{txn.type}</td>
                <td className='text-ellipsis'>{txn.label}</td>
                <td className='flex-centered'>
                  <IconButton size='sm' onClick={() => deleteTransaction(txn)}>
                    <MatIconOutlined icon="delete" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        : <>
          <Box sx={{ mt: 1, mx: 'auto', borderRadius: 'md', width: 0.8, height: 1, maxWidth: 640 }}>
            <img src={NoData} srcSet={NoData} className='w-100'
              style={{ objectFit: 'contain' }} />
            <Typography textAlign='center' level='title-md'>No Transactions Recorded Yet</Typography>
          </Box>
        </>}
    </Sheet>
  )
}

export default Transactions