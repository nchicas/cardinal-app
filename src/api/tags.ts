import {AxiosResponse} from 'axios';
import {TransactionDTO} from '../models/TransactionDTO';
import api from './api';

const createTagService = (
  token: string,
  accountId: string,
  value: string,
): Promise<AxiosResponse<TransactionDTO>> => {
  const header = `token=${token}`;
  return api.post(
    '/obp/v4.0.0/banks/cardinalbank/accounts/' +
      accountId +
      '/owner/metadata/tags',
    {
      value: value,
    },
    {
      headers: {
        DirectLogin: header,
      },
    },
  );
};

export {createTagService};
