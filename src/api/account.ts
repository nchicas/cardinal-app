import {AxiosResponse} from 'axios';
import {AccountDTO} from '../models/AccountDTO';
import {CustomersDTO} from '../models/CustomersDTO';
import UserDTO from '../models/UserDTO';
import api from './api';

const createAccount = (
  token: string,
  userId: string,
  name: string,
): Promise<AxiosResponse<AccountDTO>> => {
  const header = `token=${token}`;
  return api.post(
    '/obp/v4.0.0/banks/cardinalbank/accounts',
    {
      user_id: userId,
      product_code: 'cardinal',
      label: name,
      branch_id: '',
      balance: {
        currency: 'USD',
        amount: '0',
      },
    },
    {
      headers: {
        DirectLogin: header,
      },
    },
  );
};

const getUserId = (token: string): Promise<AxiosResponse<UserDTO>> => {
  const header = `token=${token}`;
  return api.get('/obp/v4.0.0/users/current/user_id', {
    headers: {
      DirectLogin: header,
    },
  });
};

const getCustomerId = (token: string): Promise<AxiosResponse<CustomersDTO>> => {
  const header = `token=${token}`;
  return api.get('/obp/v4.0.0/users/current/customers', {
    headers: {
      DirectLogin: header,
    },
  });
};
export {createAccount, getUserId, getCustomerId};
