import { AxiosResponse } from 'axios';
import { TransactionDTO } from '../models/TransactionDTO';
import api from './api';

const getTransactionService = (
    token: string,
    userId: string
): Promise<AxiosResponse<TransactionDTO>> => {
    const header = `token=${token}`
    console.log(header);
    console.log(userId);


    return api.get(
        '/obp/v4.0.0/my/banks/cardinalbank/accounts/' + userId + '/transactions',
        {
            headers: {
                DirectLogin: header,
            },
        },
    );
};

export { getTransactionService };
