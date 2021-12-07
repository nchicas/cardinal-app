import TransactionStatus from '../enums/TransactionStatus';
import { TransactionDTOItem } from './TransactionDTO';

interface Transaction {
  title: string;
  description: string;
  amount: number;
  status: TransactionStatus;
  date: Date;
  dateKey: string;
  dataRaw: TransactionDTOItem
}

export default Transaction;
