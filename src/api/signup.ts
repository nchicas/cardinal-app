import { AxiosResponse } from 'axios';
import moment from 'moment';
import { CustomerDTO } from '../models/CustomerDTO';
import { LoginDTO } from '../models/LoginDTO';
import SignupDTO from '../models/SignupDTO';
import api from './api';

const signupService = (
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  token: string,
): Promise<AxiosResponse<SignupDTO>> => {
  const header = `token=${token}`;
  return api.post(
    '/obp/v4.0.0/users',
    {
      email: email,
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
    },
    {
      headers: {
        'DirectLogin': header,
      },
    },
  );
};

const customerCreateService = (
  email: string,
  firstName: string,
  lastName: string,
  token: string,
  dateBirth: Date,
): Promise<AxiosResponse<CustomerDTO>> => {
  const headers = `token=${token}`;

  const body = {
    legal_name: `${firstName} ${lastName}`,
    email: email,
    date_of_birth: moment(dateBirth).format('YY-MM-DDT00:00:00') + 'Z',
    dependants: 0,
    relationship_status: '',
    mobile_phone_number: '',
    highest_education_attained: '',
    employment_status: '',
    title: '',
    branch_id: '',
    name_suffix: '',
    kyc_status: true,
    last_ok_date: moment().format('YY-MM-DDTHH:mm:ss') + 'Z',
    credit_rating: {
      rating: 'OBP',
      source: 'OBP',
    },
    face_image: {
      url: '',
      date: moment(dateBirth).format('YY-MM-DDT00:00:00') + 'Z'
    },
    credit_limit: {
      currency: 'USD',
      amount: '0',
    },
  }
  console.log('dsds', body);

  return api.post(
    '/obp/v4.0.0/banks/cardinalbank/customers',
    body,
    {
      headers: {
        'DirectLogin': headers,
        'Content-Type': 'application/json',
      },
    },

  );
};

const linkService = (
  customerId: string,
  userId: string,
  token: string,
): Promise<AxiosResponse<SignupDTO>> => {
  const header = `token=${token}`;
  return api.post(
    '/obp/v4.0.0/banks/cardinalbank/user_customer_links',
    {
      user_customer_link_id: '',
      customer_id: customerId,
      user_id: userId,
      date_inserted: new Date(Date.now()).toISOString(),
      is_active: true,
    },
    {
      headers: {
        'DirectLogin': header,
      },
    },
  );
};

export { signupService, customerCreateService, linkService };
