export interface AccountDTO {
    account_id: string;
    user_id: string;
    label: string;
    product_code: string;
    balance: Balance;
    branch_id: string;
    account_routings: any[];
    account_attributes: any[];
}

export interface Balance {
    currency: string;
    amount: string;
}