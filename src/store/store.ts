import {createStoreon, StoreonModule} from 'storeon';
import {storeonLogger} from 'storeon/devtools';

export interface States {
  token: string;
  isBusy: boolean;
}

export interface Events {
  setToken: string;
  setIsBusy: boolean;
}

export const sessionModule: StoreonModule<States, Events> = store => {
  store.on('@init', () => ({token: '', isBusy: false}));
  store.on('setToken', (state, event) => ({token: event}));
  store.on('setIsBusy', (state, event) => ({isBusy: event}));
};

const store = createStoreon<States, Events>([sessionModule, storeonLogger]);

export default store;
