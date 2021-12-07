import axios, {AxiosResponse} from 'axios';
import {TransactionDTO} from '../models/TransactionDTO';

const smartContractService = (
  idCard: string,
  wallet: string,
): Promise<AxiosResponse<any>> => {
  return axios.post(
    'https://e619-190-150-219-227.ngrok.io/create-contract',
    {
      cardholder_address: wallet,
      card_id: idCard,
      transaction_limit: 100,
      month_limit: 1000,
    },
    {timeout: 180000},
  );
};

export {smartContractService};
