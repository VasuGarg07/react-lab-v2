import { useEffect, useState } from "react";
import { useWalletContext } from "./Context";
import { ExpenseType, Transaction, formatDate } from "./helper";

import { v4 as uuidv4 } from 'uuid';
import { Button, Divider, Input, Modal, ModalClose, Option, Select, Sheet, Typography } from "@mui/joy";
import { MatIcon, ErrorMessage } from "../../components/Utils";

interface Props {
  addTransaction: (transaction: Transaction) => void
  changeTransaction: (transaction: Transaction) => void,
  open: boolean,
  closeDialog: () => void,
  editTxn: Transaction | null
}


const Form = () => {
  const { addTransaction, changeTransaction, open, closeDialog, editTxn }: Props = useWalletContext();

  const [amount, setAmount] = useState<number>(0);
  const [label, setLabel] = useState<string>('');
  const [type, setType] = useState<ExpenseType | ''>('');
  const [date, setDate] = useState<string>(formatDate(new Date()));
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (editTxn) {
      setAmount(editTxn.amount);
      setDate(editTxn.date)
      setLabel(editTxn.label);
      setType(editTxn.type)
    }
  }, [editTxn]);

  const handleChange = (
    _: React.SyntheticEvent | null,
    newValue: ExpenseType | null,
  ) => {
    newValue && setType(newValue);
  };

  const handleClose = () => {
    setError(false);
    closeDialog();
  }


  const handleSubmit = () => {
    if (!amount || !label || !type) {
      setError(true);
    } else {
      const txn: Transaction = { id: editTxn ? editTxn.id : uuidv4(), amount, label, type, date }
      editTxn ? changeTransaction(txn) : addTransaction(txn);
      handleClose();
    }
  }

  return (

    <Modal open={open} onClose={handleClose}
      className="flex-centered-column"
      sx={{ p: 2 }}>
      <Sheet sx={{ p: 2, borderRadius: 'md', maxWidth: 320, width: 1 }}>

        <ModalClose variant="plain" />
        <Typography level="title-md">{editTxn ? 'Edit' : 'Add'} Transaction</Typography>

        <Divider inset="none" sx={{ my: 1 }} />
        {error && <ErrorMessage message="Please Fill all the feilds" />}

        <Input
          required
          placeholder="Enter Amount"
          variant="soft" color='neutral'
          startDecorator={<MatIcon icon="currency_rupee" />}
          type="number" sx={{ my: 2 }}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          slotProps={{
            input: {
              min: 1,
              max: 100000,
              step: 1,
            },
          }}
        />
        <Input
          required
          placeholder="Enter Label"
          variant="soft" color='neutral'
          startDecorator={<MatIcon icon="local_offer" outlined={true} />}
          onChange={(e) => setLabel(e.target.value)}
          sx={{ my: 2 }}
        />
        <Input
          required
          placeholder="Enter Date"
          variant="soft" color='neutral'
          startDecorator={<MatIcon icon="calendar_today" />}
          type="date" sx={{ my: 2 }}
          onChange={(e) => setDate(formatDate(new Date(e.target.value)))}
        />
        <Select
          required
          placeholder="Select the Category"
          variant="soft" color='neutral'
          startDecorator={<MatIcon icon="tag" />}
          onChange={handleChange}
        >
          {Object.values(ExpenseType).map((option) => (
            <Option key={option} value={option}> {option} </Option>
          ))}
        </Select>

        <Divider inset="none" sx={{ my: 1 }} />

        <Button fullWidth onClick={handleSubmit}>Submit</Button>

      </Sheet>
    </Modal >
  )
}

export default Form