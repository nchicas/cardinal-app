import {createStoreon, StoreonModule} from 'storeon';
import {storeonLogger} from 'storeon/devtools';
import Card from '../models/Card';

export interface States {
  token: string;
  isBusy: boolean;
  username: string;
  password: string;
  cardsData: Card[];
}

export interface Events {
  setToken: string;
  setIsBusy: boolean;
  setUsername: string;
  setPassword: string;
  addCard: Card;
}

export const sessionModule: StoreonModule<States, Events> = store => {
  store.on('@init', () => ({
    token: '',
    isBusy: false,
    username: '',
    password: '',
    cardsData: [],
  }));
  store.on('setToken', (state, event) => ({token: event}));
  store.on('setIsBusy', (state, event) => ({isBusy: event}));
  store.on('setUsername', (state, event) => ({username: event}));
  store.on('setPassword', (state, event) => ({password: event}));
  store.on('addCard', (state, event) => ({
    cardsData: [...state.cardsData, event],
  }));
};

const store = createStoreon<States, Events>([sessionModule, storeonLogger]);

export default store;
