import {AxiosResponse} from 'axios';
import {LoginDTO} from '../models/LoginDTO';
import api from './api';

const loginService = (
  username: string,
  password: string,
  consumerKey: string,
): Promise<AxiosResponse<LoginDTO>> => {
  const header = `username=${username},password=${password},consumer_key=${consumerKey}`;
  return api.post(
    '/my/logins/direct',
    {},
    {
      headers: {
        DirectLogin: header,
      },
    },
  );
};

export {loginService};
