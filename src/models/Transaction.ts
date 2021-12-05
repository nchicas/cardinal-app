import TransactionStatus from '../enums/TransactionStatus';

interface Transaction {
  title: string;
  description: string;
  amount: number;
  status: TransactionStatus;
}

export default Transaction;
