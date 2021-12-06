import { AxiosResponse } from 'axios';
import moment from 'moment';
import { CardDTO, CardsDTO } from '../models/CardsDTO';
import api from './api';

const getCardsService = (
    token: string,
): Promise<AxiosResponse<CardsDTO>> => {
    const header = `token=${token}`
    return api.get(
        '/obp/v4.0.0/cards',
        {
            headers: {
                DirectLogin: header,
            },
        },
    );
};

const createCardsService = (
    name: string,
    accountId: string,
    token: string,
    customerId: string,
    cardNumber: string
): Promise<AxiosResponse<CardDTO>> => {
    const header = `token=${token}`
    return api.post(
        '/obp/v4.0.0/management/banks/cardinalbank/cards',
        {
            "card_number": cardNumber,
            "card_type": "Debit",
            "name_on_card": name,
            "issue_number": "",
            "serial_number": "",
            "valid_from_date": moment().format('YY-MM-DDTHH:mm:ss') + 'Z',
            "expires_date": moment().set('year', moment().year() + 1).format('YY-MM-DDTHH:mm:ss') + 'Z',
            "enabled": true,
            "technology": "",
            "networks": [],
            "allows": [
                "debit"
            ],
            "replacement": { "requested_date": moment().format('YY-MM-DDTHH:mm:ss') + 'Z', "reason_requested": "RENEW" },
            "account_id": accountId,
            "pin_reset": [],
            "collected": moment().format('YY-MM-DDTHH:mm:ss') + 'Z',
            "posted": moment().format('YY-MM-DDTHH:mm:ss') + 'Z',
            "customer_id": customerId
        },
        {
            headers: {
                DirectLogin: header,
            },
        },
    );
};

export { getCardsService, createCardsService };
