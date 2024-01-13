import { Button } from "@mui/joy";
import { Transaction } from "./helper";
import { saveAs } from 'file-saver';
import { MatIconOutlined } from "../../components/Utils";

const DownloadCsv = ({ txn }: { txn: Transaction[] }) => {

  const convertToCSV = (data: Transaction[]): string => {
    const header = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map(obj => Object.values(obj).join(',') + '\n');
    return header + rows.join('');
  };

  const saveCSVToFile = () => {
    const csvContent = convertToCSV(txn);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `WalletWise_${new Date().toLocaleDateString()}.csv`);
  };


  return (
    <Button variant="solid" color='success'
      startDecorator={<MatIconOutlined icon='file_download' />}
      onClick={saveCSVToFile}>
      CSV
    </Button>
  )
}

export default DownloadCsv