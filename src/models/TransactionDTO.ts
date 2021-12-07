export interface TransactionDTO {
    transactions: TransactionDTOItem[];
}

export interface TransactionDTOItem {
    id: string;
    this_account: Account;
    other_account: Account;
    details: Details;
    transaction_attributes: any[];
}

export interface Details {
    type: string;
    description: string;
    posted: Date;
    completed: Date;
    new_balance: NewBalance;
    value: NewBalance;
}

export interface NewBalance {
    currency: string;
    amount: string;
}

export interface Account {
    id: string;
    holder?: Holder;
    bank_routing: Routing;
    account_routings: Routing[];
    holders?: Holder[];
}

export interface Routing {
    scheme: string;
    address: string;
}

export interface Holder {
    name: string;
    is_alias: boolean;
}
