import {createStoreon, StoreonModule} from 'storeon';
import {storeonLogger} from 'storeon/devtools';

export interface States {
  token: string;
  isBusy: boolean;
  username: string;
  password: string;
}

export interface Events {
  setToken: string;
  setIsBusy: boolean;
  setUsername: string;
  setPassword: string;
}

export const sessionModule: StoreonModule<States, Events> = store => {
  store.on('@init', () => ({
    token: '',
    isBusy: false,
    username: '',
    password: '',
  }));
  store.on('setToken', (state, event) => ({token: event}));
  store.on('setIsBusy', (state, event) => ({isBusy: event}));
  store.on('setUsername', (state, event) => ({username: event}));
  store.on('setPassword', (state, event) => ({password: event}));
};

const store = createStoreon<States, Events>([sessionModule, storeonLogger]);

export default store;
