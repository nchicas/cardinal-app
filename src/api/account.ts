import { AxiosResponse } from 'axios';
import { AccountDTO } from '../models/AccountDTO';
import api from './api';

const createAccount = (
    token: string,
    userId: string,
    name: string
): Promise<AxiosResponse<AccountDTO>> => {
    const header = `token=${token}`
    return api.post(
        '/obp/v4.0.0/banks/cardinalbank/accounts',
        {
            "user_id": userId,
            "product_code": "cardinal",
            "label": name,
            "branch_id": "",
            "balance": {
                "currency": "USD",
                "amount": "0"
            }
        },
        {
            headers: {
                DirectLogin: header,
            },
        },
    );
};

export { createAccount };