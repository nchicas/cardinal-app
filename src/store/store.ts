import {createStoreon, StoreonModule} from 'storeon';
import {storeonLogger} from 'storeon/devtools';

export interface States {
  token: string;
}

export interface Events {
  setToken: string;
}

export const sessionModule: StoreonModule<States, Events> = store => {
  store.on('@init', () => ({token: ''}));
  store.on('setToken', (state, event) => ({token: event}));
};

const store = createStoreon<States, Events>([sessionModule, storeonLogger]);

export default store;
